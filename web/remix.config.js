/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // ℹ️  We need to add this configuration as our web stack depends on the
  //     tRPC router types for the typesafety to work within the tRPC client;
  serverDependenciesToBundle: [/@app\/*/],
};
