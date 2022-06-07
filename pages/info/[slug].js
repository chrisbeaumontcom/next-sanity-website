import groq from 'groq';
import client from '../../client';
import { PortableText } from '@portabletext/react';
import Head from 'next/head';
const Page = ({ post }) => {
  const { name = '', content } = post;

  return (
    <>
      <Head>
        <title>{name} - Christopher Beaumont</title>
        <meta name="description" content="Contact the artist" />
      </Head>
      <div className="mb-5 info">
        <h1 className="text-3xl font-bold py-3">{name}</h1>
        <PortableText value={content} />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  name,
  content
}`;

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
}

export default Page;
