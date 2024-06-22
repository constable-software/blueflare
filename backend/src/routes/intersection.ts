import { publicProcedure } from "../trpc";
import { z } from "zod";

export const phaseHistory = publicProcedure
  .input(z.object({
    id: z.string({ description: "LM ID of the intersection in question." }),
  }))
  .query(({ input }) => {
    return {
      id: input.id,

    };
  });

export const calcShift = publicProcedure
  .input(z.object({
    id: z.string({ description: "LM ID of the intersection in question." }),
    time: z.number({ description: "Time in seconds to shift the phase by." }),
  }))
  .query(({ input }) => {
    return {
      id: input.id,
    };
  })