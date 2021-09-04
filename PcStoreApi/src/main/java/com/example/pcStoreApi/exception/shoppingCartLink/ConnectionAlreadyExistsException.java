package com.example.pcStoreApi.exception.shoppingCartLink;

import com.example.pcStoreApi.exception.DeviceShopException;

public class ConnectionAlreadyExistsException extends DeviceShopException {

    public static final String MESSAGE = "Connection already exists.";

    public ConnectionAlreadyExistsException() {
        super(MESSAGE);
    }
}