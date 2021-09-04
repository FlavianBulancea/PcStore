package com.example.pcStoreApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    Long id;
    String username;
    String email;
    String fullName;
    Date dateOfBirth;
    Long phoneNumber;
    String password;
}
