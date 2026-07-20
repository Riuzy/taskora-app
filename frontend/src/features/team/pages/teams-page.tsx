"use client";

import TeamTable from "../components/table/team-table";

import { useTeams } from "../hooks/use-teams";

export default function TeamsPage() {

    const { data = [], isLoading } = useTeams();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Teams

                </h1>

                <p className="text-slate-500">

                    Manage organization teams

                </p>

            </div>

            <TeamTable
                teams={data}
            />

        </div>

    );

}