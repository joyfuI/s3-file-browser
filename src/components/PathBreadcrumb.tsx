import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import Link from './Link';

const PathBreadcrumb = ({ path }: { path: string }) => {
  const paths = path.split('/') ?? [];

  const currentPath = paths.at(-1);

  return (
    <Breadcrumbs>
      {currentPath ? (
        <Link color="inherit" to="../" underline="hover">
          root
        </Link>
      ) : (
        <Typography sx={{ color: 'text.primary' }}>root</Typography>
      )}
      {paths.slice(0, -1).map((p, i) => {
        const key = `/${paths.slice(0, i + 1).join('/')}`;
        return (
          <Link color="inherit" key={key} to={key} underline="hover">
            {p}
          </Link>
        );
      })}
      {currentPath ? (
        <Typography sx={{ color: 'text.primary' }}>{currentPath}</Typography>
      ) : null}
    </Breadcrumbs>
  );
};

export default PathBreadcrumb;
