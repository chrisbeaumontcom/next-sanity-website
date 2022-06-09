import Link from 'next/link';
import { useState } from 'react';

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

  const classname = 'nav-open';
  const [navState, setNavState] = useState('');
  const [burgerCheckboxState, setBurgerCheckboxState] = useState(false);

  function handleNav(e) {
    e.preventDefault();
    if (navState === '') {
      setBurgerCheckboxState(true);
      setNavState(classname);
    } else {
      setBurgerCheckboxState(false);
      setNavState('');
    }
  }
  function closeAllNav() {
    if (navState === classname) {
      setBurgerCheckboxState(false);
      setNavState('');
    }
  }

  return (
    <nav className="bg-slate-600 p-2">
      <div className="m-auto  md:max-w-5xl flex flex-row justify-between">
        <div onClick={closeAllNav}>
          <Link href="/">
            <a className="text-white">Home</a>
          </Link>
        </div>
        <div className={`md:flex md:flex-row topnav ${navState}`}>
          {links.map((link, i) => (
            <div key={i} className="px-3" onClick={closeAllNav}>
              <Link href={link.url}>
                <a className="text-white">{link.title}</a>
              </Link>
            </div>
          ))}
          <div className="hamburger-box">
            <input
              type="checkbox"
              className="burger-checkbox visually-hidden"
              defaultChecked={burgerCheckboxState}
            />
            <label onClick={handleNav}>
              <div className="hamburger">
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
                <span className="bar bar4"></span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hamburger-box {
          display: none;
        }

        @media screen and (max-width: 768px) {
          .topnav {
            position: relative;
          }
          .topnav a {
            display: none;
          }
          .topnav .hamburger-box {
            display: block;
            position: absolute;
            right: 8px;
            top: 0;
          }
          .topnav.nav-open a {
            display: block;
            text-align: left;
          }
        }

        .visually-hidden {
          position: absolute;
          overflow: hidden;
          clip: rect(0 0 0 0);
          height: 1px;
          width: 1px;
          margin: -1px;
          padding: 0;
          border: 0;
        }
        .hamburger {
          margin: 0 auto;
          margin-top: 2px;
          width: 20px;
          height: 20px;
          position: relative;
        }
        .hamburger .bar {
          padding: 0;
          width: 20px;
          height: 3px;
          background-color: #dadada;
          display: block;
          border-radius: 3px;
          transition: all 0.4s ease-in-out;
          position: absolute;
        }
        .bar1 {
          top: 0;
        }
        .bar2,
        .bar3 {
          top: 8px;
        }
        .bar3 {
          right: 0;
        }
        .bar4 {
          bottom: 0;
        }
        .hamburger .bar1 {
          transform-origin: 5%;
        }
        .hamburger .bar4 {
          transform-origin: 5%;
        }
        .topnav.nav-open .burger-checkbox:checked + label > .hamburger > .bar1 {
          transform: rotate(45deg);
          height: 3px;
          width: 27px;
        }
        .topnav.nav-open .burger-checkbox:checked + label > .hamburger > .bar3 {
          transform: rotate(45deg);
          height: 3px;
          background-color: transparent;
        }
        .topnav.nav-open .burger-checkbox:checked + label > .hamburger > .bar2 {
          transform: rotate(-45deg);
          height: 3px;
          background-color: transparent;
        }
        .topnav.nav-open .burger-checkbox:checked + label > .hamburger > .bar4 {
          transform: rotate(-45deg);
          height: 3px;
          width: 27px;
        }
      `}</style>
    </nav>
  );
}
