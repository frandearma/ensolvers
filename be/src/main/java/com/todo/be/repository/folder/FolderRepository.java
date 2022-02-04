package com.todo.be.repository.folder;

import com.todo.be.entity.folder.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    boolean existsByName(String name);
}
