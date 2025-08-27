import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ls, mkdir, rm, rmdir, upload } from '@/helpers/s3Handler';

export const useLs = (path: string) =>
  useQuery({
    queryKey: ['s3', 'ls', path],
    queryFn: () => ls(path),
    placeholderData: [],
  });

export const useMkdir = (path: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => mkdir(path, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['s3', 'ls', path] });
    },
  });
};

export const useUpload = (path: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => upload(path, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['s3', 'ls', path] });
    },
  });
};

export const useRm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (path: string) => rm(path),
    onSuccess: (_data, vars) => {
      const path = vars.split('/').slice(0, -1).join('/');
      queryClient.invalidateQueries({ queryKey: ['s3', 'ls', path] });
    },
  });
};

export const useRmdir = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (path: string) => rmdir(path),
    onSuccess: (_data, vars) => {
      const path = vars.split('/').slice(0, -2).join('/');
      queryClient.invalidateQueries({ queryKey: ['s3', 'ls', path] });
    },
  });
};
