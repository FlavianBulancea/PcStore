package com.example.pcStoreApi.mapper;

import com.example.pcStoreApi.dto.ShoppingCartLinkDto;
import com.example.pcStoreApi.model.ShoppingCartLink;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ShoppingCartLinkMapper {

    @Mappings({@Mapping(source = "userId", target = "user.id"),
            @Mapping(source = "deviceId", target = "device.id")})
    ShoppingCartLink dtoToModel(ShoppingCartLinkDto dto);

    @Mappings({@Mapping(source = "user.id", target = "userId"),
            @Mapping(source = "device.id", target = "deviceId")})
    ShoppingCartLinkDto modelToDto(ShoppingCartLink shoppingCartLink);
}
