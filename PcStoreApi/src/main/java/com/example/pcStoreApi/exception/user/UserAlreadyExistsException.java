package com.example.pcStoreApi.exception.user;

import com.example.pcStoreApi.exception.DeviceShopException;

public class UserAlreadyExistsException extends DeviceShopException {

    public static final String MESSAGE = " duplicate.";

    public UserAlreadyExistsException(String value) {
        super(value + MESSAGE);
    }

}