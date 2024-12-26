import { SnapShot } from "./SnapShot";

export interface GameState {
  history: SnapShot[];
  stepNumber: number;
  xIsNext: boolean;
}
