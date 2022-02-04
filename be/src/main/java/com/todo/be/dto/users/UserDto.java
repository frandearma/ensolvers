package com.todo.be.dto.users;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserDto implements Serializable {
    private final String username;
    private final String password;
}
