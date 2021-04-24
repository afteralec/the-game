import type { ReactElement } from "react";
import { useMediaQuery } from "@material-ui/core";
import { cellStyles } from "helpers";

// Component for each Cell Component of the main Grid
export function CellComponent({
  id,
  row,
  col,
  active,
  wasActive,
  toggleActive,
  hoverPoint,
  setHoverPoint,
  hovered,
  dragging,
  setDrag,
  selectShape,
  dropShape,
  mouseDown
}: Props): ReactElement {
  const mobile = useMediaQuery("(max-width: 1023px)");

  const cellSize = mobile ? "24px" : "3.5vh",
    innerCellSize = mobile ? "23px" : "3.25vh";

  return (
    <div
      id={id}
      onMouseUp={() => {
        setDrag(false);
        selectShape("");
        dropShape();
        setHoverPoint({});
      }}
      onMouseEnter={() => {
        if (mouseDown && !dragging) toggleActive(id);

        if (!dragging) return;

        if (row === hoverPoint.row && col === hoverPoint.col) return;
        setHoverPoint({ row, col });
      }}
      //onDrop={(event) => event.preventDefault()}
      onMouseDown={() => toggleActive(id)}
      style={{
        height: cellSize,
        width: cellSize,
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid #333"
      }}
    >
      <div
        style={{
          height: innerCellSize,
          width: innerCellSize,
          borderRadius: "100%",
          ...cellStyles(hovered, active, wasActive)
        }}
      />
    </div>
  );
}

interface Props {
  id: string;
  row: number;
  col: number;
  active: boolean;
  wasActive: boolean;
  toggleActive: any;
  hoverPoint: any;
  setHoverPoint: any;
  hovered: boolean;
  dragging: boolean;
  setDrag: any;
  selectShape: any;
  dropShape: any;
  mouseDown: any;
}
