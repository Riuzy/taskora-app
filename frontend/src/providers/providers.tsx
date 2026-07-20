"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState } from "react";

import AuthProvider from "./auth-provider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
        >
            <QueryClientProvider client={queryClient}>

                <AuthProvider>

                    {children}

                </AuthProvider>

                <Toaster
                    richColors
                    position="top-right"
                />

            </QueryClientProvider>

        </ThemeProvider>
    );
}