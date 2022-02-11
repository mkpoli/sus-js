# sus-types

Shared types.

```typescript
type Note = {
    tick: number
    lane: number
    width: number
    type: number
}
type ScoreData = {
    taps: Note[]
    directionals: Note[]
    slides: Note[][]
    bpms: [
        tick: number,
        value: number
    ][]
    barLengths: [
        measure: number,
        value: number
    ][]
}
type Score = {
    metadata: Metadata
} & ScoreData
type Metadata = {
    title?: string
    subtitle?: string
    artist?: string
    genre?: string
    designer?: string
    difficulty?: string
    playlevel?: string
    songid?: string
    wave?: string
    waveoffset?: number
    jacket?: string
    background?: string
    movie?: string
    movieoffset?: number
    basebpm?: number
    requests?: string[]
}
```