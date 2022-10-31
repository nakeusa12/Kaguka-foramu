/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
// import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css';
import '../styles/main.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");
  // }, []);
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position='top-right' />
    </>
  );
}

export default MyApp;
