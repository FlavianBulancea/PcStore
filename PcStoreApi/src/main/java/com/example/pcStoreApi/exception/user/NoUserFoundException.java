package com.example.pcStoreApi.exception.user;

import com.example.pcStoreApi.exception.DeviceShopException;

public class NoUserFoundException extends DeviceShopException {

    public static final String MESSAGE = "No user found.";

    public NoUserFoundException() {
        super(MESSAGE);
    }
}