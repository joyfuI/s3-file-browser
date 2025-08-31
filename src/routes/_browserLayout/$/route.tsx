import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';

import Button from '@/components/Button';
import PathBreadcrumb from '@/components/PathBreadcrumb';
import UploadButton from '@/components/UploadButton';
import useDialog from '@/hooks/useDialog';
import { useMkdir, useUpload } from '@/hooks/useS3Query';

const Component = () => {
  const { _splat: path = '' } = Route.useParams();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { alert, prompt } = useDialog();

  const { mutate: uploadMutate } = useUpload(path);
  const { mutate: mkdirMutate } = useMkdir(path);

  const handleUploadChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadMutate(file, {
        onSuccess: async () => {
          await alert('파일 업로드가 완료되었습니다.');
        },
        onError: async (error) => {
          await alert(error.message);
        },
      });
    }
  };

  const handleCreateFolderClick = async () => {
    const folderName = await prompt('폴더명을 입력해주세요.');
    if (folderName) {
      mkdirMutate(folderName, {
        onSuccess: async () => {
          await alert('폴더 생성이 완료되었습니다.');
        },
        onError: async (error) => {
          await alert(error.message);
        },
      });
    }
  };

  const handleReloadClick = async () => {
    await queryClient.resetQueries({ queryKey: ['s3', 'ls', path] });
    await router.invalidate(); // 오류 경계 재설정
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 2, alignItems: 'center' }}
      >
        <ButtonGroup size="large" variant="outlined">
          <Tooltip title="파일 업로드">
            <UploadButton onChange={handleUploadChange}>
              <CloudUploadIcon />
            </UploadButton>
          </Tooltip>
          <Tooltip title="폴더 생성">
            <Button onClick={handleCreateFolderClick}>
              <CreateNewFolderIcon />
            </Button>
          </Tooltip>
          <Tooltip title="새로고침">
            <Button onClick={handleReloadClick}>
              <RefreshIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>

        <PathBreadcrumb path={path} />
      </Stack>

      <Outlet />
    </Box>
  );
};

export const Route = createFileRoute('/_browserLayout/$')({
  component: Component,
});
