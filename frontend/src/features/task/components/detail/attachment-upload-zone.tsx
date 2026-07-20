"use client";

import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface Props {
    disabled?: boolean;
    onUpload: (files: File[]) => void;
}

export function AttachmentUploadZone({
    disabled,
    onUpload,
}: Props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        disabled,
        multiple: true,
        onDrop: onUpload,
    });

    return (
        <div
            {...getRootProps()}
            className={`
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                p-10
                transition
                ${
                    isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted"
                }
            `}
        >
            <input {...getInputProps()} />

            <UploadCloud className="mb-4 h-10 w-10 text-primary" />

            <h3 className="font-semibold">
                Drop files here
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
                or click to upload
            </p>
        </div>
    );
}