import { env } from '@/env';

import { deleteObject, listObjects, putObject } from './s3Client';

export type S3Object = {
  type: 'folder' | 'file' | 'image';
  path: string;
  name: string;
  size?: number;
  lastModified?: Date;
  url?: string;
};

const imageExtensionRegExp = /\.(jpg|jpeg|png|gif|webp)$/i;

export const ls = async (path: string) => {
  const prefix = path === '' || path.endsWith('/') ? path : `${path}/`;
  const response = await listObjects(prefix);
  const fileList: S3Object[] = [];

  if (!response.CommonPrefixes?.length && !response.Contents?.length) {
    // 잘못된 경로일 때
    throw new Error('잘못된 경로입니다');
  }

  if (response.CommonPrefixes) {
    // 폴더 추가
    response.CommonPrefixes.forEach((item) => {
      if (item.Prefix) {
        fileList.push({
          type: 'folder',
          path: item.Prefix,
          name: item.Prefix.split('/').at(-2) ?? '',
        });
      }
    });
  }

  if (response.Contents) {
    // 파일 추가
    response.Contents.forEach((item) => {
      if (item.Key && item.Key !== prefix) {
        const encodeKey = item.Key.split('/').map(encodeURIComponent).join('/'); // /는 그대로 두고 인코딩
        const url = env.VITE_DOWNLOAD_URL
          ? `${env.VITE_DOWNLOAD_URL}/${encodeKey}`
          : `https://s3.${env.VITE_AWS_REGION}.amazonaws.com/${env.VITE_S3_BUCKET_NAME}/${encodeKey}`;
        const file: S3Object = {
          type: 'file',
          path: item.Key,
          name: item.Key.split('/').at(-1) ?? '',
          size: item.Size,
          lastModified: item.LastModified,
          url,
        };
        if (imageExtensionRegExp.test(item.Key)) {
          // 이미지 파일은 별도로 처리
          file.type = 'image';
        }
        fileList.push(file);
      }
    });
  }

  return fileList;
};

export const mkdir = async (path: string, name: string) => {
  const folderKey = path.endsWith('/') ? path : `${path}/`;
  await putObject(`${folderKey}${name}/`, '', 'application/x-directory');
};

export const upload = async (path: string, file: File) => {
  const fileKey = path.endsWith('/') ? path : `${path}/`;
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = new Uint8Array(arrayBuffer);
  await putObject(`${fileKey}${file.name}`, fileBuffer, file.type);
};

export const rm = async (path: string) => {
  await deleteObject(path);
};

export const rmdir = async (path: string) => {
  const response = await listObjects(path);
  if (response.Contents) {
    const promise = response.Contents.filter(
      (item): item is S3Object & { Key: string } => !!item.Key,
    ).map((item) => deleteObject(item.Key)); // 폴더 내 파일 삭제
    await Promise.all(promise);
  }
};
