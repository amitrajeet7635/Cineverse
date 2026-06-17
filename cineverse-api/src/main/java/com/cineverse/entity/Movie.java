package com.cineverse.entity;

import javax.persistence.*;
import lombok.Data;
@Entity
@Table(name = "movies")
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private String genre;
    private double rating;
}
