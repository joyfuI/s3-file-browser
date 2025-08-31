import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

import Image from '@/components/Image';
import Link from '@/components/Link';
import LinkCopy from '@/components/LinkCopy';
import { lsQueryOptions } from '@/helpers/QueryOptions';
import type { S3Object } from '@/helpers/s3Handler';
import useDialog from '@/hooks/useDialog';
import { useLs, useRm, useRmdir } from '@/hooks/useS3Query';
import humanBytes from '@/utils/humanBytes';

const Component = () => {
  const { _splat: path = '' } = Route.useParams();
  const { alert, confirm } = useDialog();

  const { data } = useLs(path);
  const { mutate: rmMutate } = useRm();
  const { mutate: rmdirMutate } = useRmdir();

  const handleDeleteClick = async (item: S3Object) => {
    if (item.type === 'folder') {
      if (
        await confirm(`"/${item.path.slice(0, -1)}" 폴더를 삭제하시겠습니까?`)
      ) {
        rmdirMutate(item.path, {
          onSuccess: async () => {
            await alert('폴더 삭제가 완료되었습니다.');
          },
          onError: async (error) => {
            await alert(error.message);
          },
        });
      }
    } else {
      if (await confirm(`"/${item.path}" 파일을 삭제하시겠습니까?`)) {
        rmMutate(item.path, {
          onSuccess: async () => {
            await alert('파일 삭제가 완료되었습니다.');
          },
          onError: async (error) => {
            await alert(error.message);
          },
        });
      }
    }
  };

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
          onClick={() => handleDeleteClick(item)}
          sx={{ minWidth: 0 }}
          variant="contained"
        >
          <DeleteIcon fontSize="inherit" />
        </Button>
      </TableCell>
    </TableRow>
  ));
};

const PendingComponent = () => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={5} sx={{ padding: 5 }}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
};

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <TableRow>
      <TableCell align="center" colSpan={5} sx={{ padding: 5 }}>
        {error.message}
      </TableCell>
    </TableRow>
  );
};

export const Route = createFileRoute('/_browserLayout/$/_fileListLayout/')({
  loader: ({ context: { queryClient }, params: { _splat = '' } }) =>
    queryClient.ensureQueryData(lsQueryOptions(_splat)),
  component: Component,
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
});
