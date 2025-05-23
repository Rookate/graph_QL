import type { Metadata } from "next";
import { Geist, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/userContext";
import RootLayoutClient from "./RootLayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibm = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Intra QL",
  description: "Generated by create next app",
  icons: {
    icon: [
      { url: '/code.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${ibm.variable} antialiased`}
      >
        <AuthProvider>
          <UserProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <RootLayoutClient>
                {children}
              </RootLayoutClient>
            </ThemeProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
