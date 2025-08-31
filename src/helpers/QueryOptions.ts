import { queryOptions } from '@tanstack/react-query';

import { ls } from '@/helpers/s3Handler';

export const lsQueryOptions = (path: string) =>
  queryOptions({ queryKey: ['s3', 'ls', path], queryFn: () => ls(path) });
