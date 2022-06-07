import Link from 'next/link';
import Image from 'next/image';
import footerPic from '../../public/img/layout/banner02lemons.jpg';
import socialPic from '../../public/img/soc-insta-30.png';

const Footer = () => {
  return (
    <div className="bg-slate-700 text-white">
      <div className="container mx-auto  md:max-w-5xl  md:flex md:flex-row text-sm">
        <div className="p-3 basis-1/4 hidden  lg:block">
          <Link href={'/'}>
            <a>
              <Image src={footerPic} alt="Still life with Lemons" />
            </a>
          </Link>
        </div>
        <div className="p-3 basis-1/4">
          <h2>Christopher Beaumont</h2>
          <p>
            &copy;{new Date().getFullYear()} Christopher Beaumont
            <br />
            All rights reserved
            <br />
            Painted in Melbourne
            <br />
            Australia
          </p>
        </div>
        <div className="p-3 basis-1/4" />
        <div className="p-3 basis-1/4">
          <h2>Questions?</h2>
          <ul>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/info/privacy-policy">Privacy</Link>
            </li>
            <li>
              Version: 3.0 June 2022
              <br />
              Next JS / Sanity CMS / Vercel / GitHub <br />
            </li>
            <li>
              <a href="http://instagram.com/chrisbeaumontcom">
                <Image src={socialPic} alt="Instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
