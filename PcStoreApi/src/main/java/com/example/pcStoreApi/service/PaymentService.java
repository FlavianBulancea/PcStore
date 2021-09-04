package com.example.pcStoreApi.service;

import com.example.pcStoreApi.dto.PaymentDto;
import com.example.pcStoreApi.exception.device.NoDeviceFoundException;
import com.example.pcStoreApi.exception.payment.InvalidPaymentException;
import com.example.pcStoreApi.exception.payment.NoPaymentFoundException;
import com.example.pcStoreApi.exception.user.NoUserFoundException;
import com.example.pcStoreApi.mapper.PaymentMapper;
import com.example.pcStoreApi.model.Payment;
import com.example.pcStoreApi.repository.DeviceRepository;
import com.example.pcStoreApi.repository.PaymentRepository;
import com.example.pcStoreApi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    public List<PaymentDto> getAll() throws NoPaymentFoundException {

        List<PaymentDto> paymentDtos = paymentRepository.findAll().stream()
                .map(payment -> paymentMapper.modelToDto(payment))
                .collect(Collectors.toList());

        if (paymentDtos.size() == 0)
            throw new NoPaymentFoundException();

        return paymentDtos;
    }

    public List<PaymentDto> getAllByUserId(Long userId) throws NoPaymentFoundException {

        List<PaymentDto> paymentDtos = paymentRepository.findAllByUserId(userId).stream()
                .map(payment -> paymentMapper.modelToDto(payment))
                .collect(Collectors.toList());

        if (paymentDtos.size() == 0)
            throw new NoPaymentFoundException();

        return paymentDtos;
    }

    public List<PaymentDto> save(List<PaymentDto> paymentDtos)
            throws InvalidPaymentException, NoUserFoundException, NoDeviceFoundException {

        List<PaymentDto> returnedPaymentDtos = new ArrayList<>();

        for (PaymentDto paymentDto : paymentDtos) {

            checkPaymentInformation(paymentDto);

            Payment payment = paymentMapper.dtoToModel(paymentDto);
            payment = paymentRepository.save(payment);

            returnedPaymentDtos.add(paymentMapper.modelToDto(payment));
        }

        return returnedPaymentDtos;
    }

    public void delete(Long id) throws NoPaymentFoundException {

        if(paymentRepository.existsById(id))
            paymentRepository.deleteById(id);
        else
            throw new NoPaymentFoundException();
    }

    public void checkPaymentInformation(PaymentDto paymentDto)
            throws InvalidPaymentException, NoUserFoundException, NoDeviceFoundException{

        if(paymentDto.getAmount()<0)
            throw new InvalidPaymentException();

        if (!userRepository.existsById(paymentDto.getUserId()))
            throw new NoUserFoundException();

        if (!deviceRepository.existsById(paymentDto.getDeviceId()))
            throw new NoDeviceFoundException();
    }
}
