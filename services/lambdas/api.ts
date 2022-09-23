import { router } from "@rekt/services/api";
import type trpc from "@trpc/server";
import type { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

function createContext({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) {
  // no context
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const handler = awsLambdaRequestHandler({
  router: router,
  createContext,
});
