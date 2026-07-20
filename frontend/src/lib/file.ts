export function formatBytes(
    bytes?: number | null,
    decimals = 2
): string {
    if (bytes === null || bytes === undefined) {
        return "-";
    }

    if (bytes === 0) {
        return "0 B";
    }

    const k = 1024;

    const dm = decimals < 0 ? 0 : decimals;

    const sizes = [
        "B",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
    ];

    const i = Math.floor(
        Math.log(bytes) / Math.log(k)
    );

    return `${parseFloat(
        (bytes / Math.pow(k, i)).toFixed(dm)
    )} ${sizes[i]}`;
}

export type FileType =
    | "image"
    | "pdf"
    | "document"
    | "spreadsheet"
    | "presentation"
    | "archive"
    | "other";

export function getFileType(
    filename: string
): FileType {
    const ext =
        filename.split(".").pop()?.toLowerCase() ??
        "";

    if (
        [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
            "svg",
            "webp",
        ].includes(ext)
    ) {
        return "image";
    }

    if (ext === "pdf") {
        return "pdf";
    }

    if (
        ["doc", "docx"].includes(ext)
    ) {
        return "document";
    }

    if (
        ["xls", "xlsx", "csv"].includes(ext)
    ) {
        return "spreadsheet";
    }

    if (
        ["ppt", "pptx"].includes(ext)
    ) {
        return "presentation";
    }

    if (
        ["zip", "rar", "7z"].includes(ext)
    ) {
        return "archive";
    }

    return "other";
}