"use client";

import { Download, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

import { getFileType } from "@/lib/file";

import type { TaskAttachment } from "../../types/attachment.type";

interface AttachmentPreviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    attachment: TaskAttachment | null;
}

export function AttachmentPreviewDialog({
    open,
    onOpenChange,
    attachment,
}: AttachmentPreviewDialogProps) {
    if (!attachment) return null;

    const type = getFileType(attachment.original_name);

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    flex
                    h-[95vh]
                    w-[95vw]
                    max-w-[95vw]
                    flex-col
                    overflow-hidden
                    rounded-xl
                    p-0
                "
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b bg-background px-6 py-4">

                    <div className="min-w-0">

                        <h2 className="truncate text-lg font-semibold">
                            {attachment.original_name}
                        </h2>

                    </div>

                    <div className="flex items-center gap-2">

                        <Button
                            asChild
                            variant="outline"
                        >
                            <a
                                href={attachment.url}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download className="mr-2 h-4 w-4" />

                                Download
                            </a>
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            <X className="h-5 w-5" />
                        </Button>

                    </div>

                </div>

                {/* Viewer */}

                <div className="flex-1 overflow-hidden bg-muted">

                    {type !== "image" &&
                        type !== "pdf" && (
                            <div className="flex h-full items-center justify-center">

                                <div className="text-center">

                                    <h3 className="text-lg font-semibold">
                                        Preview tidak tersedia
                                    </h3>

                                    <p className="mt-2 text-muted-foreground">
                                        File ini tidak mendukung preview.
                                    </p>

                                </div>

                            </div>
                        )}

                </div>

            </DialogContent>
        </Dialog>
    );
}