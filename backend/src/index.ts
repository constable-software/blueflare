import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { getRoadRoute } from "./routes/routing";
import { router } from "./trpc";

const appRouter = router({
  getRoadRoute,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const app = express();

app.use('/api/trpc', createExpressMiddleware({ router: appRouter }));
// app.use('/api', createOpenApiExpressMiddleware({ router: appRouter })); /* 👈 */

app.listen(3000);
