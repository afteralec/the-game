import { useState } from "react";
import { AccordionDetails } from "@material-ui/core";
import { ShapeGrid } from "./shape-grid";
import { splitID } from "helpers";
import { generateGrid, renderAccordionShape } from "scripts";

export function AccordionShape({
  rows,
  cols,
  center,
  name,
  label,
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint,
  dragging,
  setDrag,
  tour,
  setTourStep
}) {
  if (rows > 3) rows = 3;
  if (cols > 5) cols = 5;

  const [hover, setHover] = useState(false);
  const grid = generateGrid(rows, cols, name);

  for (const id in renderAccordionShape(center, name, name)) {
    const [row, col] = splitID(id);

    if (!grid[row]) continue;
    if (!grid[row][col]) continue;

    grid[row][col].active = true;
  }

  return (
    <AccordionDetails
      style={{
        animation: tour ? "fadeInAndOut 4s linear" : "",
        animationIterationCount: tour ? "infinite" : "",
        animationDelay: tour ? "1s" : "",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ShapeGrid
        style={{
          transform: hover ? "scale(0.8) translateY(3vh)" : "scale(0.8)"
        }}
        grid={grid}
        shape={name}
        setExpanded={setExpanded}
        selectShape={selectShape}
        dropShape={dropShape}
        setHoverPoint={setHoverPoint}
        dragging={dragging}
        setDrag={setDrag}
        tour={tour}
        setTourStep={setTourStep}
      />
      <span
        style={{
          position: "relative",
          bottom: "11vh",
          fontSize: "0.95rem",
          margin: 0,
          padding: 0,
          textAlign: "center",
          opacity: hover ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: "250ms"
        }}
      >
        {label}
      </span>
    </AccordionDetails>
  );
}
