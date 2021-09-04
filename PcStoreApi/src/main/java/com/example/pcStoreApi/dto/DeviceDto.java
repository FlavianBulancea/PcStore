package com.example.pcStoreApi.dto;

import com.example.pcStoreApi.model.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceDto {

    Long id;
    Type type;
    String title;
    String cpu;
    String videoCard;
    String ram;
    String internalMemory;
    String camera;
    String batteryLife;
    String display;
    Float price;
}
