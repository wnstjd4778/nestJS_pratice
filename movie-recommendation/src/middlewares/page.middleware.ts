import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PageMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { page, limit, sort } = req.query;
    req.page = page || 1;
    req.limit = limit || 10;
    req.sort = sort || undefined;
    req.skip = limit * ((isNaN(page) ? 1 : page) - 1);
    next();
  }
}
