import groq from 'groq';
import client from '../../client';
import Link from 'next/link';
import SanityImage from '../../components/SanityImage';

const Gallery = ({ gallery }) => {
  //const { name = '', description = '', artworks = [] } = gallery;

  return (
    <div className="container p-3 mb-5">
      <div className="mb-3">
        <h1 className="text-3xl font-bold py-3">{gallery.name}</h1>
        <p>{gallery.description}</p>
      </div>
      <div className="md:grid md:grid-cols-3 gap-3">
        {gallery.artworks.map((item, i) => (
          <div key={i}>
            <div className="">
              <Link href={`/detail/${item.slug.current}`}>
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
