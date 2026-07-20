"use client";

import { useRef, useState } from "react";
import { Paperclip, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useDeleteAttachment } from "../../hooks/use-delete-attachment";
import { useUploadAttachment } from "../../hooks/use-upload-attachment";
import type { TaskAttachment } from "../../types/attachment.type";

import { AttachmentCard } from "./attachment-card";
import { AttachmentPreviewDialog } from "./attachment-preview-dialog";

interface Props {
    projectUuid: string;
    taskUuid: string;
    attachments: TaskAttachment[];
}

export function TaskAttachments({
    projectUuid,
    taskUuid,
    attachments,
}: Props) {
    const fileInput =
        useRef<HTMLInputElement>(null);

    const [
        previewOpen,
        setPreviewOpen,
    ] = useState(false);

    const [
        selectedAttachment,
        setSelectedAttachment,
    ] =
        useState<TaskAttachment | null>(
            null
        );

    const {
        mutate: upload,
        isPending: uploading,
    } = useUploadAttachment();

    const {
        mutate: remove,
        isPending: deleting,
    } = useDeleteAttachment();

    const handleUpload = (
        files: FileList | null
    ) => {
        if (!files) return;

        Array.from(files).forEach((file) => {
            upload({
                projectUuid,
                taskUuid,
                file,
            });
        });

        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };

    const handlePreview = (
        attachment: TaskAttachment
    ) => {
        setSelectedAttachment(
            attachment
        );

        setPreviewOpen(true);
    };

    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle className="flex items-center gap-2">

                    <Paperclip className="h-5 w-5" />

                    Attachments

                </CardTitle>

                <>
                    <input
                        ref={fileInput}
                        hidden
                        multiple
                        type="file"
                        onChange={(e) =>
                            handleUpload(
                                e.target.files
                            )
                        }
                    />

                    <Button
                        disabled={uploading}
                        onClick={() =>
                            fileInput.current?.click()
                        }
                    >
                        <Upload className="mr-2 h-4 w-4" />

                        {uploading
                            ? "Uploading..."
                            : "Upload"}
                    </Button>
                </>

            </CardHeader>
                        <CardContent className="space-y-6">
                {attachments.length === 0 ? (
                    <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 text-center">

                        <Paperclip className="mb-3 h-10 w-10 text-muted-foreground" />

                        <h3 className="text-base font-semibold">
                            No attachments
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Upload files related to this task.
                        </p>

                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                        {attachments.map((attachment) => (
                            <AttachmentCard
                                key={attachment.uuid}
                                attachment={attachment}
                                deleting={deleting}
                                onPreview={() =>
                                    handlePreview(
                                        attachment
                                    )
                                }
                                onDelete={() =>
                                    remove({
                                        projectUuid,
                                        taskUuid,
                                        attachmentUuid:
                                            attachment.uuid,
                                    })
                                }
                            />
                        ))}

                    </div>
                )}
            </CardContent>

            <AttachmentPreviewDialog
                open={previewOpen}
                attachment={selectedAttachment}
                onOpenChange={(open) => {
                    setPreviewOpen(open);

                    if (!open) {
                        setSelectedAttachment(
                            null
                        );
                    }
                }}
            />

        </Card>
    );
}