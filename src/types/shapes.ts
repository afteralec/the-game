export interface Shape {
  accordion?: AccordionShape;
  rows: number;
  cols: number;
  center: { row: number; col: number };
  name: string;
  label: string;
  coords: [number, number][];
}

export interface AccordionShape {
  rows: number;
  cols: number;
  center: { row: number; col: number };
  coords: [number, number][];
}
