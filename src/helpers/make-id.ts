export function makeID(
  key: string,
  row: string | number,
  col: string | number
): string {
  return `${key}: ${row}, ${col}`;
}
