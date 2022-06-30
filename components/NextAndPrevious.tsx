import React from "react";
import Link from "next/link";
//import mag from '../public/img/mag.png';

type Props = {
  current?: string;
  list?: string[];
  url?: string;
};

const NextAndPrevious: React.FC<Props> = ({ current, list }) => {
  const { previous, next } = itemNav(current, list);

  return (
    <div className="md:max-w-3xl">
      <div className="flex flex-row">
        <div className="text-left basis-1/2 px-5 py-2">
          <Link href={`/detail/${previous}`}>
            <a className="btn btn-blue">
              <span>&laquo;</span> Prev
            </a>
          </Link>
        </div>
        {/* <div className="text-center">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Examine image&nbsp;
            <Image src={mag} alt="Click to view full work" />
          </a>
        </div> */}
        <div className="text-right basis-1/2 px-5 py-2">
          <Link href={`/detail/${next}`}>
            <a className="btn btn-blue">
              Next <span>&raquo;</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

type npObject = {
  previous: string;
  next: string;
};

function itemNav(
  id: string | undefined,
  items: string[] | undefined
): npObject {
  let previous = "";
  let next = "";
  if (id && items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i] === id) {
        const p = i === 0 ? items.length - 1 : i - 1;
        previous = items[p];
        const n = i === items.length - 1 ? 0 : i + 1;
        next = items[n];
        break;
      }
    }
  }
  return {
    previous,
    next,
  };
}

export default NextAndPrevious;
