export interface SnapShot {
  squares: string | null[];
}


export interface GameState {
  history: SnapShot[];
  stepNumber: number;
  xIsNext: boolean;
}
