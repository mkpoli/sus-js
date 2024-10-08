import type { Metadata, Note, Score, ScoreData } from 'sus-types';

type Line = [header: string, data: string];

function removeQuotations(str: string): string {
	return str.replace(/^"(.*(?="$))"$/, '$1');
}

function splitSUS(sus: string): {
	score: Line[];
	metadata: Line[];
} {
	const score: Line[] = [];
	const metadata: Line[] = [];
	for (const line of sus.split(/\r\n|(?!\r\n)[\n-\r\x85\u2028\u2029]/)) {
		if (!line.startsWith('#')) continue;

		const scoreMatch = line.match(/^#([^:]+): *(.*)$/);
		if (scoreMatch) {
			const [header, data] = scoreMatch.slice(1);
			score.push([header, removeQuotations(data)]);
			continue;
		}

		const metadataMatch = line.match(/^#(.+?) (.*)$/);
		if (metadataMatch) {
			const [header, value] = metadataMatch.slice(1);
			metadata.push([header, removeQuotations(value)]);
			continue;
		}

		console.warn(`Unknown SUS data line: "${line}"`);
	}

	return { score, metadata };
}

function parseMetadata(lines: Line[]): Metadata {
	const metadata: Metadata = {};

	for (const [header, value] of lines) {
		switch (header) {
			case 'TITLE':
				metadata.title = value;
				break;
			case 'SUBTITLE':
				metadata.subtitle = value;
				break;
			case 'ARTIST':
				metadata.artist = value;
				break;
			case 'GENRE':
				metadata.genre = value;
				break;
			case 'DESIGNER':
				metadata.designer = value;
				break;
			case 'DIFFICULTY':
				metadata.difficulty = value;
				break;
			case 'PLAYLEVEL':
				metadata.playlevel = value;
				break;
			case 'SONGID':
				metadata.songid = value;
				break;
			case 'WAVE':
				metadata.wave = value;
				break;
			case 'JACKET':
				metadata.jacket = value;
				break;
			case 'BACKGROUND':
				metadata.background = value;
				break;
			case 'MOVIE':
				metadata.movie = value;
				break;
			case 'WAVEOFFSET':
				metadata.waveoffset = Number.parseInt(value);
				break;
			case 'MOVIEOFFSET':
				metadata.movieoffset = Number.parseInt(value);
				break;
			case 'BASEBPM':
				metadata.basebpm = Number.parseInt(value);
				break;
			case 'REQUEST': {
				const requests = metadata.requests || [];
				requests.push(value);
				metadata.requests = requests;
				break;
			}
			default:
				console.log('Unknown metadata header: ', header);
				break;
		}
	}
	return metadata;
}

type ToTick = (measure: number, i: number, total: number) => number;
function parseScoreData(lines: Line[], ticksPerBeat: number): ScoreData {
	const barLengths: [measure: number, value: number][] = lines
		.filter(
			([header]) =>
				header.length === 5 &&
				header.endsWith('02') &&
				!Number.isNaN(Number.parseInt(header)),
		)
		.map(([header, data]) => [
			Number.parseInt(header.substring(0, 3)),
			Number.parseInt(data),
		]);

	if (barLengths.length === 0) {
		console.warn(
			'No barLengths found, adding default 4/4 time signature (#00002:4)...',
		);
		barLengths.push([0, 4]);
	}

	let ticks = 0;
	const bars = [...barLengths]
		.sort(([measureA], [measureB]) => measureA - measureB)
		.map(([measure, value], i, values) => {
			const prev = values[i - 1];
			if (prev) {
				ticks += (measure - prev[0]) * prev[1] * ticksPerBeat;
			}
			return { measure, ticksPerMeasure: value * ticksPerBeat, ticks };
		})
		.reverse();

	const toTick: ToTick = (measure, i, total) => {
		const bar = bars.find((bar) => measure >= bar.measure);
		if (!bar) throw 'Unexpected missing bar';

		return (
			bar.ticks +
			(measure - bar.measure) * bar.ticksPerMeasure +
			(i * bar.ticksPerMeasure) / total
		);
	};

	const bpmMap = new Map<string, number>();
	const bpmChangeObjects: [tick: number, value: string][] = [];
	const taps: Note[] = [];
	const directionals: Note[] = [];
	const streams = new Map<string, Note[]>();

	for (const line of lines) {
		const [header, data] = line;

		// BPM
		if (header.length === 5 && header.startsWith('BPM')) {
			bpmMap.set(header.substring(3), +data);
			continue;
		}

		// BPM Change
		if (header.length === 5 && header.endsWith('08')) {
			bpmChangeObjects.push(...toRawObjects(line, toTick));
			continue;
		}

		// Tap Notes
		if (header.length === 5 && header[3] === '1') {
			taps.push(...toNoteObjects(line, toTick));
			continue;
		}

		// Slide Notes
		if (header.length === 6 && header[3] === '3') {
			const channel = header[5];
			const stream = streams.get(channel) ?? [];
			stream.push(...toNoteObjects(line, toTick));
			streams.set(channel, stream);
			continue;
		}

		// Directional Notes
		if (header.length === 5 && header[3] === '5') {
			directionals.push(...toNoteObjects(line, toTick));
		}
	}

	const slides = [...streams.values()].flatMap(toSlides);

	const bpms = bpmChangeObjects
		.sort((a, b) => a[0] - b[0])
		.map(([tick, value]) => [tick, bpmMap.get(value) || 0] as [number, number])
		.reverse();

	return {
		taps,
		directionals,
		slides,
		bpms,
		barLengths,
	};
}

function toSlides(stream: Note[]) {
	const slides: Note[][] = [];
	let current: Note[] | undefined;
	for (const note of stream.sort((a, b) => a.tick - b.tick)) {
		if (!current) {
			current = [];
			slides.push(current);
		}

		current.push(note);

		if (note.type === 2) {
			current = undefined;
		}
	}

	return slides;
}

function toNoteObjects(line: Line, toTick: ToTick) {
	const [header] = line;
	const lane = Number.parseInt(header[4], 36);

	return toRawObjects(line, toTick).map(([tick, value]) => {
		const width = Number.parseInt(value[1], 36);

		return {
			tick,
			lane,
			width,
			type: Number.parseInt(value[0], 36),
		};
	});
}

function toRawObjects(
	[header, data]: Line,
	toTick: ToTick,
): [tick: number, value: string][] {
	// Measure Id (from 000 to zzz)
	const measure = +header.substring(0, 3);
	// Seperate the data into value pairs
	return (data.match(/.{2}/g) || [])
		.map(
			(value, i, values) =>
				value !== '00' && [toTick(measure, i, values.length), value],
		)
		.filter((object): object is [number, string] => !!object);
}

/**
 * Parse SUS data into a Score object
 *
 * @param sus The content of sus file as a string.
 * @returns A Score object.
 */
export function parse(sus: string): Score {
	const lines = splitSUS(sus);
	const metadata = parseMetadata(lines.metadata);

	const ticksPerBeatRequest = metadata.requests?.find((request) =>
		request.startsWith('ticks_per_beat'),
	);

	if (!ticksPerBeatRequest) {
		console.warn('Missing ticks_per_beat request, defaulting to 480.');
	}

	const ticksPerBeat =
		Number.parseInt(ticksPerBeatRequest?.split(' ')[1] ?? '') || 480;

	// return scoreLines
	return {
		metadata,
		...parseScoreData(lines.score, ticksPerBeat),
	};
}

export const _private = {
	splitSUS,
	parseMetadata,
};
