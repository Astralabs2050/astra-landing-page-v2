import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "./components/common/CustomCursor";

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
  description: "The fashion factory of the future",
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
      </body>
    </html>
  );
}
