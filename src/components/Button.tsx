import { useTransition } from 'react';
import type { ButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';

const Button = ({ children, disabled, onClick, ...props }: ButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    startTransition(async () => {
      await onClick?.(event);
    });
  };

  return (
    <MuiButton
      disabled={disabled || isPending}
      onClick={handleClick}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
