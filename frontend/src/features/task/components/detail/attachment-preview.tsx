"use client";

import {
    File,
    FileArchive,
    FileImage,
    FileSpreadsheet,
    FileText,
    Presentation,
} from "lucide-react";

import { getFileType } from "@/lib/file";

import type { TaskAttachment } from "../../types/attachment.type";

interface AttachmentPreviewProps {
    attachment: TaskAttachment;
    onPreview: () => void;
}

export function AttachmentPreview({
    attachment,
    onPreview,
}: AttachmentPreviewProps) {
    const type = getFileType(attachment.original_name);

    switch (type) {
        case "image":
            return (
                <button
                    type="button"
                    onClick={onPreview}
                    className="group flex h-64 w-full items-center justify-center overflow-hidden bg-muted"
                >
                    <img
                        src={attachment.url}
                        alt={attachment.original_name}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </button>
            );

        case "pdf":
            return (
                <button
                    type="button"
                    onClick={onPreview}
                    className="group flex h-64 w-full flex-col items-center justify-center bg-muted transition hover:bg-muted/80"
                >
                    <FileText className="mb-4 h-20 w-20 text-red-500" />

                    <span className="rounded-md bg-background px-3 py-1 text-xs shadow">
                        Preview PDF
                    </span>
                </button>
            );

        case "document":
            return (
                <div className="flex h-64 flex-col items-center justify-center bg-muted">
                    <FileText className="mb-4 h-20 w-20 text-blue-500" />

                    <span className="text-sm font-medium">
                        Document
                    </span>
                </div>
            );

        case "spreadsheet":
            return (
                <div className="flex h-64 flex-col items-center justify-center bg-muted">
                    <FileSpreadsheet className="mb-4 h-20 w-20 text-green-600" />

                    <span className="text-sm font-medium">
                        Spreadsheet
                    </span>
                </div>
            );

        case "presentation":
            return (
                <div className="flex h-64 flex-col items-center justify-center bg-muted">
                    <Presentation className="mb-4 h-20 w-20 text-orange-500" />

                    <span className="text-sm font-medium">
                        Presentation
                    </span>
                </div>
            );

        case "archive":
            return (
                <div className="flex h-64 flex-col items-center justify-center bg-muted">
                    <FileArchive className="mb-4 h-20 w-20 text-yellow-500" />

                    <span className="text-sm font-medium">
                        Archive
                    </span>
                </div>
            );

        default:
            return (
                <div className="flex h-64 flex-col items-center justify-center bg-muted">
                    <File className="mb-4 h-20 w-20 text-muted-foreground" />

                    <span className="text-sm font-medium">
                        File
                    </span>
                </div>
            );
    }
}