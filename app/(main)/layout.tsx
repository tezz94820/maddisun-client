import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Providers from "../providers/providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* ✅ Wrap everything inside Providers */}
          <Header />
          <main>{children}</main>
          <Footer />
          <Modal /> {/* ✅ Modal will now work correctly */}
        </Providers>
      </body>
    </html>
  );
}
