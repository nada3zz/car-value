import { INestApplication } from '@nestjs/common';

export function disableETags(app: INestApplication) {
  (app as any).set('etag', false);
}
