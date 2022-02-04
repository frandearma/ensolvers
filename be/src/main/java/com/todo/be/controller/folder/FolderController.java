package com.todo.be.controller.folder;

import com.todo.be.entity.folder.Folder;
import com.todo.be.services.folder.FolderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
import java.util.List;

@RestController
@RequestMapping("/folder")
public class FolderController {
    private final FolderServices folderServices;

    @Autowired
    public FolderController(FolderServices folderServices) {
        this.folderServices = folderServices;
    }

    @GetMapping()
    public List<Folder> get() {return folderServices.getFolder();}

    @GetMapping("/{idFolder}")
    public ResponseEntity<Folder> get(@PathVariable(value = "idFolder") Long idFolder) {
        return ResponseEntity.ok().body(folderServices.getFolderById(idFolder));
    }
    @PostMapping()
    /*@PreAuthorize()*/
    public ResponseEntity<Folder> createFolder(@RequestBody Folder newFolder){
        Folder folder = folderServices.save(newFolder);
        if(folder == null){
            return ResponseEntity.badRequest().body(null);
        }else{
            return new ResponseEntity<>(folder, HttpStatus.CREATED);
        }
    }
    @PutMapping()
    /*@PreAuthorize()*/
    public ResponseEntity<Folder> updateFolder(@RequestBody Folder editFolder){
        Folder folder = folderServices.update(editFolder);
        if(folder == null){
            return ResponseEntity.badRequest().body(null);
        }else{
            return new ResponseEntity<>(folder, HttpStatus.ACCEPTED);
        }
    }
    @DeleteMapping()
    /*@PreAuthorize()*/
    public ResponseEntity<Object> deleteFolder(@RequestParam(value = "idFolder") Long idFolder){
        if(this.folderServices.delete(idFolder)){
            return ResponseEntity.ok().body(null);
        }else{
            return ResponseEntity.badRequest().body(null);
        }
    }
}