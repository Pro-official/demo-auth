import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrueNaad",
  description: "Your Own AudioBook Library",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  // if (session?.user) {
  //   // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
  //   // filter out sensitive data before passing to client.
  //   session.user = {
  //     name: session.user?.name,
  //     email: session.user.email,
  //     image: session.user.image,
  //   };
  // }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning
      >
        {/* <SessionProvider session={session}> */}
        <Navigation />
        <main>{children}</main>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
