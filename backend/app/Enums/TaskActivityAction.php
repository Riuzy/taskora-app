<?php

namespace App\Enums;

enum TaskActivityAction:string
{
    case CREATED = 'created';

    case UPDATED = 'updated';

    case STATUS_CHANGED = 'status_changed';

    case PRIORITY_CHANGED = 'priority_changed';

    case ASSIGNED = 'assigned';

    case COMMENT_ADDED = 'comment_added';

    case COMMENT_DELETED = 'comment_deleted';

    case ATTACHMENT_UPLOADED = 'attachment_uploaded';

    case ATTACHMENT_DELETED = 'attachment_deleted';

    case COMPLETED = 'completed';
}