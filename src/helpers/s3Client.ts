import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { env } from '@/env';

const s3Client = new S3Client({
  region: env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export const listObjects = (prefix: string) => {
  const command = new ListObjectsV2Command({
    Bucket: env.VITE_S3_BUCKET_NAME,
    Prefix: prefix,
    Delimiter: '/',
  });
  return s3Client.send(command);
};

export const putObject = (
  key: string,
  body: string | Uint8Array | ReadableStream | Blob,
  contentType: string,
) => {
  const command = new PutObjectCommand({
    Bucket: env.VITE_S3_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: env.VITE_PUBLIC_ACL
      ? 'public-read' // 퍼블릭 읽기 권한 설정
      : undefined,
  });
  return s3Client.send(command);
};

export const deleteObject = (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: env.VITE_S3_BUCKET_NAME,
    Key: key,
  });
  return s3Client.send(command);
};

export default s3Client;
