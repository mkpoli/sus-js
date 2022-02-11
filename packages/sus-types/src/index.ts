export type Note = {
  tick: number
  lane: number
  width: number
  type: number
}

export type ScoreData = {
  taps: Note[]
  directionals: Note[]
  slides: Note[][]
  bpms: [tick: number, value: number][]
  barLengths: [measure: number, value: number][]
}

export type Score = {
  metadata: Metadata
} & ScoreData

export type Metadata = {
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
