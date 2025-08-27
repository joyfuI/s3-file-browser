import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import copyText from '@/utils/copyText';

type LinkCopyProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { href: string };

const StyledA = styled('a')({ color: 'inherit', textDecoration: 'none' });

const LinkCopy = ({ children, href, ...props }: LinkCopyProps) => {
  return (
    <>
      <StyledA href={href} rel="noreferrer" target="_blank" {...props}>
        {children}
      </StyledA>
      <Tooltip title="URL 복사">
        <IconButton
          onClick={() => copyText(href)}
          size="small"
          sx={{ marginLeft: 0.5 }}
        >
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default LinkCopy;
