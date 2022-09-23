import { Config } from "@serverless-stack/node/config";
import { CamelCasePlugin } from "kysely";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { fetch } from "undici";

import type { DB } from "./types";

// @ts-ignore
const url = Config.DATABASE_URL;

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url,
    fetch,
  }),
  plugins: [
    new CamelCasePlugin({
      underscoreBeforeDigits: true,
      underscoreBetweenUppercaseLetters: true,
    }),
  ],
  log: process.env.IS_LOCAL ? ["query", "error"] : ["error"],
});
