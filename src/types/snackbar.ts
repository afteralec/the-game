export interface Snackbar {
  message?: string;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "center" | "left" | "right";
  };
  autoHideDuration?: number;
  open?: boolean;
  buttonText?: string;
  buttonAction?: () => void;
  closeAction?: () => void;
  alert?: string;
}
