package com.todo.be.services.task.impl;

import com.todo.be.entity.task.Task;
import com.todo.be.repository.task.TaskRepository;
import com.todo.be.services.task.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServicesImpl implements TaskServices {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServicesImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getTask() {
        return this.taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long idTask) {
        return this.taskRepository.findById(idTask).orElse(null);
    }

    @Override
    public List<Task> getTaskByFolder(Long idFolder) {
        return this.taskRepository.findByFolder_Id(idFolder);
    }



    @Override
    public Boolean deleteByFolder(Long idFolder) {
        if(this.taskRepository.existsByFolder_Id(idFolder)){
            List<Task> taskList = this.taskRepository.findByFolder_Id(idFolder);
            taskList.forEach(task -> this.taskRepository.deleteById(task.getId()));
            return true;
        }else{
            return true;
        }
    }

    @Override
    public Task save(Task newTask) {
        if(this.taskRepository.existsByDetail(newTask.getDetail())){
            return null;
        }else{
            return this.taskRepository.save(newTask);
        }
    }

    @Override
    public Task update(Task editTask) {
        if(this.taskRepository.existsByDetail(editTask.getDetail())){
            return null;
        }else{
            return this.taskRepository.save(editTask);
        }
    }

    @Override
    public Boolean delete(Long idTask) {
        if(this.taskRepository.existsById(idTask)){
            this.taskRepository.deleteById(idTask);
            return true;
        }else{
            return false;
        }
    }
    @Override
    public Boolean checkTask(Long idTask){
        Optional<Task> taskOp = this.taskRepository.findById(idTask);
        if(taskOp.isPresent()){
            Task task = taskOp.get();
            task.setChecked(true);
            this.taskRepository.save(task);
            return true;
        }else{
            return false;
        }
    }

}
