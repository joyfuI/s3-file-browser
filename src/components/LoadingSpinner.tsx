import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingSpinnerProps = { open: boolean };

const LoadingSpinner = ({ open }: LoadingSpinnerProps) => (
  <Backdrop
    open={open}
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default LoadingSpinner;
