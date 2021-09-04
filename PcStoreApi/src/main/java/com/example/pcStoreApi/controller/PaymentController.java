package com.example.pcStoreApi.controller;

import com.example.pcStoreApi.dto.InformationDto;
import com.example.pcStoreApi.dto.PaymentDto;
import com.example.pcStoreApi.exception.device.NoDeviceFoundException;
import com.example.pcStoreApi.exception.payment.InvalidPaymentException;
import com.example.pcStoreApi.exception.payment.NoPaymentFoundException;
import com.example.pcStoreApi.exception.user.NoUserFoundException;
import com.example.pcStoreApi.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/get-all")
    public ResponseEntity<List<PaymentDto>> getAll() {

        try {
            return new ResponseEntity<>(paymentService.getAll(), HttpStatus.OK);
        } catch (NoPaymentFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/get-all-by-user-id")
    public ResponseEntity<List<PaymentDto>> getAllByUserId(@RequestBody InformationDto informationDto) {

        try {
            return new ResponseEntity<>(paymentService.getAllByUserId(informationDto.getUserId()), HttpStatus.OK);
        } catch (NoPaymentFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<List<PaymentDto>> save(@RequestBody List<PaymentDto> paymentDtos){

        try {
            return new ResponseEntity<>(paymentService.save(paymentDtos), HttpStatus.OK);
        } catch (InvalidPaymentException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (NoUserFoundException | NoDeviceFoundException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<PaymentDto> delete(@RequestBody InformationDto informationDto){

        try {
            paymentService.delete(informationDto.getPaymentId());
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (NoPaymentFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
