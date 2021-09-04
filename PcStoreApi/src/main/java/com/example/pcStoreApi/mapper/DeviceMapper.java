package com.example.pcStoreApi.mapper;

import com.example.pcStoreApi.dto.DeviceDto;
import com.example.pcStoreApi.model.Device;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DeviceMapper {

    Device dtoToModel(DeviceDto dto);

    DeviceDto modelToDto(Device device);
}
