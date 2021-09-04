package com.example.pcStoreApi.controller;

import com.example.pcStoreApi.dto.DeviceDto;
import com.example.pcStoreApi.dto.InformationDto;
import com.example.pcStoreApi.dto.PaymentDto;
import com.example.pcStoreApi.exception.device.NoDeviceFoundException;
import com.example.pcStoreApi.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("/get-all")
    public ResponseEntity<List<DeviceDto>> getAll() {

        try {
            return new ResponseEntity<>(deviceService.getAll(), HttpStatus.OK);
        } catch (NoDeviceFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/get-all-in-stock")
    public ResponseEntity<List<DeviceDto>> getAllInStock() {

        try {
            return new ResponseEntity<>(deviceService.getAllInStock(), HttpStatus.OK);
        } catch (NoDeviceFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping
    public ResponseEntity<List<DeviceDto>> getAvailableFromList(@RequestBody InformationDto informationDto){

        try {
            return new ResponseEntity<>(deviceService.getAvailableFromList(informationDto.getDeviceIds()), HttpStatus.OK);
        } catch (NoDeviceFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<DeviceDto> save(@RequestBody DeviceDto deviceDto) {

            return new ResponseEntity<>(deviceService.save(deviceDto), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<DeviceDto> update(@RequestBody DeviceDto deviceDto) {

        try {
            return new ResponseEntity<>(deviceService.update(deviceDto), HttpStatus.OK);
        } catch (NoDeviceFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<PaymentDto> delete(@RequestBody InformationDto informationDto){

        try {
            deviceService.delete(informationDto.getDeviceId());
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (NoDeviceFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
