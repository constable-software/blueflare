import { createTRPCReact } from '@trpc/react-query';
import type {AppRouter} from '@blueflare/backend/src/index'

export const trpc = createTRPCReact<AppRouter>();
