package com.example.pcStoreApi.controller;

import com.example.pcStoreApi.dto.DeviceDto;
import com.example.pcStoreApi.dto.InformationDto;
import com.example.pcStoreApi.dto.ShoppingCartLinkDto;
import com.example.pcStoreApi.exception.device.NoDeviceFoundException;
import com.example.pcStoreApi.exception.shoppingCartLink.ConnectionAlreadyExistsException;
import com.example.pcStoreApi.exception.shoppingCartLink.NoShoppingCartLinkFoundException;
import com.example.pcStoreApi.exception.user.NoUserFoundException;
import com.example.pcStoreApi.service.ShoppingCartLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shopping-cart-link")
public class ShoppingCartLinkController {

    @Autowired
    private ShoppingCartLinkService shoppingCartLinkService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ShoppingCartLinkDto>> getAll() {

        try {
            return new ResponseEntity<>(shoppingCartLinkService.getAll(), HttpStatus.OK);
        } catch (NoShoppingCartLinkFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/get-all-devices-by-user-id")
    public ResponseEntity<List<DeviceDto>> getAll(@RequestBody InformationDto informationDto) {

        try {
            return new ResponseEntity<>(shoppingCartLinkService.getDevicesByUserId(informationDto.getUserId()), HttpStatus.OK);
        } catch (NoDeviceFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ShoppingCartLinkDto> save(@RequestBody ShoppingCartLinkDto shoppingCartLinkDto){

        try {
            return new ResponseEntity<>(shoppingCartLinkService.save(shoppingCartLinkDto), HttpStatus.OK);
        } catch (NoUserFoundException | NoDeviceFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ConnectionAlreadyExistsException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ShoppingCartLinkDto> delete(@RequestBody InformationDto informationDto){

        try {
            shoppingCartLinkService.delete(informationDto.getUserId(), informationDto.getDeviceId());
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (NoShoppingCartLinkFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}