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
        <title>
          {name} {year} - {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
        <meta name="description" content="View this artwork" />
      </Head>
      <div className="md:flex md:flex-row my-3">
        <div className="basis-2/3 p-2">
          <SanityImage sanityimg={image} size={800} />
          {currentGallery.works && (
            <NextAndPrevious
              current={slug.current}
              list={currentGallery.works}
            />
          )}
        </div>
        <div className="basis-1/3 mb-5 p-2">
          <h1 className="text-2xl font-bold py-3">{name}</h1>
          <p>
            {description}, {year}
          </p>
          {currentGallery.works && (
            <p>
              <Link href={`/gallery/${currentGallery.slug}`}>
                <a className="text-blue-600">{currentGallery.name}</a>
              </Link>
            </p>
          )}
          {!currentGallery.works &&
            galleries.map((gallery, i) => (
              <p key={i}>
                <Link href={`/gallery/${gallery.slug.current}`}>
                  <a className="text-blue-600">{gallery.name}</a>
                </Link>
              </p>
            ))}
        </div>
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
