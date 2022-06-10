import Link from 'next/link';
//import Image from 'next/image';
//import mag from '../public/img/mag.png';

const NextAndPrevious = ({ current, list, url }) => {
  const obj = itemNav(current, list);

  return (
    <div className="md:max-w-3xl">
      <div className="flex flex-row">
        <div className="text-left basis-1/2 px-5 py-2">
          <Link href={`/detail/${obj.previous}`}>
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
          <Link href={`/detail/${obj.next}`}>
            <a className="btn btn-blue">
              Next <span>&raquo;</span>
            </a>
          </Link>
        </div>
      </div>
      {/* <style jsx>{`
        .btn {
          @apply font-bold py-2 px-4 rounded;
        }
        .btn-blue {
          @apply bg-blue-500 text-white;
        }
        .btn-blue:hover {
          @apply bg-blue-700;
        }
      `}</style> */}
    </div>
  );
};

function itemNav(id, items) {
  const obj = {};
  for (var i = 0; i < items.length; i++) {
    if (items[i] === id) {
      const p = i === 0 ? items.length - 1 : i - 1;
      obj.previous = items[p];
      const n = i === items.length - 1 ? 0 : i + 1;
      obj.next = items[n];
      break;
    }
  }
  return obj;
}

export default NextAndPrevious;
