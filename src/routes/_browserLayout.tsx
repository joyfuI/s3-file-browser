import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import GlobalElements from '@/components/layouts/GlobalElements';
import { env } from '@/env';

const LayoutComponent = () => {
  return (
    <>
      <Container sx={{ padding: 5 }}>
        <Typography align="center" gutterBottom variant="h6">
          버킷: {env.VITE_S3_BUCKET_NAME}
        </Typography>

        <Outlet />
      </Container>

      <GlobalElements />
    </>
  );
};

export const Route = createFileRoute('/_browserLayout')({
  component: LayoutComponent,
});
