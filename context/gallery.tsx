import React, { createContext, useContext, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
type CurrentGallery = {
  name: string;
  slug: string;
  works?: string[];
};
type GalleryContextType = {
  gallery: CurrentGallery;
  setGallery: (gallery: CurrentGallery) => void;
};

const GalleryContext = createContext<GalleryContextType | null>(null);

export const GalleryProvider: React.FC<Props> = ({ children }) => {
  const initialGallery = {
    name: "Selected Paintings",
    slug: "selected-paintings",
  };

  const [currentGallery, setCurrentGallery] =
    useState<CurrentGallery>(initialGallery);

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
