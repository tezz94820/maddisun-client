import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
          <Header />
          <main>{children}</main>
          <Footer />
          <Modal /> 
        </Providers>
      </body>
    </html>
  );
}
