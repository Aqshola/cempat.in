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
    navigate(`/peta?id=${props.id}&&lat=${props.lat}&&lng=${props.lng}`)
  }
  
  return (
    <div
    onClick={_navigateCerita}
      className="hover:border-blue-primary flex w-full border-b-2 py-2 border-green-primary gap-5 items-start text-sm bg-white"
    >
      <div className="font-nunito w-7 h-7 font-bold bg-blue-primary rounded-full flex justify-center items-center text-white">
        {props.username.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col">
        <div className="w-full flex gap-4">
          <Link to={`/user/${props.username}`} className="hover:underline">
            <p className="font-semibold">{props.username}</p>
          </Link>
          <p>
            {" "}
            <span className="font-bold text-gray-400">.</span> {parseDateString(props.createdAt)}
          </p>
        </div>
        <p className="mt-2 ">
          Menulis{" "}
          <span className="font-bold text-green-primary uppercase">{props.title}</span> di{" "}
          <span className="font-bold">{props.placeName}</span>
        </p>
      </div>
    </div>
  );
}
