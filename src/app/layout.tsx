import type { Metadata } from "next";
import { Inter, Reenie_Beanie } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });
const reenieBeanie = Reenie_Beanie({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-reenie-beanie",
});

export const metadata: Metadata = {
  title: "Connor Paton",
  description: "Personal website of Connor Paton",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${reenieBeanie.variable} antialiased`}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
