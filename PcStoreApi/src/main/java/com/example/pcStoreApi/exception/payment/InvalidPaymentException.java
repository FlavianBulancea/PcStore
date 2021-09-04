package com.example.pcStoreApi.exception.payment;

import com.example.pcStoreApi.exception.DeviceShopException;

public class InvalidPaymentException extends DeviceShopException {

    public static final String MESSAGE = "Amount must be positive.";

    public InvalidPaymentException() {
        super(MESSAGE);
    }
}