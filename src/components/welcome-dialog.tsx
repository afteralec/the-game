import type { Dispatch, SetStateAction } from "react";
import { Button, Dialog, Typography } from "@material-ui/core";
import { DialogTitle, DialogContent, DialogActions } from "./dialog";

// Welcome Dialog for the app home page
export function WelcomeDialog({ open, setOpen, setTourStep }: Props) {
  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle>Welcome to the Game!</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            The Game of Life is an algorithm meant to imitate cellular
            reproduction devised by the British mathematician John Conway in
            1970.
          </Typography>
          <Typography gutterBottom>
            It is a zero-player game, meaning that its evolution is determined
            by its initial state, requiring no further input. You play the Game
            of Life by creating an initial state of the field and watching what
            happens.
          </Typography>
          <Typography gutterBottom>
            You'll find pre-determined shapes in the drawer at the top; drag and
            drop these onto the grid to start. The controls on the left guide
            the game, and the slider on the right controls the speed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // Close the dialog
              setOpen(false);

              // Take a tour button automatically starts the tour
              setTourStep(1);
            }}
            color="primary"
          >
            Take a Tour
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTourStep: Dispatch<SetStateAction<number>>;
}
