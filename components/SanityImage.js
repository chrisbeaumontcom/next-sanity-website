import client from '../client';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

const SanityImage = ({ sanityimg, size }) => {
  const imageProps = useNextSanityImage(client, sanityimg);

  return (
    <Image
      {...imageProps}
      layout="responsive"
      sizes={`(max-width: ${size}px) 100vw, ${size}px`}
      alt="Image"
    />
  );
};

export default SanityImage;
