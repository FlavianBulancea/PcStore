package com.example.pcStoreApi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String username;
    private String email;
    private String fullName;
    private Date dateOfBirth;
    private Long phoneNumber;
    private String password;

    @OneToMany(mappedBy = "user")
    private List<Payment> payments;
}
