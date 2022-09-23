import type { StackContext } from "@serverless-stack/resources";
import { Api as ApiGatewayV2, use } from "@serverless-stack/resources";

import { Database } from "./database";
import { DNS } from "./dns";

export function Api({ app, stack }: StackContext) {
  const { hostedZone, domainName } = use(DNS);
  const { DATABASE_URL } = use(Database);

  const api = new ApiGatewayV2(stack, "api", {
    cors: !app.local,
    defaults: {
      function: {
        config: [DATABASE_URL],
      },
    },
    customDomain: {
      hostedZone,
      domainName: `api.${domainName}`,
    },
    routes: {
      "GET /{proxy+}": "lambdas/api.handler",
      "POST /{proxy+}": "lambdas/api.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl ?? api.url,
  });

  return { api };
}
