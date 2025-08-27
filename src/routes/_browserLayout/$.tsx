import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import FileList from '@/components/FileList';
import PathBreadcrumb from '@/components/PathBreadcrumb';
import UploadButton from '@/components/UploadButton';
import useDialog from '@/hooks/useDialog';
import { useLs, useMkdir, useUpload } from '@/hooks/useS3Query';

const App = () => {
  const { _splat } = Route.useParams();
  const path = _splat ?? '';

  const queryClient = useQueryClient();
  const { alert, prompt } = useDialog();

  const { data } = useLs(path);
  const { mutate: uploadMutate } = useUpload(path);
  const { mutate: mkdirMutate } = useMkdir(path);

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    queryClient.invalidateQueries({ queryKey: ['s3', 'ls', path] });
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

        <PathBreadcrumb path={_splat ?? ''} />
      </Stack>

      <FileList list={data ?? []} />
    </Box>
  );
};

export const Route = createFileRoute('/_browserLayout/$')({ component: App });
