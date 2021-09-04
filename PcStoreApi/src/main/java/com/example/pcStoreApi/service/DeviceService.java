package com.example.pcStoreApi.service;

import com.example.pcStoreApi.dto.DeviceDto;
import com.example.pcStoreApi.dto.PaymentDto;
import com.example.pcStoreApi.exception.device.NoDeviceFoundException;
import com.example.pcStoreApi.exception.payment.NoPaymentFoundException;
import com.example.pcStoreApi.mapper.DeviceMapper;
import com.example.pcStoreApi.model.Device;
import com.example.pcStoreApi.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DeviceMapper deviceMapper;

    @Autowired
    private PaymentService paymentService;

    public List<DeviceDto> getAll() throws NoDeviceFoundException {

        List<DeviceDto> deviceDtos = deviceRepository.findAll().stream()
                .map(device -> deviceMapper.modelToDto(device))
                .collect(Collectors.toList());

        if (deviceDtos.size() == 0)
            throw new NoDeviceFoundException();

        return deviceDtos;
    }

    public List<DeviceDto> getAllInStock() throws NoDeviceFoundException {

        List<DeviceDto> deviceDtos = deviceRepository.findAll().stream()
                .map(device -> deviceMapper.modelToDto(device))
                .collect(Collectors.toList());

        if (deviceDtos.size() == 0)
            throw new NoDeviceFoundException();

        try {

            for (PaymentDto paymentDto : paymentService.getAll())
                deviceDtos.removeIf(deviceDto -> deviceDto.getId().equals(paymentDto.getDeviceId()));

        } catch (NoPaymentFoundException e) {
            e.printStackTrace();
        }

        return deviceDtos;
    }

    public List<DeviceDto> getAvailableFromList(List<Long> ids) throws NoDeviceFoundException {

        List<DeviceDto> availableDeviceDtos = new ArrayList<>();

        List<DeviceDto> deviceDtos = getAllInStock();

        for (DeviceDto deviceDto : deviceDtos) {
            if(ids.contains(deviceDto.getId()))
                availableDeviceDtos.add(deviceDto);
        }

        if(availableDeviceDtos.size() == 0)
            throw new NoDeviceFoundException();

        return deviceDtos;
    }

    public List<DeviceDto> getAllByIdIn(List<Long> ids) throws NoDeviceFoundException {

        List<DeviceDto> deviceDtos = deviceRepository.findAllByIdIn(ids).stream()
                .map(device -> deviceMapper.modelToDto(device))
                .collect(Collectors.toList());

        if (deviceDtos.size() == 0)
            throw new NoDeviceFoundException();

        return deviceDtos;
    }

    public DeviceDto save(DeviceDto deviceDto) {

        Device device = deviceMapper.dtoToModel(deviceDto);
        device = deviceRepository.save(device);

        return deviceMapper.modelToDto(device);
    }

    public DeviceDto update(DeviceDto deviceDto) throws NoDeviceFoundException {

        Optional<Device> optionalDevice = deviceRepository.findById(deviceDto.getId());

        if (!optionalDevice.isPresent())
            throw new NoDeviceFoundException();

        Device device = deviceMapper.dtoToModel(deviceDto);

        deviceRepository.save(device);

        return deviceMapper.modelToDto(device);
    }

    public void delete(Long id) throws NoDeviceFoundException {

        if (deviceRepository.existsById(id))
            deviceRepository.deleteById(id);
        else
            throw new NoDeviceFoundException();
    }
}
