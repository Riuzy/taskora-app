import TeamDetailPage
from "@/features/team/pages/team-detail-page";

interface Props {
    params: Promise<{
        uuid: string;
    }>;
}

export default async function Page({
    params,
}: Props) {

    const { uuid } =
        await params;

    return (
        <TeamDetailPage
            uuid={uuid}
        />
    );

}