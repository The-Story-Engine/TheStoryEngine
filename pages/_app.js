import "@styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Fathom from "fathom-client";

function Application({ Component, pageProps }) {
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
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default appWithTranslation(Application);
