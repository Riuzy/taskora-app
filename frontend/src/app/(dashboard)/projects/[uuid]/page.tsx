import { redirect } from "next/navigation";

interface PageProps {
    params: {
        uuid: string;
    };
}

export default function Page({ params }: PageProps) {
    redirect(`/projects/${params.uuid}/overview`);
}
