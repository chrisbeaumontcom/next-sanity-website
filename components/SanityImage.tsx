import React from 'react'
import client from '../client';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

type Props = {
  sanityimg: string;
  size: number;
  altText?: string
};

const SanityImage: React.FC<Props> = ({ sanityimg, size, altText = "Image" }) => {
  const imageProps = useNextSanityImage(client, sanityimg);

  return (
    <Image
      {...imageProps}
      layout="responsive"
      sizes={`(max-width: ${size}px) 100vw, ${size}px`}
      alt={altText}
    />
  );
};

export default SanityImage;
