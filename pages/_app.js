import Footer from "../common/components/Footer";
import Head from "next/head";
import Router from 'next/router';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/globals.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <div>
       <Head>
        <title>covid-19</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
