"use client";

import {
    Download,
    Eye,
    File,
    FileArchive,
    FileImage,
    FileSpreadsheet,
    FileText,
    Presentation,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { formatDateTime } from "@/lib/date";
import { formatBytes, getFileType } from "@/lib/file";

import type { TaskAttachment } from "../../types/attachment.type";
import { AttachmentPreview } from "./attachment-preview";

interface AttachmentCardProps {
    attachment: TaskAttachment;
    deleting?: boolean;
    onDelete: () => void;
    onPreview: () => void;
}

export function AttachmentCard({
    attachment,
    deleting = false,
    onDelete,
    onPreview,
}: AttachmentCardProps) {
    const type = getFileType(attachment.original_name);

    function FileIcon() {
        switch (type) {
            case "image":
                return (
                    <FileImage className="h-5 w-5 text-sky-500" />
                );

            case "pdf":
                return (
                    <FileText className="h-5 w-5 text-red-500" />
                );

            case "document":
                return (
                    <FileText className="h-5 w-5 text-blue-500" />
                );

            case "spreadsheet":
                return (
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                );

            case "presentation":
                return (
                    <Presentation className="h-5 w-5 text-orange-500" />
                );

            case "archive":
                return (
                    <FileArchive className="h-5 w-5 text-yellow-600" />
                );

            default:
                return (
                    <File className="h-5 w-5 text-muted-foreground" />
                );
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">

            <AttachmentPreview
                attachment={attachment}
                onPreview={onPreview}
            />

            <div className="space-y-4 p-4">

                <div className="flex items-start gap-3">

                    <FileIcon />

                    <div className="min-w-0 flex-1">

                        <p className="truncate font-medium">
                            {attachment.original_name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {formatBytes(attachment.size)}
                            {" • "}
                            {formatDateTime(
                                attachment.created_at
                            )}
                        </p>

                    </div>

                </div>

                <Separator />

                <div className="flex justify-end gap-2">
                    <Button
                        asChild
                        size="icon"
                        variant="outline"
                    >
                        <a
                            href={attachment.url}
                            target="_blank"
                            download
                            rel="noopener noreferrer"
                        >
                            <Download className="h-4 w-4" />
                        </a>
                    </Button>

                    <Button
                        size="icon"
                        variant="destructive"
                        disabled={deleting}
                        onClick={onDelete}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                </div>

            </div>

        </div>
    );
}