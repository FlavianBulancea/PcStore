package com.example.pcStoreApi.exception.user;

import com.example.pcStoreApi.exception.DeviceShopException;

public class InvalidEmailException extends DeviceShopException {

    public static final String MESSAGE = "The email is not valid.";

    public InvalidEmailException() {
        super(MESSAGE);
    }
}
