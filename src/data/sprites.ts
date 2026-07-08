// Bouncy sprite-sheet manifest. Every sheet is a 4×4 grid of 256×256 frames,
// 13 frames used, ~12fps. Add more poses by mapping a name → file below
// (available sheets in /public/assets/bouncy: idle, walk, run, jump, turn, wave,
// point, cheer, clap, dance, see, sad, sit, sleep, stand, stop, touch, drink, wrong).
export const SHEET = {
  frameWidth: 256,
  frameHeight: 256,
  columns: 4,
  rows: 4,
  frames: 13,
  fps: 12,
  // Absolute from site root so it works on any route. If you deploy under a
  // sub-path, change to match (or import the PNGs as modules instead).
  basePath: '/assets/bouncy/',
} as const

export type BouncyState =
  | 'idle' | 'walk' | 'run' | 'jump' | 'turn' | 'wave' | 'point'
  | 'cheer' | 'clap' | 'dance' | 'see' | 'sad'

interface Anim { file: string; loop: boolean }

export const ANIMS: Record<BouncyState, Anim> = {
  idle: { file: 'idle.png', loop: true },
  walk: { file: 'walk.png', loop: true },
  run: { file: 'run.png', loop: true },
  jump: { file: 'jump.png', loop: false },
  turn: { file: 'turn.png', loop: false },
  wave: { file: 'wave.png', loop: false },
  point: { file: 'point.png', loop: false },
  cheer: { file: 'cheer.png', loop: true },
  clap: { file: 'clap.png', loop: false },
  dance: { file: 'dance.png', loop: true },
  see: { file: 'see.png', loop: false },
  sad: { file: 'sad.png', loop: false },
}
