import { publicProcedure } from "../trpc";

export const helloWord = publicProcedure.query(() => "Hello World")