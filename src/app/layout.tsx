import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "./components/common/CustomCursor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const conthrax = localFont({
  src: "./fonts/conthrax-sb.otf",
  variable: "--font-conthrax",
  weight: "600",
});
const sfuitext_reg = localFont({
  src: "./fonts/SFUIText-Regular.ttf",
  variable: "--font-sfuitext_reg",
  weight: "400",
});
const sfuitext_med = localFont({
  src: "./fonts/SFUIText-Medium.ttf",
  variable: "--font-sfuitext_med",
  weight: "500",
});
const sfuitext_semibold = localFont({
  src: "./fonts/SFUIText-Semibold.ttf",
  variable: "--font-sfuitext_semibold",
  weight: "600",
});
const sfuitext_bold = localFont({
  src: "./fonts/SFUIText-Bold.ttf",
  variable: "--font-sfuitext_bold",
  weight: "700",
});
const sfuitext_heavy = localFont({
  src: "./fonts/SFUIText-Heavy.ttf",
  variable: "--font-sfuitext_heavy",
  weight: "800",
});

export const metadata: Metadata = {
  title: "Astra",
  description:
    "The fashion factory of the future. Revolutionize fashion with Astra: AI-powered designs, NFTs, VR shopping, and blockchain technology.",
  openGraph: {
    title: "Astra",
    description:
      "The fashion factory of the future. Revolutionize fashion with Astra: AI-powered designs, NFTs, VR shopping, and blockchain technology.",
    images: [
      {
        url: "http://locahost:3000/images/seo-cover.jpeg",
        alt: "astra",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astra",
    description:
      "The fashion factory of the future. Revolutionize fashion with Astra: AI-powered designs, NFTs, VR shopping, and blockchain technology.",
    images: "http://astraverse.xyz/images/seo-cover.jpeg",
    creator: "@astraverse2050",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/astra.svg" sizes="any" />
      </head>
      <body
        className={`${conthrax.variable} ${sfuitext_reg.variable} ${sfuitext_med.variable} ${sfuitext_semibold.variable} ${sfuitext_bold.variable} ${sfuitext_heavy.variable} antialiased`}
      >
        <CustomCursor />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="relative flex items-center bg-[#111] text-gray-100 border rounded-lg shadow-[0_0_10px_rgba(50,50,50,0.5),0_0_20px_rgba(50,50,50,0.3)] p-4"
          bodyClassName="text-base font-medium"
          icon={false}
        />
      </body>
    </html>
  );
}
