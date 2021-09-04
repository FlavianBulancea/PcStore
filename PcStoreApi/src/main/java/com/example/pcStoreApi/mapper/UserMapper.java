package com.example.pcStoreApi.mapper;

import com.example.pcStoreApi.dto.UserDto;
import com.example.pcStoreApi.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User dtoToModel(UserDto dto);

    UserDto modelToDto(User user);
}
