"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Navbar from "./callable/Navbar";
import Sidebar from "./callable/Sidebar";
import Tuteur from "./callable/Tuteur";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [tuteurOpen, setTuteurOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="fixed top-0 left-0 w-full shadow-lg z-20">
        <Navbar />
      </div>

      <div className="flex min-h-screen">
        <div className="fixed top-15 left-0 h-full shadow-lg z-20 w-44">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col ml-44">
          <main className="p-0 pt-10" style={{height: "80dvh"}}>
            <Component {...pageProps} />
          </main>
        </div>
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          <button
            onClick={() => setTuteurOpen(!tuteurOpen)}
            className="w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform text-2xl"
          >
            🤖
          </button>

          {tuteurOpen && (
            <div className="w-80 xl:w-96">
              <Tuteur />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
