import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const newsReader = Newsreader({
  variable: "--font-news-reader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gather",
  description: "Build your form and collect your response.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${newsReader.className} antialiased`}>
        {children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
