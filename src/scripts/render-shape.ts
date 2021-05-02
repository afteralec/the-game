import { makeID } from "helpers";
import { shapes } from "data";

// Function to, given a center point on the grid, render the ids of the rest
//  of the shape's points
export function renderShape(
  { row, col }: { row: number; col: number },
  selectedShape: string,
  key = "main"
) {
  if (!row || !col) return false;

  const shape: { [index: string]: boolean } = {};

  shapes[selectedShape].coords.forEach((coords) => {
    shape[makeID(key, row + coords[0], col + coords[1])] = true;
  });

  return shape;
}

// Function to, given a center point, draw a truncated shape for use in the
//   shapes drawer at the top of the UI
export function renderAccordionShape(
  { row, col }: { row: number; col: number },
  selectedShape: string,
  key: string
) {
  if (!row || !col) return false;

  const shape: { [index: string]: boolean } = {};

  const coords =
    shapes[selectedShape].accordion?.coords || shapes[selectedShape].coords;

  coords.forEach((coords) => {
    shape[makeID(key, row + coords[0], col + coords[1])] = true;
  });

  return shape;
}
