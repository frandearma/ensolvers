package com.todo.be.dto.task;

import com.todo.be.entity.folder.Folder;
import lombok.Data;

import java.io.Serializable;

@Data
public class TaskDto implements Serializable {
    private final Integer id;
    private final String detail;
    private final Boolean checked;
    private final Folder folder;
}
