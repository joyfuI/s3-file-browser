/** biome-ignore-all lint/complexity/noBannedTypes: callback은 어떤 함수가 와도 상관없어서 Function 타입으로 선언함 */
import { useCallback } from 'react';

import useQueryData from './useQueryData';

export const useAlert = () =>
  useQueryData<{ open: boolean; message: string; callback?: Function }>(
    ['alert'],
    { open: false, message: '' },
  );

export const useConfirm = () =>
  useQueryData<{ open: boolean; message: string; callback?: Function }>(
    ['confirm'],
    { open: false, message: '' },
  );

export const usePrompt = () =>
  useQueryData<{
    open: boolean;
    message: string;
    defaultValue?: string;
    callback?: Function;
  }>(['prompt'], { open: false, message: '', defaultValue: '' });

const useDialog = (): {
  alert: (message: string) => Promise<void>;
  confirm: (message: string) => Promise<boolean>;
  prompt: (message: string, defaultValue?: string) => Promise<string | null>;
} => {
  const [, setAlert] = useAlert();
  const [, setConfirm] = useConfirm();
  const [, setPrompt] = usePrompt();

  const alert = useCallback(
    (message: string) =>
      new Promise<void>((resolve) => {
        setAlert({ open: true, message });
        resolve();
      }),
    [setAlert],
  );

  const confirm = useCallback(
    (message: string) =>
      new Promise<boolean>((resolve) => {
        setConfirm({ open: true, message, callback: resolve });
      }),
    [setConfirm],
  );

  const prompt = useCallback(
    (message: string, defaultValue?: string) =>
      new Promise<string | null>((resolve) => {
        setPrompt({
          open: true,
          message,
          defaultValue: defaultValue,
          callback: resolve,
        });
      }),
    [setPrompt],
  );

  return { alert, confirm, prompt } as const;
};

export default useDialog;
