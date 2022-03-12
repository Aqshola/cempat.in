import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate} from "react-router-dom";
import { sideNavStore } from "store/navStore";


function DetailCerita() {
  const { showSideNav, sideNav } = sideNavStore((state) => state);
  const navigate=useNavigate()
  
  return (
    <div className="px-5 w-full">
      <div
        className={
          "py-10 transition-all " +
          (sideNav ? "opacity-0 invisible" : " opacity-100 visible")
        }
      >
        <button onClick={() => showSideNav(true)} disabled={sideNav}>
          <GiHamburgerMenu className="w-7 h-7 " />
        </button>
      </div>
      <button className="text-sm font-light" onClick={()=>navigate(-1)}>Back</button>
      <div className="w-full h-1 flex border-t mt-3"></div>

      <div id="list-cerita" className="mt-3">
        <h1 className="text-2xl mb-5 font-semibold">Lalatina</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
          cupiditate ducimus quos expedita repellat delectus vitae voluptas et
          atque modi recusandae reiciendis distinctio qui laudantium culpa
          repellendus cumque ipsum ut obcaecati quidem, cum magni dignissimos,
          facere aperiam. Quasi, dolore inventore! Labore error maxime
          consequuntur molestiae dolores deleniti vitae ut beatae amet explicabo
          at harum natus, cum voluptatibus consectetur optio aliquam unde
          accusamus quae dignissimos. Tempore dolorem officiis a nam voluptate
          quod maxime. Labore debitis aliquam accusantium recusandae saepe nihil
          voluptate mollitia. Doloremque cumque vero repudiandae temporibus,
          eaque, aspernatur praesentium, provident nisi nulla sequi obcaecati
          cupiditate neque minima repellat. Sint fugiat asperiores perferendis
          ea voluptatem rerum tempore aliquam, reprehenderit tenetur accusamus
          laboriosam autem mollitia blanditiis provident aperiam unde reiciendis
          voluptates quis ad tempora nulla eveniet fugit repudiandae pariatur!
          Tempora odio, pariatur laboriosam quia magnam ab excepturi quae dicta
          quod enim dolor velit eveniet omnis, maiores illum architecto
          doloremque nihil blanditiis. Ab libero laborum, quis temporibus,
          officia, dolorem fugit vel eaque illum sit earum! Neque officia
          delectus dolores dolorum ullam deleniti iste nihil labore tempora
          voluptatibus aspernatur, nam architecto consectetur veritatis harum
          deserunt nisi quasi? In, obcaecati tempore ipsam vitae itaque, at
          facere nesciunt consequatur esse, ea laborum eius quasi eligendi!
          Expedita iure, esse asperiores quas quibusdam molestias cum possimus
          et ipsam placeat culpa consectetur officia ratione quis ab illo!
          Libero saepe deserunt error quidem sed mollitia enim aspernatur ipsum
          perspiciatis ad vel odit provident nulla iusto similique distinctio,
          in corporis dolorem reiciendis voluptates quisquam assumenda molestias
          alias nesciunt? Ullam sequi tempora sed ipsum, tempore optio suscipit
          corporis quod commodi veniam labore eaque, unde neque illo possimus
          ipsam debitis perspiciatis? Nemo, natus at. Tempora quisquam ab,
          distinctio quam temporibus omnis consectetur eaque labore dignissimos
          nam libero rem molestiae a magnam voluptate sapiente atque vel
          accusantium ad amet. Aspernatur exercitationem placeat eligendi natus?
        </p>
      </div>
    </div>
  );
}

export default DetailCerita;
