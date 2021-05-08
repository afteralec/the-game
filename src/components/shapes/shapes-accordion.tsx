import type { Dispatch, SetStateAction, ReactElement } from "react";
import {
  useMediaQuery,
  Accordion,
  AccordionSummary,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Component to render the Accordion of prebuilt shapes at the top of the UI
export function ShapesAccordion({
  renderedAccordionShapes,
  drawerOpen,
  setDrawerOpen,
  tour,
  setTourStep
}: Props) {
  const mobile = useMediaQuery("(max-width: 1023px)");

  if (mobile) return <></>;

  return (
    <Accordion
      style={{
        width: "175vh",
        marginBottom: "2vh",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
      expanded={drawerOpen}
      onClick={() => {
        setDrawerOpen((drawerOpen) => !drawerOpen);

        // If the tour is active on this component, push the tour forward on step on click
        if (tour) setTourStep((tourStep) => tourStep + 1);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Shapes</Typography>
      </AccordionSummary>
      <div
        // Render the entire array of renderedAccordionShapes, passed down as
        //   an array of Components
        style={{ display: "flex" }}
      >
        {renderedAccordionShapes}
      </div>
    </Accordion>
  );
}

interface Props {
  renderedAccordionShapes: ReactElement[];
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  tour: boolean;
  setTourStep: Dispatch<SetStateAction<number>>;
}
