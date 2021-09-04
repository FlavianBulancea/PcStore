package com.example.pcStoreApi.exception.payment;

import com.example.pcStoreApi.exception.DeviceShopException;

public class NoPaymentFoundException extends DeviceShopException {

    public static final String MESSAGE = "No payment found.";

    public NoPaymentFoundException() {
        super(MESSAGE);
    }
}