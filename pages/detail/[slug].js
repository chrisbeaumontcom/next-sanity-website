import groq from 'groq';
import client from '../../client';
import Link from 'next/link';
import SanityImage from '../../components/SanityImage';

const Detail = ({ artwork }) => {
  //const { name = '', description = '', year = '', galleries, image } = artwork;

  return (
    <div className="mb-5">
      <h1 className="text-3xl font-bold py-3">{artwork.name}</h1>
      <p>
        {artwork.description}, {artwork.year}
      </p>
      {artwork.galleries.map((gallery, i) => (
        <p key={i}>
          Gallery:{' '}
          <Link href={`/gallery/${gallery.slug.current}`}>{gallery.name}</Link>
        </p>
      ))}
      <div className="max-w-3xl">
        <SanityImage sanityimg={artwork.image} size={800} />
      </div>
    </div>
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
  description,
  year,
  image,
  "galleries": *[_type == "gallery" && references(^._id)][]{name,slug}
}`;

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const artwork = await client.fetch(query, { slug });
  return {
    props: {
      artwork,
    },
  };
}

export default Detail;
