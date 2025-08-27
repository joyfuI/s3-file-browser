import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

type UploadButtonProps = Omit<ButtonProps, 'onChange'> & {
  children?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const HiddenInput = styled('input')({
  width: 1,
  height: 1,
  position: 'absolute',
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
});

const UploadButton = ({ children, onChange, ...props }: UploadButtonProps) => {
  return (
    <Button component="label" tabIndex={-1} {...props}>
      {children}
      <HiddenInput onChange={onChange} type="file" />
    </Button>
  );
};

export default UploadButton;
