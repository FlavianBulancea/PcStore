package com.example.pcStoreApi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Device {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String title;
    private String cpu;
    private String videoCard;
    private String ram;
    private String internalMemory;
    private String camera;
    private String batteryLife;
    private String display;
    private Float price;

    @OneToOne(mappedBy = "device")
    private Payment payment;
}
