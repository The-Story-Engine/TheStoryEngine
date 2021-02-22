import React from "react";
import "@styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import * as Fathom from "fathom-client";
import { UserProvider } from "@auth0/nextjs-auth0";

function Application({ Component, pageProps }) {
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load("FLQOELXH", {
      includedDomains: ["thestoryengine.co.uk"],
      url: "https://chimpanzee.thestoryengine.co.uk/script.js",
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <SSRProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools />
        </SSRProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default appWithTranslation(Application);
