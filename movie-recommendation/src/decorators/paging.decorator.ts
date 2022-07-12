import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';
import {IPaging} from "../types/paging";

export const Paging = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IPaging => {
        const {
            query: {limit, sort, skip} = {limit: 10, skip: 0, sort: undefined},
        } = ctx.switchToHttp().getRequest();
        return {limit, sort, skip};
    },
);
