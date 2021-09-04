package com.example.pcStoreApi.exception.shoppingCartLink;

import com.example.pcStoreApi.exception.DeviceShopException;

public class NoShoppingCartLinkFoundException extends DeviceShopException {

    public static final String MESSAGE = "No shopping cart found.";

    public NoShoppingCartLinkFoundException() {
        super(MESSAGE);
    }
}