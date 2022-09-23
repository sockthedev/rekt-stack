import { ProductDomain } from "@rekt/services/domain";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../builder";

export const productRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(({ input }) => {
      const product = ProductDomain.get(input);
      if (product == null) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return product;
    }),
  list: t.procedure.query(() => {
    return ProductDomain.list();
  }),
});
