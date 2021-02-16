import "@styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import { appWithTranslation } from "next-i18next";

function Application({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default appWithTranslation(Application);
