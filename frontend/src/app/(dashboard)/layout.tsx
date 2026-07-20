"use client";

import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";

import { AuthGuard } from "@/features/auth/components/auth-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
         <AuthGuard>
        <div className="flex min-h-screen bg-slate-50">

            <AppSidebar />

            <div className="flex flex-1 flex-col">

                <AppHeader />

                <main className="flex-1 p-6">

                    {children}

                </main>

            </div>

        </div>
        </AuthGuard>
    );
}