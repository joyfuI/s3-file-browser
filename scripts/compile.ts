import { execSync } from 'node:child_process';
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync('dist/index.html', 'dist/404.html');
copyFileSync('scripts/redbean-2.2.com', 'myapp.com');
execSync(
  `${join('..', 'scripts', 'zip.com')} -r ${join('..', 'myapp.com')} .`,
  { cwd: 'dist', stdio: 'inherit' },
);
