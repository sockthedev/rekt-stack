import type { ApiRouter } from "@rekt/services/api/types";
import { createTRPCReact } from "@trpc/react";

export const trpc = createTRPCReact<ApiRouter>();
