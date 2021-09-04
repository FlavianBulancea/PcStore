package com.example.pcStoreApi.exception.user;

import com.example.pcStoreApi.exception.DeviceShopException;

public class InvalidPhoneNumberException extends DeviceShopException {

    public static final String MESSAGE = "Your phone number must be 9 digits long.";

    public InvalidPhoneNumberException() {
        super(MESSAGE);
    }
}