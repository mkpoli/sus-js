const version = "[VI]{version}[/VI]";
import { stringify } from './sus-stringify';

describe('stringify', () => {
  it('should work', () => {
    expect(stringify({ "metadata": { "title": "タイトル", "artist": "藝術家", "designer": "mkpoli", "requests": ["ticks_per_beat 480"] }, "taps": [{ "tick": 480, "lane": 4, "width": 3, "type": 1 }, { "tick": 960, "lane": 4, "width": 3, "type": 1 }, { "tick": 960, "lane": 10, "width": 3, "type": 3 }, { "tick": 1920, "lane": 4, "width": 3, "type": 1 }, { "tick": 6720, "lane": 6, "width": 2, "type": 2 }, { "tick": 7320, "lane": 6, "width": 2, "type": 3 }, { "tick": 7440, "lane": 6, "width": 2, "type": 3 }, { "tick": 7560, "lane": 6, "width": 2, "type": 3 }, { "tick": 7200, "lane": 2, "width": 4, "type": 1 }, { "tick": 7680, "lane": 6, "width": 2, "type": 3 }, { "tick": 7800, "lane": 6, "width": 2, "type": 3 }, { "tick": 7920, "lane": 6, "width": 2, "type": 3 }, { "tick": 8040, "lane": 6, "width": 2, "type": 3 }, { "tick": 23040, "lane": 9, "width": 3, "type": 2 }, { "tick": 23520, "lane": 9, "width": 3, "type": 1 }, { "tick": 24480, "lane": 9, "width": 3, "type": 1 }, { "tick": 23040, "lane": 4, "width": 3, "type": 1 }, { "tick": 23520, "lane": 4, "width": 3, "type": 1 }, { "tick": 24480, "lane": 4, "width": 3, "type": 1 }, { "tick": 24000, "lane": 10, "width": 3, "type": 1 }, { "tick": 24000, "lane": 3, "width": 3, "type": 1 }, { "tick": 26880, "lane": 11, "width": 3, "type": 2 }], "directionals": [{ "tick": 1920, "lane": 4, "width": 3, "type": 3 }, { "tick": 1920, "lane": 9, "width": 3, "type": 4 }, { "tick": 7200, "lane": 2, "width": 4, "type": 2 }, { "tick": 23040, "lane": 9, "width": 3, "type": 6 }, { "tick": 23520, "lane": 9, "width": 3, "type": 2 }, { "tick": 24480, "lane": 9, "width": 3, "type": 2 }, { "tick": 23040, "lane": 4, "width": 3, "type": 6 }, { "tick": 23520, "lane": 4, "width": 3, "type": 2 }, { "tick": 24480, "lane": 4, "width": 3, "type": 2 }, { "tick": 24000, "lane": 10, "width": 3, "type": 6 }, { "tick": 24000, "lane": 3, "width": 3, "type": 6 }, { "tick": 26880, "lane": 11, "width": 3, "type": 4 }, { "tick": 26880, "lane": 2, "width": 3, "type": 3 }], "slides": [[{ "tick": 0, "lane": 11, "width": 3, "type": 1 }, { "tick": 960, "lane": 10, "width": 3, "type": 3 }, { "tick": 1920, "lane": 9, "width": 3, "type": 2 }], [{ "tick": 7200, "lane": 2, "width": 4, "type": 1 }, { "tick": 7320, "lane": 6, "width": 2, "type": 3 }, { "tick": 7440, "lane": 6, "width": 2, "type": 3 }, { "tick": 7560, "lane": 6, "width": 2, "type": 3 }, { "tick": 7680, "lane": 6, "width": 2, "type": 3 }, { "tick": 7800, "lane": 6, "width": 2, "type": 3 }, { "tick": 7920, "lane": 6, "width": 2, "type": 3 }, { "tick": 8040, "lane": 6, "width": 2, "type": 3 }, { "tick": 8160, "lane": 9, "width": 5, "type": 2 }], [{ "tick": 23040, "lane": 9, "width": 3, "type": 1 }, { "tick": 23520, "lane": 4, "width": 3, "type": 3 }, { "tick": 24000, "lane": 10, "width": 3, "type": 3 }, { "tick": 24480, "lane": 4, "width": 3, "type": 3 }, { "tick": 24960, "lane": 9, "width": 3, "type": 3 }, { "tick": 26880, "lane": 11, "width": 3, "type": 2 }], [{ "tick": 23040, "lane": 4, "width": 3, "type": 1 }, { "tick": 23520, "lane": 9, "width": 3, "type": 3 }, { "tick": 24000, "lane": 3, "width": 3, "type": 3 }, { "tick": 24480, "lane": 9, "width": 3, "type": 3 }, { "tick": 24960, "lane": 4, "width": 3, "type": 3 }, { "tick": 26880, "lane": 2, "width": 3, "type": 2 }]], "bpms": [[0, 136.0]], "barLengths": [[0, 4.0]] }))
      .toEqual(`This file was generated by sus-js v${version}\n#TITLE "タイトル"\n#ARTIST "藝術家"\n#DESIGNER "mkpoli"\n\n#REQUEST "ticks_per_beat 480"\n\n#00002:4\n\n#BPM01:136\n#00008:01\n#00014:00131300\n#0001a:0033\n#00114:13\n#00316:00000000000000002200000000323232\n#00312:00000014\n#00416:32323232000000000000000000000000\n#01219:23130013\n#01214:13130013\n#0121a:0013\n#01213:0013\n#0141b:23\n#00154:33\n#00159:43\n#00352:00000024\n#01259:63230023\n#01254:63230023\n#0125a:0063\n#01253:0063\n#0145b:43\n#01452:33\n#0003b0:13\n#0003a0:0033\n#001390:23\n#003320:00000014\n#003360:00000000000000000000000000323232\n#004360:32323232000000000000000000000000\n#004390:00250000\n#012390:13\n#012340:00330033\n#0123a0:0033\n#013390:33\n#0143b0:23\n#012341:13\n#012391:00330033\n#012331:0033\n#013341:33\n#014321:23`);
  });
});
