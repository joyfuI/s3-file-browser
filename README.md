# S3 파일 브라우저

AWS S3 파일 브라우저

## 설정

1. 프로젝트 루트에 `.env.local` 파일 생성:

```env
VITE_AWS_ACCESS_KEY_ID=your-access-key-here
VITE_AWS_SECRET_ACCESS_KEY=your-secret-key-here
VITE_AWS_REGION=ap-northeast-2
VITE_S3_BUCKET_NAME=your-bucket-name
VITE_DOWNLOAD_URL=https://s3.download.com (optional)
VITE_PUBLIC_ACL=true (optional)
```

2. 패키지 설치:

```bash
pnpm install
```

3. 개발 서버 실행:

```bash
pnpm run dev
```

## AWS 설정 요구사항

### IAM 권한

IAM 사용자에게 다음 권한이 필요합니다:

- `s3:ListBucket`
- `s3:GetObject`
- `s3:PutObject`
- `s3:PutObjectAcl` (퍼블릭 액세스를 위한 ACL 설정)
- `s3:DeleteObject`

### S3 CORS 설정

브라우저에서 직접 접근하려면 CORS 설정이 필요합니다:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"]
  }
]
```

### S3 버킷 ACL 설정

업로드된 파일이 퍼블릭 액세스 가능하도록 하려면 (VITE_PUBLIC_ACL=true):

1. **S3 콘솔** → **버킷** → **권한** → **객체 소유권**
2. **ACL 활성화됨** 선택
3. **퍼블릭 액세스 차단** 설정에서 다음 체크 해제:
   - "새 ACL을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단"
   - "임의의 ACL을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단"
