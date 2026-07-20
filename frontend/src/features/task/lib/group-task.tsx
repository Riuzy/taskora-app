import { Task } from "../types/task.type";

export function groupTasks(tasks: Task[]) {
    return {
        todo: tasks.filter(
            (task) => task.status === "todo"
        ),

        in_progress: tasks.filter(
            (task) =>
                task.status === "in_progress"
        ),

        review: tasks.filter(
            (task) =>
                task.status === "review"
        ),

        done: tasks.filter(
            (task) => task.status === "done"
        ),
    };
}