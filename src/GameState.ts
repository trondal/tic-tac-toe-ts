export interface GameState {
  history: { squares: string[] }[];
  stepNumber: number;
  xIsNext: boolean;
}
