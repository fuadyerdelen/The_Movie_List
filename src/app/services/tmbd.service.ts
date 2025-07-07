import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Movie } from '../movie.model';


interface TmdbMovie { id: number; title: string; overview: string; poster_path: string; release_date: string; vote_average: number; genre_ids: number[]; }
interface TmdbResponse { results: TmdbMovie[]; }
interface TmdbGenre { id: number; name: string; }

export interface TmdbMovieDetail {
    id: string;
    title: string;
    tagline: string;
    description: string;
    year: number;
    posterUrl: string;
    genre: string;
    averageRating: number;
    userRating: number;
    credits: {
        cast: { name: string; profile_path: string; character: string; }[];
    };
}

@Injectable({
    providedIn: 'root'
})

export class TmdbService {

    private http = inject(HttpClient);

    private apiKey = environment.tmdb.apiKey;
    private baseUrl = environment.tmdb.baseUrl;
    private imageBaseUrl = environment.tmdb.imageBaseUrl;

    private genreMap = new Map<number, string>();

    constructor() {
        this.fetchAndStoreGenres();
    }

    // En iyi 100 film
    public async getTop100Movies(): Promise<Movie[]> {
        if (this.genreMap.size === 0) {
            await this.fetchAndStoreGenres();
        }

        const pagesToFetch = [1, 2, 3, 4, 5];
        const requests = pagesToFetch.map(page =>
            this.http.get<TmdbResponse>(`${this.baseUrl}/movie/top_rated`, {
                params: { api_key: this.apiKey, language: 'en-US', page: page.toString() }
            }).toPromise()

        );

        const responses = await Promise.all(requests);


        const allTmdbMovies = responses.flatMap(response => response?.results || []);


        const mappedMovies = allTmdbMovies.map(tmdbMovie => this.mapTmdbMovieToAppMovie(tmdbMovie));

        return mappedMovies;
    }

    public async getMovieDetails(id: string): Promise<TmdbMovieDetail> {
        const response = await this.http.get<any>(`${this.baseUrl}/movie/${id}`, {
            params: {
                api_key: this.apiKey,
                language: 'en-US',
                append_to_response: 'credits'
            }
        }).toPromise();



        const mappedDetail = this.mapToMovieDetail(response);


        return mappedDetail;
    }

    private async fetchAndStoreGenres(): Promise<void> {
        try {
            const response = await this.http.get<{ genres: TmdbGenre[] }>(`${this.baseUrl}/genre/movie/list`, {
                params: { api_key: this.apiKey, language: 'tr-TR' }
            }).toPromise();


            console.log('TMDB Ham Tür (Genre) Listesi:', response);

            response?.genres.forEach(genre => {
                this.genreMap.set(genre.id, genre.name);
            });


            console.log('Oluşturulan Tür (Genre) Haritası:', this.genreMap);

        } catch (error) {
            console.error('Film türleri çekilemedi:', error);
        }
    }

    private mapTmdbMovieToAppMovie(tmdbMovie: TmdbMovie): Movie {
        const genreNames = tmdbMovie.genre_ids.map(id => this.genreMap.get(id)).filter(Boolean).join(', ');
        return {
            id: tmdbMovie.id.toString(),
            title: tmdbMovie.title,
            description: tmdbMovie.overview || 'Açıklama mevcut değil.',
            year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 0,
            posterUrl: tmdbMovie.poster_path ? `${this.imageBaseUrl}${tmdbMovie.poster_path}` : 'https://via.placeholder.com/400x600.png?text=Poster+Bulunamadı',
            genre: genreNames || 'Bilinmiyor',
            averageRating: tmdbMovie.vote_average,
            userRating: 0,
        };
    }

    private mapToMovieDetail(data: any): TmdbMovieDetail {
        return {
            id: data.id.toString(),
            title: data.title,
            tagline: data.tagline,
            description: data.overview,
            year: data.release_date ? new Date(data.release_date).getFullYear() : 0,
            posterUrl: data.poster_path ? `${environment.tmdb.imageBaseUrl.replace('w400', 'w500')}${data.poster_path}` : 'https://via.placeholder.com/500x750.png?text=Poster+Bulunamadı',
            genre: data.genres.map((g: any) => g.name).join(', '),
            averageRating: data.vote_average,
            userRating: 0,
            credits: data.credits
        };
    }


}