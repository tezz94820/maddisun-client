import Head from "next/head";
import Modal from "../components/Modal";
import Providers from "../providers/providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Providers> 
          <main>{children}</main>
          <Modal /> 
        </Providers>
      </body>
    </html>
  );
}
