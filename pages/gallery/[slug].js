import { useEffect } from 'react';
import groq from 'groq';
import client from '../../client';
import Head from 'next/head';
import Link from 'next/link';
import SanityImage from '../../components/SanityImage';
import { useGalleryContext } from '../../context/gallery';

const Gallery = ({ gallery }) => {
  const { name = '', description = '', slug, artworks } = gallery;

  const [currentGallery, setCurrentGallery] = useGalleryContext();

  useEffect(() => {
    const works = artworks.map((item) => {
      return item.slug.current;
    });
    setCurrentGallery({
      name,
      slug: slug.current,
      works,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>
          {name} - {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
        <meta
          name="description"
          content="View a list of artworks from this selection"
        />
      </Head>

      <div className="container p-3 mb-5">
        <div className="mb-3">
          <h1 className="text-3xl font-bold py-3">{name}</h1>
          <p>{description}</p>
        </div>
        <div className="md:grid md:grid-cols-3 gap-3">
          {artworks.map((item, i) => (
            <div key={i}>
              <div className="">
                <Link href={{ pathname: `/detail/${item.slug.current}` }}>
                  <a>
                    <SanityImage sanityimg={item.image} size={380} />
                  </a>
                </Link>
              </div>
              <div className="py-2 text-xs">
                {item.name}
                <br />
                {item.description}
                <br />
                {item.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "gallery" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

const query = groq`*[_type == "gallery" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  artworks[]->{name, 
    slug,
    description,
    year,
    image,}
}`;

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const gallery = await client.fetch(query, { slug });
  return {
    props: {
      gallery,
    },
  };
}

export default Gallery;
