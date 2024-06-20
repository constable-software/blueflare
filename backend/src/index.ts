import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { helloWord } from "./routes/hello";
import { router } from "./trpc";

const appRouter = router({
  helloWord,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

console.log("Starting standalone server, port 3001");
server.listen(3001);
