import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Vinayak Singh Bhadoriya",
  description: "My portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="mathjax-script"
          strategy="beforeInteractive"
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js"
        />
      </head>
      <body className="min-h-screen flex flex-col relative pb-20 font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
