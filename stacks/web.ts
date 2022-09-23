import type { StackContext } from "@serverless-stack/resources";
import { RemixSite, use } from "@serverless-stack/resources";

import { Api } from "./api";
import { DNS } from "./dns";

export default function Web({ stack }: StackContext) {
  const { hostedZone, domainName } = use(DNS);
  const { api } = use(Api);

  const site = new RemixSite(stack, "Site", {
    path: "web/",
    customDomain: {
      hostedZone,
      domainName,
    },
    environment: {
      API_URL: api.customDomainUrl ?? api.url,
    },
  });

  stack.addOutputs({
    WebsiteURL: site.customDomainUrl ?? site.url,
  });

  return { site };
}
