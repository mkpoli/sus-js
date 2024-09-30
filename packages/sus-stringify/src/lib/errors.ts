export class InvalidAlignmentError extends Error {
	gcdValue: number;
	noteTicks: number[];
	constructor(gcdValue: number, ticks: number[]) {
		super(
			`Notes are not aligned correctly, with gcd ${gcdValue}. Note ticks: ${ticks.join(
				', ',
			)}`,
		);
		this.name = 'InvalidAlignmentError';
		this.gcdValue = gcdValue;
		this.noteTicks = ticks;
	}
}
