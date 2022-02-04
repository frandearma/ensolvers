package com.todo.be.services.folder;

import com.todo.be.entity.folder.Folder;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FolderServices {
    List<Folder> getFolder();
    Folder getFolderById(Long idFolder);
    Folder save(Folder newFolder);
    Folder update(Folder editFolder);
    Boolean delete(Long idFolder);
}
