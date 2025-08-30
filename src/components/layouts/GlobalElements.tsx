import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';

import Confirm from '@/components/Confirm';
import Prompt from '@/components/Prompt';
import { useAlert, useConfirm, usePrompt } from '@/hooks/useDialog';

const GlobalElements = () => {
  const [alert, setAlert] = useAlert();
  const [confirm, setConfirm] = useConfirm();
  const [prompt, setPrompt] = usePrompt();

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleConfirmClose = (bool: boolean) => {
    confirm.callback?.(bool);
    setConfirm((prev) => ({ ...prev, open: false }));
  };

  const handlePromptClose = (str: string | null) => {
    prompt.callback?.(str);
    setPrompt((prev) => ({ ...prev, open: false }));
  };

  const action = (
    <IconButton
      aria-label="close"
      color="inherit"
      onClick={handleSnackbarClose}
      size="small"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Snackbar
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
        message={alert.message}
        onClose={handleSnackbarClose}
        open={alert.open}
      />
      <Confirm
        onClose={() => handleConfirmClose(false)}
        onConfirm={() => handleConfirmClose(true)}
        open={confirm.open}
      >
        {confirm.message}
      </Confirm>
      <Prompt
        defaultValue={prompt.defaultValue}
        onClose={() => handlePromptClose(null)}
        onPrompt={(value: string) => handlePromptClose(value)}
        open={prompt.open}
      >
        {prompt.message}
      </Prompt>
    </>
  );
};

export default GlobalElements;
