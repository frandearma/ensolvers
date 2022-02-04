package com.todo.be.services.task;

import com.todo.be.entity.task.Task;
import java.util.List;
import java.util.Optional;

public interface TaskServices {
    List<Task> getTask();
    Task getTaskById(Long idTask);
    List<Task> getTaskByFolder(Long idFolder);
    Boolean delete(Long idTask);
    Boolean deleteByFolder(Long idFolder);
    Boolean checkTask (Long idTask);
    Task save(Task newTask);
    Task update(Task editTask);
}
