import TeamsPage from "@/features/team/pages/teams-page";
import { PermissionGuard } from "@/features/auth/components/permission-guard";

export default function Page() {
    return (
        <PermissionGuard roles={["manager"]}>
            <TeamsPage />
        </PermissionGuard>
    );
}