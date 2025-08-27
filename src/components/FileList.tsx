import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import type { S3Object } from '@/helpers/s3Handler';
import useDialog from '@/hooks/useDialog';
import { useRm, useRmdir } from '@/hooks/useS3Query';
import humanBytes from '@/utils/humanBytes';

import Image from './Image';
import Link from './Link';
import LinkCopy from './LinkCopy';

const FileList = ({ list }: { list: S3Object[] }) => {
  const { alert, confirm } = useDialog();

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
          {list.map((item) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileList;
