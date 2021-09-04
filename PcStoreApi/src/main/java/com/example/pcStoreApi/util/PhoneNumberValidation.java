package com.example.pcStoreApi.util;

public class PhoneNumberValidation {

    public static boolean isTrue(Long phoneNumber) {

        int numberOfDigits = 0;

        while (phoneNumber != 0) {
            phoneNumber/=10;
            numberOfDigits++;
        }

        if(numberOfDigits == 9)
            return true;
        else
            return false;
    }
}
