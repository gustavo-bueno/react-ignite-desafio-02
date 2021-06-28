import { useEffect, useState } from 'react';
import { GenreResponseProps } from '../models/genre.model';
import { IMovie } from '../models/movie.model';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';

interface IProps {
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: IProps) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const getMovies = async () => {
    api
      .get<IMovie[]>(`/movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  };

  const getGenreSelectedProps = async () => {
    api
      .get<GenreResponseProps>(`/genres/${selectedGenreId}`)
      .then((response) => setSelectedGenre(response.data));
  };

  useEffect(() => {
    getGenreSelectedProps();
  }, [selectedGenreId]);

  useEffect(() => {
    getMovies();
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
