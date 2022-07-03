import { ContactForm } from "../components/ContactForm";
import Image from "next/image";
import Head from "next/head";
import pic from "../public/img/serge_photo_300x305.jpg";

export default function Contact() {
  return (
    <div className="container p-3">
      <Head>
        <title>Contact - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Contact the artist with this page." />
      </Head>
      <main>
        <div className="mb-5 mx-auto">
          <h2 className="text-2xl font-normal py-2">Contact</h2>
        </div>
        <div className="md:flex md:flex-row">
          <div className="basis-1/2">
            <ContactForm />
          </div>
          <div className="text-center basis-1/2">
            <Image src={pic} alt="Serge poppies" />
          </div>
        </div>
      </main>
    </div>
  );
}
