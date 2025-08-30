import { Suspense, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import type { S3Object } from '@/helpers/s3Handler';
import useDialog from '@/hooks/useDialog';
import useQueryData from '@/hooks/useQueryData';
import { useRm, useRmdir } from '@/hooks/useS3Query';

import FileListBody from './FileListBody';

type FileListProps = { path: string };

const FileList = ({ path }: FileListProps) => {
  const { alert, confirm } = useDialog();
  const [retryCount] = useQueryData(['retryCount'], 0);

  const { mutate: rmMutate } = useRm();
  const { mutate: rmdirMutate } = useRmdir();

  const handleDeleteClick = useCallback(
    async (item: S3Object) => {
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
    },
    [alert, confirm, rmMutate, rmdirMutate],
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>이름</TableCell>
            <TableCell>수정한 날짜</TableCell>
            <TableCell>크기</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                fallbackRender={({ error }) => (
                  <TableRow>
                    <TableCell align="center" colSpan={5} sx={{ padding: 5 }}>
                      {error.message}
                    </TableCell>
                  </TableRow>
                )}
                onReset={reset}
                resetKeys={[path, retryCount]}
              >
                <Suspense
                  fallback={
                    <TableRow>
                      <TableCell align="center" colSpan={5} sx={{ padding: 5 }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  }
                >
                  <FileListBody onDeleteClick={handleDeleteClick} path={path} />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileList;
