import { createEnv } from '@t3-oss/env-core';
import { vite } from '@t3-oss/env-core/presets-zod';
import { z } from 'zod';

export const env = createEnv({
  extends: [vite()],

  server: {},

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: 'VITE_',

  client: {
    VITE_AWS_ACCESS_KEY_ID: z.string(),
    VITE_AWS_SECRET_ACCESS_KEY: z.string(),
    VITE_AWS_REGION: z.string().default('ap-northeast-2'),
    VITE_S3_BUCKET_NAME: z.string(),
    VITE_DOWNLOAD_URL: z.url().optional(),
    VITE_PUBLIC_ACL: z.boolean().optional().default(true),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: import.meta.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
