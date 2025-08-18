import type { Metadata } from "next";
import { Inter, Reenie_Beanie, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

const reenieBeanie = Reenie_Beanie({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-reenie-beanie",
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Connor Paton",
  description: "Personal website of Connor Paton",
  metadataBase: new URL('https://itsconnor.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${reenieBeanie.variable} ${bebasNeue.variable} antialiased`}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
