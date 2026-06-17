package com.cineverse.entity;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "theatres")
@Data
public class Theatre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
}
