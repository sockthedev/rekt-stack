import { execSync } from "child_process";

const stage = process.env.STAGE;

export function getDatabaseUrl() {
  const secretQueryResult = execSync(
    `yarn sst secrets get ${stage ? `--stage ${stage}` : ""} DATABASE_URL`,
    {
      env: process.env,
    }
  );

  if (secretQueryResult.toString().indexOf("DATABASE_URL is not set") !== -1) {
    console.error("DATABASE_URL secret has not been set.");
    process.exit(1);
  }

  const [DATABASE_URL] = secretQueryResult.toString().match(/(mysql.*)\n/g);

  if (!DATABASE_URL) {
    console.error("Could not get DATABASE_URL");
    process.exit(1);
  }

  return DATABASE_URL;
}
