package com.example.pcStoreApi.service;

import com.example.pcStoreApi.dto.UserDto;
import com.example.pcStoreApi.exception.user.NoUserFoundException;
import com.example.pcStoreApi.mapper.UserMapper;
import com.example.pcStoreApi.model.User;
import com.example.pcStoreApi.repository.UserRepository;
import com.example.pcStoreApi.util.EmailValidation;
import com.example.pcStoreApi.util.PhoneNumberValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    private boolean isUserValid;

    public List<UserDto> getAll() throws NoUserFoundException {

        List<UserDto> userDtos = userRepository.findAll().stream()
                .map(user -> userMapper.modelToDto(user))
                .collect(Collectors.toList());

        if (userDtos.size() == 0)
            throw new NoUserFoundException();

        return userDtos;
    }

    public UserDto getByUsernameAndPassword(String username, String password) throws NoUserFoundException {

        User user = userRepository.findByUsernameAndPassword(username, password);

        UserDto userDto;

        if (user == null)
            throw new NoUserFoundException();
        else
            userDto = userMapper.modelToDto(user);

        return userDto;
    }

    public UserDto save(UserDto userDto) {

        userDto = validateUser(userDto);

        User user = userMapper.dtoToModel(userDto);

        if(isUserValid)
            userRepository.save(user);

        return userMapper.modelToDto(user);
    }

    public UserDto update(UserDto userDto) throws NoUserFoundException{

        Optional<User> optionalUser = userRepository.findById(userDto.getId());

        if(!optionalUser.isPresent())
            throw new NoUserFoundException();

        userDto = validateUser(userDto);

        User user = userMapper.dtoToModel(userDto);

        if(isUserValid)
            userRepository.save(user);

        return userMapper.modelToDto(user);
    }


    public UserDto validateUser(UserDto userDto) {

        isUserValid = true;

        User user = userRepository.findByEmail(userDto.getEmail());

        if (!EmailValidation.isTrue(userDto.getEmail()) || user != null && !user.getId().equals(userDto.getId())) {
            userDto.setEmail(null);
            isUserValid = false;
        }

        user = userRepository.findByPhoneNumber(userDto.getPhoneNumber());

        if (!PhoneNumberValidation.isTrue(userDto.getPhoneNumber()) || user != null && !user.getId().equals(userDto.getId())) {
            userDto.setPhoneNumber(null);
            isUserValid = false;
        }

        user = userRepository.findByUsername(userDto.getUsername());

        if(user != null && !user.getId().equals(userDto.getId())) {
            userDto.setUsername(null);
            isUserValid = false;
        }

        return userDto;
    }

    public void delete(Long id) throws NoUserFoundException {

        if(userRepository.existsById(id))
            userRepository.deleteById(id);
        else
            throw new NoUserFoundException();
    }
}
