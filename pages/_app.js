import Footer from "../common/components/Footer";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
       <Head>
        <title>covid-19-next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
