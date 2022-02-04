package com.todo.be.repository.task;


import com.todo.be.entity.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
 List<Task> findByFolder_Id(Long idFolder);
 boolean existsByFolder_Id(Long id);
 boolean existsByDetail(String name);
}
