import Button from "@mui/material/Button"
import MUIDialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

type DialogProps = {
  open: boolean
  handleClose: () => void
  text?: string
  title?: string
  handleComfirm: () => void
}

export default function Dialog({ open, handleClose, handleComfirm, title, text }: DialogProps) {
  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleComfirm()
            handleClose()
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}
