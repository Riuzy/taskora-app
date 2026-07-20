import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(date?: string | Date | null) {
    if (!date) return "-";

    return format(new Date(date), "dd MMM yyyy", {
        locale: id,
    });
}

export function formatDateTime(date?: string | Date | null) {
    if (!date) return "-";

    return format(new Date(date), "dd MMM yyyy HH:mm", {
        locale: id,
    });
}

export function formatRelativeTime(date?: string | Date | null) {
    if (!date) return "-";

    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: id,
    });
}