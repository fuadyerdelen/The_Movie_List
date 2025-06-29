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
    // Top 100 filmi çekmek için
    this.tmdbService.getTop100Movies().then(moviesData => {
      this.movies = moviesData;
    });

    // Belirli bir filmin detayını çekmek için (örneğin ID'si 550 olan Fight Club)
    this.tmdbService.getMovieDetails('550');
  }
}

