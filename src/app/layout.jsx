import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Taskportalen",
    template: "%s | Taskportalen"
  },
  description: "Fördela och hantera arbetsuppgifter för era anställda tillsammans med Taskportalen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-950 min-h-screen`}
      >
        <Providers>
          
          <Navbar />
          <main className=" wrapper ">
          <div className="my-4  not-dark:bg-gray-200 dark:bg-gray-900 rounded-2xl p-4 sm:p-8 min-h-[calc(100vh-2rem)]">
          {children}
          </div>

          </main>
         <Footer />

        </Providers>
      </body>
    </html>
  );
}
