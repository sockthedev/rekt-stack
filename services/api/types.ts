// We isolate the imports/exports of this module to types only so that clients
// can import the type without importing the entire router.

import type { Router } from "./router";

export type ApiRouter = Router;
