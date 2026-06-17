package com.cineverse.service;

import com.cineverse.entity.Movie;
import com.cineverse.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private MovieRepository movieRepository;

    @Override
    public void run(String... args) throws Exception {
        if (movieRepository.count() == 0) {
            Movie movie1 = new Movie();
            movie1.setTitle("Inception");
            movie1.setDescription("A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.");
            movie1.setGenre("Sci-Fi");
            movie1.setRating(8.8);

            Movie movie2 = new Movie();
            movie2.setTitle("The Dark Knight");
            movie2.setDescription("When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.");
            movie2.setGenre("Action");
            movie2.setRating(9.0);

            Movie movie3 = new Movie();
            movie3.setTitle("Interstellar");
            movie3.setDescription("A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.");
            movie3.setGenre("Sci-Fi");
            movie3.setRating(8.6);

            Movie movie4 = new Movie();
            movie4.setTitle("Parasite");
            movie4.setDescription("Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.");
            movie4.setGenre("Thriller");
            movie4.setRating(8.6);

            movieRepository.save(movie1);
            movieRepository.save(movie2);
            movieRepository.save(movie3);
            movieRepository.save(movie4);
        }
    }
}
