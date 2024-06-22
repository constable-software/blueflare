// lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@blueflare/backend';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',

      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: 'getAuthCookie()',
        };
      },
    }),
  ],
});