package com.todo.be.controller.task;

import com.todo.be.entity.task.Task;
import com.todo.be.services.task.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    private final TaskServices taskServices;

    @Autowired
    public TaskController(TaskServices services, TaskServices taskServices) {
        this.taskServices = taskServices;
    }

    @GetMapping()
    public List<Task> get() {return taskServices.getTask();}

    @GetMapping("/{idTask}")
    public ResponseEntity<Task> getTask(@PathVariable(value = "idTask") Long idTask) {
        return ResponseEntity.ok().body(this.taskServices.getTaskById(idTask));
    }

    @PutMapping("/{idTask}")
    public ResponseEntity<Task> checkTask(@PathVariable(value = "idTask") Long idTask){
        if(this.taskServices.checkTask(idTask)){
            return ResponseEntity.ok().body(null);
        }else{
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping()
    /*@PreAuthorize()*/
    public ResponseEntity<Task> createTask(@RequestBody Task newTask){
        Task task = taskServices.save(newTask);
        if(task == null){
            return ResponseEntity.badRequest().body(null);
        }else{
            return new ResponseEntity<>(task, HttpStatus.CREATED);
        }
    }
    @PutMapping()
    /*@PreAuthorize()*/
    public ResponseEntity<Task> updateTask(@RequestBody Task editTask){
        Task task = taskServices.update(editTask);
        if(task == null){
            return ResponseEntity.badRequest().body(null);
        }else{
            return new ResponseEntity<>(task, HttpStatus.ACCEPTED);
        }
    }
    @DeleteMapping()
    /*@PreAuthorize()*/
    public ResponseEntity<Object> deleteTask(@RequestParam(value = "idTask") Long idTask){
        if(this.taskServices.delete(idTask)){
            return ResponseEntity.ok().body(null);
        }else{
            return ResponseEntity.badRequest().body(null);
        }
    }
    @GetMapping("/folder/{idTask}")
    public List<Task> get(@PathVariable(value = "idTask") Long idTask) {return taskServices.getTaskByFolder(idTask);}
}
