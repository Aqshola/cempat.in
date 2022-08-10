import parseDateString from "hooks/helper/parseDateString";


type Props = {
  title:string
  username:string
  createdAt:string
  placeName:string
};

export default function TimelineList({...props}:Props) {
  
  return (
    <div
      className="flex w-full border-b-2 py-2 border-green-primary gap-5 items-start text-sm bg-white"
    >
      <div className="font-nunito w-7 h-7 font-bold bg-blue-primary rounded-full flex justify-center items-center text-white">
        {props.username.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col">
        <div className="w-full flex gap-4">
          <p className="font-semibold">{props.username}</p>
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
