import type { App } from "@serverless-stack/resources";

import { Api } from "./api";
import { Database } from "./database";
import { DNS } from "./dns";
import Web from "./web";

export default function (app: App) {
  if (app.local) {
    app.setDefaultRemovalPolicy("destroy");
  }

  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app.stack(DNS).stack(Database).stack(Api).stack(Web);
}
