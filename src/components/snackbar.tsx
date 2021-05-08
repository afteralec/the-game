import type { SyntheticEvent } from "react";
import type { SnackbarCloseReason } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Button, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// Component to be used for any snackbar update to the user
export function SnackbarComponent({
  key,
  anchorOrigin = { vertical: "top", horizontal: "center" },
  autoHideDuration,
  open,
  close,
  message,
  buttonText,
  buttonAction,
  closeAction,
  alert
}: Props) {
  // Component for using the experimental Material UI Alert API
  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // Function to handle closing the snackbar
  function handleClose(
    event?: SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) {
    if (reason === "clickaway" || alert) return;

    close();
    if (closeAction) closeAction();
  }

  return alert ? (
    // If alert it truthy, return an Alert wrapped in the Snackbar componment
    <Snackbar
      key={key}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={handleClose}
    >
      <Alert autoHideDuration={autoHideDuration} severity={alert}>
        {message}
      </Alert>
    </Snackbar>
  ) : (
    // If alert is falsy, return a self-closing Snackbar component
    <Snackbar
      key={key}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={handleClose}
      message={message}
      action={
        <>
          {buttonText && (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                handleClose();
                if (buttonAction) buttonAction();
              }}
            >
              {buttonText}
            </Button>
          )}
          {closeAction && (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </>
      }
    />
  );
}

interface Props {
  key: string;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "center" | "left" | "right";
  };
  autoHideDuration?: number;
  open?: boolean;
  close: () => void;
  message?: string;
  buttonText?: string;
  buttonAction?: () => void;
  closeAction?: () => void;
  alert?: string;
}
