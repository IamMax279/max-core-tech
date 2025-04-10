"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LayoutProvider from "@/providers/LayoutProvider";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <LayoutProvider>
                {children}
              </LayoutProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
