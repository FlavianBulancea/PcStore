package com.example.pcStoreApi.controller;

import com.example.pcStoreApi.dto.InformationDto;
import com.example.pcStoreApi.dto.UserDto;
import com.example.pcStoreApi.exception.user.NoUserFoundException;
import com.example.pcStoreApi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-all")
    public ResponseEntity<List<UserDto>> getAll() {

        try {
            return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
        } catch (NoUserFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/get-one")
    public ResponseEntity<UserDto> getByUsernameAndPassword(@RequestBody InformationDto informationDto) {

        try {
            return new ResponseEntity<>(userService.getByUsernameAndPassword
                    (informationDto.getUsername(), informationDto.getPassword()), HttpStatus.OK);
        } catch (NoUserFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) {

        return new ResponseEntity<>(userService.save(userDto), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> update(@RequestBody UserDto userDto) {

        try {
            return new ResponseEntity<>(userService.update(userDto), HttpStatus.OK);
        } catch (NoUserFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<UserDto> delete(@RequestBody InformationDto informationDto) {

        try {
            userService.delete(informationDto.getUserId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoUserFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}