import Link from 'next/link';
//

export default function NavBar() {
  const links = [
    { title: 'Selected Paintings', url: '/gallery/selected-paintings' },
    {
      title: 'Still Life with Variations',
      url: '/gallery/still-life-with-variations',
    },
    { title: 'Print Shop', url: 'https://prints.chrisbeaumont.com/' },
    { title: 'Curriculum Vitae', url: '/info/cv' },
    { title: 'Contact', url: '/contact' },
  ];
  const textpages = [];

  return (
    <div className="bg-slate-600 p-2">
      <div className="m-auto  md:max-w-5xl flex flex-row justify-between">
        <div>
          <Link href="/">
            <span className="text-white hover:cursor-pointer">Home</span>
          </Link>
        </div>
        <div className="md:flex md:flex-row">
          {links.map((link, i) => (
            <div key={i} className="px-3">
              <Link href={link.url}>
                <span className="text-white hover:cursor-pointer">
                  {link.title}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
