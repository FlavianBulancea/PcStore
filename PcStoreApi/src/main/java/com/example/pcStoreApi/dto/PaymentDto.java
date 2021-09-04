package com.example.pcStoreApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {

    private Long id;
    private Long userId;
    private Long deviceId;
    private Timestamp dateTime;
    private Float amount;
}