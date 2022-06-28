import { GetStaticProps, GetStaticPaths } from "next";
import groq from "groq";
import client from "../../client";
import { PortableText } from "@portabletext/react";
import type { Post } from "../../interfaces";
import Head from "next/head";

type Props = {
  post: Post;
};

const Page = ({ post }: Props) => {
  const { name = "", content } = post;

  return (
    <>
      <Head>
        <title>
          {name} - {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
        <meta name="description" content="Contact the artist" />
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
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  name,
  content
}`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params;
  const post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
};

export default Page;
