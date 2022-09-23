import type { StackContext } from "@serverless-stack/resources";
import { Config } from "@serverless-stack/resources";

export function Database(ctx: StackContext) {
  const DATABASE_URL = new Config.Secret(ctx.stack, "DATABASE_URL");

  return {
    DATABASE_URL,
  };
}
