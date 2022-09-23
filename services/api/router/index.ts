import { t } from "../builder";
import { productRouter } from "./product";
import { reviewsRouter } from "./reviews";

export const router = t.router({
  product: productRouter,
  reviews: reviewsRouter,
});

export type Router = typeof router;
