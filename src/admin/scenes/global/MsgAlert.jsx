import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function MsgAlert({ message, open, setOpen, error }) {
  return (
    <Collapse in={open}>
      <Alert
        severity={error ? "error" : "success"}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mt: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}

export default MsgAlert;
