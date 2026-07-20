import UsersPage from "@/features/user/pages/users-page";
import { PermissionGuard } from "@/features/auth/components/permission-guard";

export default function Page() {
    return (
        <PermissionGuard roles={["manager"]}>
            <UsersPage />
        </PermissionGuard>
    );
}