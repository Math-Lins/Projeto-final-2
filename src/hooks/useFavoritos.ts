import { useState, useEffect } from 'react';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoritos');
    if (stored) {
      setFavoritos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  function toggleFavorito(id: number) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }

  return { favoritos, toggleFavorito };
}
