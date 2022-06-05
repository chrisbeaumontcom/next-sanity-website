import client from '../client';
import SanityImage from '../components/SanityImage';
import Link from 'next/link';
import groq from 'groq';
import { PortableText } from '@portabletext/react';

const ptComponents = {
  marks: {
    e1a7e5c9a330: ({ children, value }) => {
      if (typeof value === 'undefined') {
        return;
      }
    },
    internalLink: ({ children, value }) => {
      if (typeof value.href === 'undefined') {
        return;
      }
      return (
        <Link rel="internal" href={value.href}>
          {children[0]}
        </Link>
      );
    },
    link: ({ children, value }) => {
      if (typeof value.href === 'undefined') {
        return;
      }
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

export default function Home({ homeitems }) {
  return (
    <div className="container p-3">
      <main>
        <div className="mb-5 mx-auto">
          <h1 className="text-2xl font-normal py-2">Welcome...</h1>
          <p>
            Thanks for visiting this site. Below is a list of highlights from
            recent years.
          </p>
        </div>
        {homeitems.map((item, i) => (
          <div
            className="max-w-md mx-auto my-5 rounded-md  shadow-md md:max-w-4xl text-sm border border-slate-200"
            key={i}
          >
            <div className="md:flex md:flex-row">
              <div className="p-2 basis-1/4">
                <SanityImage sanityimg={item.image} size={250} />
              </div>
              <div className="px-4 py-2 basis-3/4">
                <h2 className="text-2xl font-bold pb-2">{item.title}</h2>
                <PortableText value={item.content} components={ptComponents} />
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
const query = groq`*[_type == "homeitem" && show == true] | order(order asc)`;
export async function getStaticProps() {
  const homeitems = await client.fetch(query);
  return {
    props: {
      homeitems,
    },
  };
}
