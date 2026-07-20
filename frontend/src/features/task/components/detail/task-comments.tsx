"use client";

import { useState } from "react";
import {
    MessageSquare,
    Send,
    Trash2,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { formatDateTime } from "@/lib/date";

import { useCreateComment } from "../../hooks/use-create-comment";
import { useDeleteComment } from "../../hooks/use-delete-comment";
import { TaskComment } from "../../types/comment.type";

interface TaskCommentsProps {
    projectUuid: string;
    taskUuid: string;
    comments: TaskComment[];
}

export function TaskComments({
    projectUuid,
    taskUuid,
    comments,
}: TaskCommentsProps) {
    const [content, setContent] = useState("");

    const { mutate: createComment, isPending: isCreating } =
        useCreateComment();

    const { mutate: deleteComment, isPending: isDeleting } =
        useDeleteComment();

    const handleCreate = () => {
        if (!content.trim()) return;

        createComment(
            {
                projectUuid,
                taskUuid,
                content,
            },
            {
                onSuccess: () => {
                    setContent("");
                },
            }
        );
    };

    const handleDelete = (commentUuid: string) => {
        if (!confirm("Delete this comment?")) {
            return;
        }

        deleteComment({
            projectUuid,
            taskUuid,
            commentUuid,
        });
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments
                </CardTitle>

                <span className="text-sm text-muted-foreground">
                    {comments.length} Comments
                </span>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <Textarea
                        rows={4}
                        value={content}
                        disabled={isCreating}
                        placeholder="Write a comment..."
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                    />

                    <div className="flex justify-end">
                        <Button
                            disabled={
                                !content.trim() ||
                                isCreating
                            }
                            onClick={handleCreate}
                        >
                            <Send className="mr-2 h-4 w-4" />

                            {isCreating
                                ? "Sending..."
                                : "Comment"}
                        </Button>
                    </div>
                </div>

                <Separator />

                <div className="space-y-5">
                    {comments.length === 0 ? (
                        <EmptyState />
                    ) : (
                        comments.map((comment) => (
                            <CommentCard
                                key={comment.uuid}
                                comment={comment}
                                isDeleting={isDeleting}
                                onDelete={() =>
                                    handleDelete(
                                        comment.uuid
                                    )
                                }
                            />
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    return (
        <div className="py-8 text-center text-sm text-muted-foreground">
            No comments yet.
        </div>
    );
}

interface CommentCardProps {
    comment: TaskComment;
    isDeleting: boolean;
    onDelete: () => void;
}

function CommentCard({
    comment,
    isDeleting,
    onDelete,
}: CommentCardProps) {
    return (
        <div className="flex gap-4">
            <Avatar>
                <AvatarFallback>
                    {comment.user.name
                        .substring(0, 2)
                        .toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">
                            {comment.user.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {formatDateTime(
                                comment.created_at
                            )}
                        </p>
                    </div>

                    <Button
                        size="icon"
                        variant="ghost"
                        disabled={isDeleting}
                        onClick={onDelete}
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>

                <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="whitespace-pre-wrap text-sm leading-6">
                        {comment.content}
                    </p>
                </div>
            </div>
        </div>
    );
}