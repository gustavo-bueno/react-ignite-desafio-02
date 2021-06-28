import { useEffect, useState } from 'react';
import { GenreResponseProps } from '../models/genre.model';
import { api } from '../services/api';
import { Button } from './Button';

interface IProps {
  handleClick: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ handleClick, selectedGenreId }: IProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const getGenres = async () => {
    await api.get<GenreResponseProps[]>('/genres').then((response) => {
      setGenres(response.data);
    });
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClick(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
