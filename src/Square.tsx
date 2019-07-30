import React from "react";
import { SquareProps } from "./SquareProps";

export function Square(props: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
