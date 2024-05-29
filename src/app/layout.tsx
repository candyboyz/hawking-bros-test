import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_providers";
import { Header } from "@/widgets/header";
import { Wrapper } from "@/shared/ui/wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hawking Bros Shop",
  description: "Hawking Bros Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Wrapper className="max-w-full">{children}</Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
