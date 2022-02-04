package com.todo.be.services.folder.impl;

import com.todo.be.entity.folder.Folder;
import com.todo.be.repository.folder.FolderRepository;
import com.todo.be.services.folder.FolderServices;
import com.todo.be.services.task.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FolderServicesImpl implements FolderServices {
    private final FolderRepository folderRepository;
    private final TaskServices taskServices;
    @Autowired
    public FolderServicesImpl(FolderRepository folderRepository, TaskServices taskServices) {
        this.folderRepository = folderRepository;
        this.taskServices = taskServices;
    }

    @Override
    public List<Folder> getFolder() {
        return this.folderRepository.findAll();
    }

    @Override
    public Folder getFolderById(Long idFolder) {
        return this.folderRepository.findById(idFolder).orElse(null);
    }

    @Override
    public Folder save(Folder newFolder) {
        if(this.folderRepository.existsByName(newFolder.getName())){
            return null;
        }else{
            return this.folderRepository.save(newFolder);
        }
    }

    @Override
    public Folder update(Folder editFolder) {
        if(this.folderRepository.existsByName(editFolder.getName())){
            return null;
        }else{
            return this.folderRepository.save(editFolder);
        }
    }

    @Override
    public Boolean delete(Long idFolder) {
        if(this.folderRepository.existsById(idFolder)){
             this.taskServices.deleteByFolder(idFolder);
             this.folderRepository.deleteById(idFolder);
             return true;
        }else{
            return false;
        }
    }
}
