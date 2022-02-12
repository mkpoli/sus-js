# sus-stringify

Convert tick-based score data to sus string.

## Usage

```javascript
import { stringify } from 'sus-stringify'

const sus = stringify({
    metadata: {
        title: "タイトル",
        artist: "藝術家",
        designer: "mkpoli",
        requests: ["ticks_per_beat 480"]
    },
    taps: [
        { tick: 480, lane: 4, width: 3, type: 1 },
        { tick: 960, lane: 4, width: 3, type: 1 }
    ],
    directionals: [
        { tick: 1920, lane: 4, width: 3, type: 3 }
    ],
    slides: [
        [
            { tick: 0, lane: 11, width: 3, type: 1 },
            { tick: 960, lane: 10, width: 3, type: 3 },
            { tick: 1920, lane: 9, width: 3, type: 2 }
        ]
    ],
    bpms: [[0, 120.0]],
    barLengths: [[0, 4.0]]
})
console.log(sus)
```

## Links
- [``sus-io``](https://www.npmjs.com/package/sus-io)
- [``sus-parse``](https://www.npmjs.com/package/sus-parse)
- [``sus-io (Python)``](https://pypi.org/project/sus-io/)
