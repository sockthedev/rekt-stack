import type { ApiRouter } from "@rekt/services/api/types";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import invariant from "tiny-invariant";

invariant(process.env.API_URL, "API_URL must be set");

export const api = createTRPCProxyClient<ApiRouter>({
  links: [
    httpBatchLink({
      url: process.env.API_URL,
    }),
  ],
});
