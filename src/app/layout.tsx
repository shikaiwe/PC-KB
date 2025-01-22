import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PC维修知识库",
  description: "专业的PC维修知识分享平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-500 dark:text-gray-400 space-y-2">
                  <p className="text-sm">
                    © {new Date().getFullYear()} 广州南方学院PC志愿者服务队出品
                  </p>
                  <p className="text-sm">
                    Made with{" "}
                    <span className="text-red-500 animate-pulse">❤️</span> by
                    QiannanYou
                  </p>
                </div>
              </div>
            </footer>
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
