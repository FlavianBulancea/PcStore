package com.example.pcStoreApi.repository;

import com.example.pcStoreApi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsernameAndPassword(String username, String password);

    User findByEmail(String email);

    User findByUsername(String username);

    User findByPhoneNumber(Long phoneNumber);
}
