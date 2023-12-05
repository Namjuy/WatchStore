import { Link } from "react-router-dom";

export const DetailButton = ({item, itemId}:{item:string, itemId:string}) => {
  return (
    <>
      {" "}
      <Link to={`/${item}/${itemId}`}>
        {" "}
        <button className="bg-red-500 text-white border-0.5px border-white rounded px-3 py-1 my-auto hover:ml-[1px]">
          Chi tiết
        </button>
      </Link>
    </>
  );
};
