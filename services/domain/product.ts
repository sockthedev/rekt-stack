import { db } from "@rekt/services/db";

export async function get(args: { productId: string }) {
  const dbResult = await db
    .selectFrom("product")
    .where("productId", "=", args.productId)
    .selectAll()
    .executeTakeFirst();
  return dbResult;
}

export async function list() {
  const dbResult = await db.selectFrom("product").selectAll().execute();
  return dbResult;
}

export async function reviews(args: { productId: string }) {
  const dbResult = await db
    .selectFrom("review")
    .where("productId", "=", args.productId)
    .selectAll()
    .executeTakeFirst();
  return dbResult;
}
