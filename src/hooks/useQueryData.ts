import { useCallback } from 'react';
import type { QueryKey } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useQueryData = <T>(
  queryKey: QueryKey,
  initialData: T | (() => T),
): [T, (value: T | ((prev: T) => T)) => void] => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData<T>(queryKey) as T,
    initialData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const setData = useCallback(
    (updater: T | ((prev: T) => T)) => {
      queryClient.setQueryData<T>(
        queryKey,
        updater as T | ((prev: T | undefined) => T),
      );
    },
    [queryClient, queryKey],
  );

  return [data as T, setData] as const;
};

export default useQueryData;
