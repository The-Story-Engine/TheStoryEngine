import "@styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";

function Application({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default Application;
