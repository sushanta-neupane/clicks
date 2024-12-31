import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './provider/theme-provider';
import { QueryProvider } from './components/query-provider';
import Providers from './provider/session-provider';
import { getSession } from '@/config/auth';

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: '100'
});



export const metadata: Metadata = {
  title: "Clicks",
  description: "Photo click by Sushanta",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable}  antialiased`}
        suppressHydrationWarning
      >
        <Providers session={session}>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>

              {children}
            </QueryProvider>
          </ThemeProvider>
        </Providers>

      </body>
    </html>
  );
}
