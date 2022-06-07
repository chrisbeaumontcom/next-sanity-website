import groq from 'groq';
import client from '../../client';
import Link from 'next/link';
import Head from 'next/head';
import SanityImage from '../../components/SanityImage';
import { useGalleryContext } from '../../context/gallery';
import NextAndPrevious from '../../components/NextAndPrevious';

const Detail = ({ artwork }) => {
  const {
    name = '',
    description = '',
    year = '',
    slug,
    galleries,
    image,
  } = artwork;

  const [currentGallery, setCurrentGallery] = useGalleryContext();

  return (
    <>
      <Head>
        <title>{name} - Christopher Beaumont</title>
        <meta name="description" content="View this artwork" />
      </Head>
      <div className="mb-5">
        <h1 className="text-3xl font-bold py-3">{name}</h1>
        <p>
          {description}, {year}
        </p>
        {galleries.map((gallery, i) => (
          <p key={i}>
            Gallery:{' '}
            <Link href={`/gallery/${gallery.slug.current}`}>
              {gallery.name}
            </Link>
          </p>
        ))}
        <div className="max-w-3xl">
          <SanityImage sanityimg={image} size={800} />
        </div>
        {currentGallery.works && (
          <NextAndPrevious current={slug.current} list={currentGallery.works} />
        )}
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "artwork" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

const query = groq`*[_type == "artwork" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  year,
  image,
  "galleries": *[_type == "gallery" && references(^._id)][]{name,slug}
}`;

export async function getStaticProps(context) {
  const { slug = '' } = context.params;
  const artwork = await client.fetch(query, { slug });
  return {
    props: {
      artwork,
    },
  };
}

export default Detail;
