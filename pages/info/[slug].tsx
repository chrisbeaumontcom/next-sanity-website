import { GetStaticProps, GetStaticPaths } from "next";
import groq from "groq";
import client from "../../client";
import { PortableText } from "@portabletext/react";
import type { Post } from "../../interfaces";
import Head from "next/head";

type Props = {
  post: Post;
};

const InfoPage = ({ post }: Props) => {
  const { name = "", content } = post;
  // Todo: add this field to Sanity
  const description =
    name === "Curriculum Vitae"
      ? "This page shows a list of the artist's achievements over his career."
      : "Details on this site's privacy concerns.";
  return (
    <>
      <Head>
        <title>
          {name} - {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
        <meta name="description" content={description} />
      </Head>
      <div className="info mb-5 p-2">
        <h1 className="text-3xl font-bold py-3">{name}</h1>
        <PortableText value={content} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  name,
  content
}`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params ? params.slug : "";
  const post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
};

export default InfoPage;
