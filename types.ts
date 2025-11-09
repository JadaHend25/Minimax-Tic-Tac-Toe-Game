
export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Scores {
  human: number;
  ai: number;
  draw: number;
}
