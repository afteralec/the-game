import { withStyles } from "@material-ui/core/styles";
import type { ReactNode, SyntheticEvent } from "react";
import {
  DialogTitle as MUIDialogTitle,
  DialogContent as MUIDialogContent,
  DialogActions as MUIDialogActions,
  IconButton,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import type { Styles, ClassNameMap } from "@material-ui/styles";
import type { Theme } from "@material-ui/core";

// Styles from Material UI for use with withStyles()
const styles: Styles<Theme, {}, "root" | "closeButton"> = (theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

// Dialog Title
export const DialogTitle = withStyles(styles)(
  ({ children, classes, onClose, ...other }: Props) => {
    return (
      <MUIDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MUIDialogTitle>
    );
  }
);

interface Props {
  [index: string]: any;

  children: ReactNode;
  classes: ClassNameMap<"root" | "closeButton">;
  onClose: (event: SyntheticEvent) => void;
}

// Dialog Content
export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MUIDialogContent);

// Dialog Actions
export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MUIDialogActions);
