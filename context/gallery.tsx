import React, { createContext, useContext, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export type CurrentGallery = {
  name: string;
  slug: string;
  works?: string[];
} | null;

type GalleryContextType = {
  gallery: CurrentGallery | null;
  setGallery: (gallery: CurrentGallery) => void;
};

export const GalleryContext = createContext<GalleryContextType | null>(null);

export const GalleryProvider: React.FC<Props> = ({ children }) => {
  const [currentGallery, setCurrentGallery] = useState<CurrentGallery>(null);

  return (
    <GalleryContext.Provider
      value={{ gallery: currentGallery, setGallery: setCurrentGallery }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export function useGalleryContext() {
  return useContext(GalleryContext);
}
