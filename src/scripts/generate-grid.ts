import { Cell } from "models";
import type { Grid } from "types";

// Function to create the matrix used to render the Game's grid
export function generateGrid(rows = 50, cols = 75, key = "main"): Grid {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let ii = 0; ii < cols; ii++) {
      row.push(
        new Cell({
          row: i,
          col: ii,
          key: key,
          neighbors: heyNeighbor(i, ii, rows - 1, cols - 1)
        })
      );
    }

    grid.push(row);
  }

  return grid;
}

// Function to assign the neighbor coordinates of each cell in a grid
function heyNeighbor(
  row: number,
  col: number,
  lastRow: number,
  lastCol: number
): [number, number][] {
  let nw: [number, number] = [row - 1, col - 1],
    n: [number, number] = [row - 1, col],
    ne: [number, number] = [row - 1, col + 1],
    e: [number, number] = [row, col + 1],
    w: [number, number] = [row, col - 1],
    sw: [number, number] = [row + 1, col - 1],
    s: [number, number] = [row + 1, col],
    se: [number, number] = [row + 1, col + 1];

  // Handle top and bottom edge neighbors
  if (row === 0) {
    // Handle northwest and northeast corner cells
    switch (col) {
      case 0: // Northwest corner cell
        nw = [lastRow, lastCol];
        ne = [lastRow, col + 1];
        break;
      case lastCol: // Northeast corner cell
        nw = [lastRow, col - 1];
        ne = [lastRow, 0];
        break;
      default:
        // Everybody else
        nw = [lastRow, col - 1];
        ne = [lastRow, col + 1];
        break;
    }

    n = [lastRow, col];
  } else if (row === lastRow) {
    //Handle southwest and southeast corner cells
    switch (col) {
      case 0: // Southwest corner cell
        sw = [0, lastCol];
        se = [0, col + 1];
        break;
      case lastCol: // Southeast corner cell
        sw = [0, col - 1];
        se = [0, 0];
        break;
      default:
        // Everybody else
        sw = [0, col - 1];
        se = [0, col + 1];
        break;
    }

    s = [0, col];
  }

  // Handle left and right edge neighbors
  if (col === 0) {
    // Handle northwest and southwest corner cells
    switch (row) {
      case 0: // Northwest corner cell
        sw = [row + 1, lastCol];
        break;
      case lastRow: // Southwest corner cell
        nw = [row - 1, lastCol];
        break;
      default:
        // Everybody else
        sw = [row + 1, lastCol];
        nw = [row - 1, lastCol];
        break;
    }

    w = [row, lastCol];
  } else if (col === lastCol) {
    // Handle northeast and southeast corner cells
    switch (row) {
      case 0: // Northeast corner cell
        se = [row + 1, 0];
        break;
      case lastRow: // Southeast corner cell
        ne = [row - 1, 0];
        break;
      default:
        // Everybody else
        se = [row + 1, 0];
        ne = [row - 1, 0];
        break;
    }

    e = [row, 0];
  }

  return [nw, n, ne, e, w, sw, s, se];
}
