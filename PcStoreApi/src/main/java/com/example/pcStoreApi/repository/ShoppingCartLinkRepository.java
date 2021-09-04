package com.example.pcStoreApi.repository;

import com.example.pcStoreApi.model.ShoppingCartLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartLinkRepository extends JpaRepository<ShoppingCartLink, Long> {

    List<ShoppingCartLink> findAllByUserId(Long userId);

    ShoppingCartLink findByUserIdAndDeviceId(Long userId, Long deviceId);
}
