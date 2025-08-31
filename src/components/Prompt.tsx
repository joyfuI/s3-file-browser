import { useId } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

type PromptProps = {
  children: React.ReactNode;
  open: boolean;
  defaultValue?: string;
  onClose: () => void;
  onPrompt: (value: string) => void;
};

const Prompt = ({
  children,
  open,
  defaultValue,
  onClose,
  onPrompt,
}: PromptProps) => {
  const formId = useId();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('value')?.toString() ?? '';
    onPrompt(value);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
        <form id={formId} onSubmit={handleSubmit}>
          <TextField
            autoFocus
            defaultValue={defaultValue}
            fullWidth
            margin="dense"
            name="value"
            variant="standard"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button form={formId} type="submit">
          확인
        </Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Prompt;
