package com.example.pcStoreApi.service;

import com.example.pcStoreApi.dto.DeviceDto;
import com.example.pcStoreApi.dto.ShoppingCartLinkDto;
import com.example.pcStoreApi.exception.device.NoDeviceFoundException;
import com.example.pcStoreApi.exception.shoppingCartLink.ConnectionAlreadyExistsException;
import com.example.pcStoreApi.exception.shoppingCartLink.NoShoppingCartLinkFoundException;
import com.example.pcStoreApi.exception.user.NoUserFoundException;
import com.example.pcStoreApi.mapper.ShoppingCartLinkMapper;
import com.example.pcStoreApi.model.ShoppingCartLink;
import com.example.pcStoreApi.repository.DeviceRepository;
import com.example.pcStoreApi.repository.ShoppingCartLinkRepository;
import com.example.pcStoreApi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShoppingCartLinkService {

    @Autowired
    private ShoppingCartLinkRepository shoppingCartLinkRepository;

    @Autowired
    private ShoppingCartLinkMapper shoppingCartLinkMapper;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ShoppingCartLinkDto> getAll() throws NoShoppingCartLinkFoundException {

        List<ShoppingCartLinkDto> shoppingCartLinkDtos = shoppingCartLinkRepository.findAll().stream()
                .map(shoppingCartLink -> shoppingCartLinkMapper.modelToDto(shoppingCartLink))
                .collect(Collectors.toList());

        if (shoppingCartLinkDtos.size() == 0)
            throw new NoShoppingCartLinkFoundException();

        return shoppingCartLinkDtos;
    }

    public List<DeviceDto> getDevicesByUserId(Long userId) throws NoDeviceFoundException {

        List<DeviceDto> deviceDtos;

        List<ShoppingCartLinkDto> shoppingCartLinkDtos = shoppingCartLinkRepository.findAllByUserId(userId).stream()
                .map(shoppingCart -> shoppingCartLinkMapper.modelToDto(shoppingCart))
                .collect(Collectors.toList());

        System.out.println(shoppingCartLinkDtos);

        if (shoppingCartLinkDtos.size() == 0)
            throw new NoDeviceFoundException();
        else {

            List<Long> ids = new ArrayList<>();

            for (ShoppingCartLinkDto shoppingCartLinkDto : shoppingCartLinkDtos)
                ids.add(shoppingCartLinkDto.getDeviceId());

            deviceDtos = deviceService.getAllByIdIn(ids);
        }

        return deviceDtos;
    }

    public ShoppingCartLinkDto save(ShoppingCartLinkDto shoppingCartLinkDto)
            throws NoUserFoundException, NoDeviceFoundException, ConnectionAlreadyExistsException {

        Long userId = shoppingCartLinkDto.getUserId();
        Long deviceId = shoppingCartLinkDto.getDeviceId();

        if(!deviceRepository.existsById(deviceId))
            throw new NoDeviceFoundException();

        if(!userRepository.existsById(userId))
            throw new NoUserFoundException();

        ShoppingCartLink shoppingCartLink = shoppingCartLinkRepository.findByUserIdAndDeviceId(userId,deviceId);

        if(shoppingCartLink != null)
            throw new ConnectionAlreadyExistsException();
        else {
            shoppingCartLink = shoppingCartLinkMapper.dtoToModel(shoppingCartLinkDto);
            shoppingCartLink = shoppingCartLinkRepository.save(shoppingCartLink);
        }

        return shoppingCartLinkMapper.modelToDto(shoppingCartLink);
    }

    public void delete(Long userId, Long deviceId) throws NoShoppingCartLinkFoundException {

        ShoppingCartLink shoppingCartLink = shoppingCartLinkRepository.findByUserIdAndDeviceId(userId, deviceId);

        if (shoppingCartLink == null)
            throw new NoShoppingCartLinkFoundException();
        else
            shoppingCartLinkRepository.deleteById(shoppingCartLink.getId());
    }
}
