import { Application } from "./deps.ts";
import { setRoutes } from "./route/mod.ts";
import {
  logger as midLogger,
  curl,
  timing,
  empty,
  error,
  statics,
} from "./middleware/mod.ts";
import { logger } from "./service/logger.ts";

const app = new Application();

// const response = await fetch("https://cdn.jsdelivr.net/gh/hu-qi/trending-in-one/raw/toutiao-search/2020-11-29.json");


app.use(error);
app.use(midLogger);
app.use(curl);
app.use(timing);
app.use(empty);
setRoutes(app);
app.use(statics);

const port: number = Number(Deno.env.get("PORT")) || 80;

app.listen({ port });
logger.success(`Server listen at http://localhost:${port}/`);
