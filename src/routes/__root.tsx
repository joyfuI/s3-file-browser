import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import theme from '@/theme';

const RootComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
      <TanStackDevtools
        plugins={[
          { name: 'TanStack Query', render: <ReactQueryDevtoolsPanel /> },
          { name: 'TanStack Router', render: <TanStackRouterDevtoolsPanel /> },
        ]}
      />
    </ThemeProvider>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  { component: RootComponent },
);
