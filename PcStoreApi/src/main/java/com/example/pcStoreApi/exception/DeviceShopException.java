package com.example.pcStoreApi.exception;

public class DeviceShopException extends Exception{

    private static final String MESSAGE = "Unknown error occurred !";

    public DeviceShopException() {
        super(MESSAGE);
    }

    public DeviceShopException(String message) {
        super(message);
    }
}