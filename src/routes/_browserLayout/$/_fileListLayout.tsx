import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createFileRoute, Outlet } from '@tanstack/react-router';

const LayoutComponent = () => {
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
          <Outlet />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Route = createFileRoute('/_browserLayout/$/_fileListLayout')({
  component: LayoutComponent,
});
