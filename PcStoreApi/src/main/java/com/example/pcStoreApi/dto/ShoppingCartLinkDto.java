package com.example.pcStoreApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingCartLinkDto {

    private Long id;
    private Long userId;
    private Long deviceId;
}
