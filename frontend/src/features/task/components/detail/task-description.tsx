"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskDescriptionProps {
    description: string | null;
}

export function TaskDescription({
    description,
}: TaskDescriptionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>

            <CardContent>
                {description ? (
                    <p className="whitespace-pre-wrap text-sm leading-7">
                        {description}
                    </p>
                ) : (
                    <p className="text-sm text-muted-foreground italic">
                        No description provided.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}   