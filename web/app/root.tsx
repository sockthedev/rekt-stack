import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import invariant from "tiny-invariant";

import { Header, ProgressBar } from "./components";
import { trpc } from "./hooks";
import styles from "./style.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix E2E TS",
  description: "A demonstration of E2E TypeScript with Remix (DB to UI).",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader = (args: LoaderArgs) => {
  invariant(process.env.API_URL, "API_URL must be set");
  return {
    env: {
      API_URL: process.env.API_URL,
    },
  };
};

export default function App() {
  const { env } = useLoaderData<typeof loader>();
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: env.API_URL,
          headers() {
            // Good opportunity to pop an authorization header in here 😉
            return {};
          },
        }),
      ],
    })
  );
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <ProgressBar />
            <Header />
            <Outlet />
          </QueryClientProvider>
        </trpc.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
