import parseDateString from "hooks/helper/parseDateString";
import { Link, useNavigate } from "react-router-dom";


type Props = {
  title:string
  username:string
  createdAt:string
  placeName:string
  lat:number
  lng:number
  id:string
};

export default function TimelineList({...props}:Props) {
  const navigate=useNavigate()
  function _navigateCerita(){

    // window.location.origin
    // window.open(`${window.location.origin}/peta?id=${props.id}&&lat=${props.lat}&&lng=${props.lng}`, '_blank', 'noopener,noreferrer');
    navigate(`/peta?id=${props.id}&&lat=${props.lat}&&lng=${props.lng}`)
  }
  
  return (
    <div
    onClick={_navigateCerita}
      className="group md:w-1/2 md:mx-auto transition-all peer hover:-translate-y-1 cursor-pointer rounded px-1 hover:bg-green-primary  flex w-full border-b-2 py-2 border-green-primary space-x-5 items-start text-sm bg-white"
    >
      <div className="font-nunito w-7 h-7 font-bold bg-blue-primary rounded-full flex justify-center items-center text-white">
        {props.username.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex gap-4">
          <Link to={`/user/${props.username}`} className="hover:underline">
            <p className="capitalize font-semibold">{props.username}</p>
          </Link>
          <p>
            <span className="text-xs">
             {parseDateString(props.createdAt)}
            </span>
          </p>
        </div>
        <p className="mt-2 ">
          Menulis{" "}
          <span className="font-bold group-hover:text-white text-green-primary uppercase">{props.title}</span> di{" "}
          <span className="font-bold">{props.placeName}</span>
        </p>
      </div>
    </div>
  );
}
