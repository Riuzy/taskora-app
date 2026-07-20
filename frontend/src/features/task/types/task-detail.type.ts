import { Task } from "./task.type";
import { TaskComment } from "./comment.type";
import { TaskAttachment } from "./attachment.type";
import { TaskActivity } from "./activity.type";

export interface TaskDetail extends Task {
    comments: TaskComment[];

    attachments: TaskAttachment[];

    activities: TaskActivity[];
}