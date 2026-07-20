import { Card } from "@/components/ui/card";

export default function AuthCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Card
            className="
            rounded-3xl
            border-slate-200
            shadow-xl
            p-10
            "
        >
            {children}
        </Card>
    );
}