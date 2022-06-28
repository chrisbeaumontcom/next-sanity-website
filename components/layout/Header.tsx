import Link from 'next/link';
import Image from 'next/image';
import headerPic from '../../public/img/layout/banner01zucchinis.jpg';
// import banner01 from '../../assets/img/layout/banner01zucchinis.jpg';
// import banner02 from '../../assets/img/layout/banner02lemons.jpg';
// import banner03 from '../../assets/img/layout/banner03artichokes.jpg';
// import banner04 from '../../assets/img/layout/banner04cherries.jpg';

export default function Header({ title, subtitle }) {
  // const isHome = title === 'Home';
  // let classList = 'col-lg-4 col-md-4 col-sm-6 col-xs-12 text-right carobox';
  // if (!isHome) {
  //   classList =
  //     'col-lg-4 col-md-4 col-sm-6 col-xs-12 text-right d-none d-lg-block';
  // }

  return (
    <div className="bg-black">
      <div className="container md:max-w-5xl mx-auto flex flex-row ">
        <div className="basis-3/4  p-3">
          <Link href="/">
            <a>
              <h1 className="text-white text-2xl font-medium">{title}</h1>
            </a>
          </Link>
          <h2 className="text-white text-xl">{subtitle}</h2>
        </div>

        <div className="basis-1/4">
          <Image src={headerPic} placeholder="blur" alt="Image" />
        </div>
      </div>
    </div>
  );
}
