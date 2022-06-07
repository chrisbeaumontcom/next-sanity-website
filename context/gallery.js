import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function GalleryProvider({ children }) {
  const [currentGallery, setCurrentGallery] = useState({});
  return (
    <Context.Provider value={[currentGallery, setCurrentGallery]}>
      {children}
    </Context.Provider>
  );
}

export function useGalleryContext() {
  return useContext(Context);
}
