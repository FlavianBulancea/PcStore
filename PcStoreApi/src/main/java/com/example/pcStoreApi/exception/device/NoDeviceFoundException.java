package com.example.pcStoreApi.exception.device;

import com.example.pcStoreApi.exception.DeviceShopException;

public class NoDeviceFoundException extends DeviceShopException {

    public static final String MESSAGE = "No device found.";

    public NoDeviceFoundException() {
        super(MESSAGE);
    }
}