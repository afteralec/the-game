// Function to split the standard id back into row, column coordinates
export function splitID(id: string) {
  const split = id.split(": ");

  return split[1].split(", ");
}
