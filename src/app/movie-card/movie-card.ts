import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { TmdbService } from '../services/tmbd.service';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})

export class MovieCard {
  private tmdbService = inject(TmdbService);
  movies: Movie[] = [];

  ngOnInit(): void {
 
    this.tmdbService.getTop100Movies().then(moviesData => {
      this.movies = moviesData;
    });

    this.tmdbService.getMovieDetails('550');
  }
}

