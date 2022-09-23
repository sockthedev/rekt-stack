import type { StackContext } from "@serverless-stack/resources";

const resolveDomain = (stage: string) => {
  if (stage === "production") {
    return `rekt.sockthedev.com`;
  } else {
    return `${stage}.rekt.sockthedev.com`;
  }
};

export function DNS(ctx: StackContext) {
  return {
    hostedZone: "sockthedev.com",
    domainName: resolveDomain(ctx.app.stage),
  };
}
