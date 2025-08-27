import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import theme from '@/theme';

export const Route = createRootRoute({
  component: () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
        <TanStackDevtools
          plugins={[
            { name: 'TanStack Query', render: <ReactQueryDevtoolsPanel /> },
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </ThemeProvider>
    );
  },
});
