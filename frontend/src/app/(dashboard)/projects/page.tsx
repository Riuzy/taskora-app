import { ProjectsPage } from "@/features/project/pages/project-page";
import { PermissionGuard } from "@/features/auth/components/permission-guard";
import { permissions } from "@/features/auth/lib/permissions";

export default function Page() {
    return (
        <PermissionGuard roles={permissions.project.view}>
            <ProjectsPage />
        </PermissionGuard>
    );
}