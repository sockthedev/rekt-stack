// This script generates our Kysely Database types. It fetches the secret we
// have configured via SST and then connects to the DB to get the schema and
// generate the types.

import { execSync } from "child_process";
import { getDatabaseUrl } from "./utils/db.mjs";

try {
  execSync(
    "yarn kysely-codegen --camel-case --dialect mysql --out-file ./services/db/types.ts",
    {
      stdio: "inherit",
      env: {
        ...process.env,
        DATABASE_URL: getDatabaseUrl(),
      },
    }
  );
} catch (err) {
  console.error("Failed to generate DB types 😭");
  console.error(err.stack);
  process.exit(1);
}
