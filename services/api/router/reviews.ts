import { ProductDomain } from "@rekt/services/domain";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../builder";

export const reviewsRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(({ input }) => {
      const reviews = ProductDomain.reviews(input);
      if (reviews == null) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return reviews;
    }),
});
