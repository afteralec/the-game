import type { Dispatch, SetStateAction, ReactElement } from "react";

// Material UI Imports
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";

export function ShapesDrawer({
  renderedAccordionShapes,
  drawerOpen,
  setDrawerOpen
}: Props) {
  // const _mobile = useMediaQuery("(max-width: 1023px)");

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      // onClick={() => {
      //   setDrawerOpen((drawerOpen) => !drawerOpen);

      //   // If the tour is active on this component, push the tour forward on step on click
      //   if (tour) setTourStep((tourStep) => tourStep + 1);
      // }}
      onClose={() => {
        setDrawerOpen((drawerOpen) => !drawerOpen);
      }}
    >
      {renderedAccordionShapes}
    </Drawer>
  );
}

interface Props {
  renderedAccordionShapes: ReactElement[];
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
