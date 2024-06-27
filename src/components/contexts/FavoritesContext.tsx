import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface FavoriteContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedFavorites = localStorage.getItem('favorites');
    if (!storedFavorites) {
      return;
    }

    try {
      const parsedFavorites: string[] = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
      console.log(parsedFavorites);
    } catch (error) {
      console.error('Error parsing favorites from localStorage:', error);
    }
  }, []);

  const getNextFavorites = (id: string) => {
    let nextFavorites: string[] = [];
    if (favorites.includes(id)) {
      nextFavorites = favorites.filter((currentId) => currentId !== id);
      console.log('remove', nextFavorites);
    } else {
      nextFavorites = [...favorites, id];
      console.log('add', nextFavorites);
    }
    return nextFavorites;
  };

  const toggleFavorite = (id: string) => {
    const nextFavorites = getNextFavorites(id);
    localStorage.setItem('favorites', JSON.stringify(nextFavorites));
    setFavorites(nextFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesProvider;
