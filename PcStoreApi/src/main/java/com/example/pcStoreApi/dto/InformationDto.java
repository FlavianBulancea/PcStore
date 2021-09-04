package com.example.pcStoreApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InformationDto {

    private Long userId;
    private Long deviceId;
    private Long paymentId;
    private Long shoppingCartLinkId;
    private String username;
    private String password;

    private List<Long> deviceIds;
}
