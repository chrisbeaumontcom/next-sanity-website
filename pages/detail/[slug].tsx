import { GetStaticProps, GetStaticPaths } from "next";
import { Artwork } from "../../interfaces";
import groq from "groq";
import client from "../../client";
import Link from "next/link";
import Head from "next/head";
import SanityImage from "../../components/SanityImage";
import { useGalleryContext } from "../../context/gallery";
import NextAndPrevious from "../../components/NextAndPrevious";

type Props = {
  artwork: Artwork;
};

const Detail = ({ artwork }: Props) => {
  const {
    name = "",
    description = "",
    year = "",
    slug,
    galleries,
    image,
  } = artwork;

  const context = useGalleryContext();

  return (
    <>
      <Head>
        <title>
          {name} {year} - {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
        <meta
          name="description"
          content={`This page displays an image and details for the art work:  ${name}, ${year}`}
        />
      </Head>
      <div className="md:flex md:flex-row my-3">
        <div className="basis-2/3 p-2">
          <SanityImage
            sanityimg={image}
            size={800}
            altText={"Photo of " + name}
          />
          {context && context.gallery && context.gallery.works && (
            <NextAndPrevious
              current={slug.current}
              list={context.gallery.works}
            />
          )}
        </div>
        <div className="basis-1/3 mb-5 p-2">
          <h1 className="text-2xl font-bold py-3">{name}</h1>
          <p>
            {description}, {year}
          </p>
          {context && context.gallery && context.gallery.works && (
            <p>
              <Link href={`/gallery/${context.gallery.slug}`}>
                <a className="text-blue-600">{context.gallery.name}</a>
              </Link>
            </p>
          )}
          {!context?.gallery?.works &&
            galleries.map((gallery, i: number) => (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    `*[_type == "artwork" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
};

const query = groq`*[_type == "artwork" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  year,
  image,
  "galleries": *[_type == "gallery" && references(^._id)][]{name,slug}
}`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params ? params.slug : "";
  const artwork = await client.fetch(query, { slug });
  return {
    props: {
      artwork,
    },
  };
};

export default Detail;
