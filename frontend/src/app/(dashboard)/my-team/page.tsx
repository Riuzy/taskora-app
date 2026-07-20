"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useRouter } from "next/navigation";

import TeamDetailPage from "@/features/team/pages/team-detail-page";
import { useTeam } from "@/features/team/hooks/use-team";
import { AuthGuard } from "@/features/auth/components/auth-guard";

export default function MyTeamPage() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const hydrated = useAuthStore((state) => state.hydrated);

    const uuid = user?.team?.uuid;

    const { data: team, isLoading } = useTeam(uuid);

    if (!hydrated) {
        return null;
    }

    if (!user) {
        router.replace("/login");
        return null;
    }

    if (user.role !== "staff") {
        router.replace("/dashboard");
        return null;
    }

    if (isLoading || !team) {
        return (
            <div className="flex h-80 items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!uuid) {
        return (
            <div className="rounded-lg border bg-white p-6 text-center text-sm text-muted-foreground">
                Your team information is not available.
            </div>
        );
    }

    return (
        <AuthGuard>
            <TeamDetailPage
                uuid={uuid}
                canManageMembers={false}
                isStaffView
            />
        </AuthGuard>
    );
}
