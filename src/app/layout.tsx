import type { Metadata } from "next"; 
import { Inter, Poppins  } from "next/font/google";
import "./globals.css";

 
 
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",   // important for tailwind
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","600","700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Nature & Sky UAE Management",
  description: "Dashboard for User and Booking Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable}   antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
