import type { PortableTextBlock } from "@portabletext/types";

export interface Slug {
  current: string;
}

export interface Gallery {
  name: string;
  slug: Slug;
  artworks?: Artwork[];
  description?: string;
}

export interface Artwork {
  name: string;
  description: string;
  year: string;
  slug: Slug;
  galleries: Gallery[];
  image: string;
}

export interface Post {
  name: string;
  content: PortableTextBlock;
};
  