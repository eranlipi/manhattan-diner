// // import "@/styles/globals.css";
// import "../styles/globals.css";
// import { createNextApiHandler } from "next";
// import { NextApiRequest, NextApiResponse } from "next";
// import csurf from "csurf";
// import { ThemeProvider } from "@mui/material";
// import theme from "../styles/theme";
// import { ToastContainer } from "react-toastify";
// import { useHead, useEffect } from "next/head";

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <useHead>
//         {typeof window !== "undefined" && (
//           <meta name="csrf-token" content={window.csrfToken} key="csrf-token" />
//         )}
//       </useHead>
//       <ThemeProvider theme={theme}>
//         <Component {...pageProps} />
//         <ToastContainer />
//       </ThemeProvider>
//     </>
//   );
// }
// const csrfProtection = csurf({ cookie: true });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };



import "../styles/globals.css";
import { createNextApiHandler } from "next";
import { NextApiRequest, NextApiResponse } from "next";
import csurf from "csurf";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { ToastContainer } from "react-toastify";
import { useHead, useEffect } from "next/head";
import { NextIntlClientProvider } from "next-intl";
import {useRouter} from 'next/router';

export default function App({ Component, pageProps }) {
  console.log("pageProps.messages" , pageProps);
  const router = useRouter();

  return (
    <>
      <useHead>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="csrf-token" content={pageProps.csrfToken} key="csrf-token" />
      </useHead>
    <NextIntlClientProvider messages={pageProps.messages} 
          locale={router.locale}

    >

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
      </NextIntlClientProvider>

    </>
  );
}
const csrfProtection = csurf({ cookie: true });

export const config = {
  api: {
    bodyParser: false,
  },
};