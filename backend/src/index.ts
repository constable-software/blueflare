import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { getRoadRoute } from "./routes/routing";
import { router } from "./trpc";
import cors from "cors";

const appRouter = router({
  getRoadRoute,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;


const app = express();
app.use(cors());
app.use("/api/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
