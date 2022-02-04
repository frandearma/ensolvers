package com.todo.be.controller.users;

import com.todo.be.dto.users.UserDto;
import com.todo.be.services.users.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserServices services;

    @Autowired
    public UserController(UserServices services) {
        this.services = services;
    }
    @PostMapping
    public ResponseEntity<?> login(@RequestBody UserDto userDto){
        return null;
    }

}
