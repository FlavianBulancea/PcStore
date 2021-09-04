package com.example.pcStoreApi.mapper;

import com.example.pcStoreApi.dto.PaymentDto;
import com.example.pcStoreApi.model.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mappings({@Mapping(source = "userId", target = "user.id"),
            @Mapping(source = "deviceId", target = "device.id")})
    Payment dtoToModel(PaymentDto dto);

    @Mappings({@Mapping(source = "user.id", target = "userId"),
            @Mapping(source = "device.id", target = "deviceId")})
    PaymentDto modelToDto(Payment payment);
}
