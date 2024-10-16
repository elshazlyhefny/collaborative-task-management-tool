import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import GlobalStyleProvider from "../providers/GlobalStyleProvider";
import ContextProvider from "../providers/ContextProvider";
import NextTopLoader from "nextjs-toploader";
import {NextIntlClientProvider} from 'next-intl';
import { getMessages} from 'next-intl/server';
import { NextAuthProvider } from "../providers/NextAuthProvider";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
      // TODO:
      // if locale equals 'ar' then use direct 'rtl'
      // otherwise use 'ltr'
      <html lang={locale} >
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={nunito.className}>
          <NextIntlClientProvider messages={messages}>
          <NextAuthProvider>
            <NextTopLoader
              height={2}
              color="#27AE60"
              easing="cubic-bezier(0.53,0.21,0,1)"
            />
            <ContextProvider>
              <GlobalStyleProvider>
                <Sidebar />
                <div className="w-full">{children}</div>
              </GlobalStyleProvider>
            </ContextProvider>
            </NextAuthProvider>
          </NextIntlClientProvider>
        </body>
      </html>
      
  );
}