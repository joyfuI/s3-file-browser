import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

type ConfirmProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const Confirm = ({ children, open, onClose, onConfirm }: ConfirmProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onConfirm}>
          확인
        </Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
