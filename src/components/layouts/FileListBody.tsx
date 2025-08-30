import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Image from '@/components/Image';
import Link from '@/components/Link';
import LinkCopy from '@/components/LinkCopy';
import type { S3Object } from '@/helpers/s3Handler';
import { useLs } from '@/hooks/useS3Query';
import humanBytes from '@/utils/humanBytes';

type FileListBodyProps = {
  path: string;
  onDeleteClick: (item: S3Object) => void;
};

const FileListBody = ({ path, onDeleteClick }: FileListBodyProps) => {
  const { data } = useLs(path);

  return data?.map((item) => (
    <TableRow
      key={item.path}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="center">
        {item.type === 'image' ? (
          <Image alt={item.name} src={item.url} sx={{ height: 80 }} />
        ) : null}
      </TableCell>
      <TableCell component="th" scope="row">
        {item.type === 'folder' ? (
          <Link to={item.name} underline="none">
            📁 {item.name}
          </Link>
        ) : (
          <LinkCopy href={item.url ?? ''}>📄 {item.name}</LinkCopy>
        )}
      </TableCell>
      <TableCell>{item.lastModified?.toLocaleString()}</TableCell>
      <TableCell align="right">
        {item.size ? humanBytes(item.size) : null}
      </TableCell>
      <TableCell align="right">
        <Button
          color="error"
          onClick={() => onDeleteClick(item)}
          sx={{ minWidth: 0 }}
          variant="contained"
        >
          <DeleteIcon fontSize="inherit" />
        </Button>
      </TableCell>
    </TableRow>
  ));
};

export default FileListBody;
