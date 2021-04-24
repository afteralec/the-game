import { makeID } from "helpers";
import type { Grid } from "types";

export class Cell {
  constructor({ row, col, key, neighbors }: ConstructorArgs) {
    this.active = false;
    this.wasActive = false;
    this.willBeActive = false;
    this.history = [false];
    this.row = row;
    this.col = col;
    this.id = makeID(key, row, col);
    this.neighbors = neighbors;
  }

  applyRules(grid: Grid) {
    let i = 0;

    for (const coords of this.neighbors) {
      const row = grid[coords[0]];

      if (row) {
        const neighbor = row[coords[1]];

        if (neighbor && neighbor.active) i++;
      }
    }

    this.wasActive = this.active;
    this.willBeActive = this.active ? i === 2 || i === 3 : i === 3;
  }

  play() {
    this.history.unshift(this.active);
    this.active = !!this.willBeActive;
    this.willBeActive = false;
  }

  back() {
    this.active = this.history.shift() || false;
    this.wasActive = this.history[0] || false;
    this.willBeActive = false;
  }

  active: boolean;
  wasActive: boolean;
  willBeActive: boolean;
  history: boolean[];
  row: number;
  col: number;
  id: string;
  neighbors: [number, number][];
}

interface ConstructorArgs {
  row: number;
  col: number;
  key: string;
  neighbors: [number, number][];
}
