import Image from "next/image";
import styles from "./page.module.css";
import AppHeader from "@/app/components/appheader";
import AppFooter from "@/app/components/appfooter";
import FeaturedNews from "@/app/components/FeaturedNews";
import Test from "@/app/components/alert";
import LienKetWebsite from "./components/lien_ket_website";
import Icons from "@/app/components/icon"
import Table from "@/app/components/vbpl";

export default function Home() {
  return (

    <div>
      <div className="container my-4">
        <FeaturedNews />
        <div className="line mt-4 mb-2" style={{ height: '2px', backgroundColor: '#1097e6' }}></div>
        <Table />
      </div>

      <div className="container my-4">

      </div>
      <div className="my-4">
        <img
          src="/IMAGE/ảnh-01 1.png"
          alt=""
          style={{
            width: "100%",      // ảnh co giãn theo chiều ngang
            height: "auto",     // giữ tỉ lệ
            display: "block",   // loại bỏ khoảng trắng dưới ảnh
            borderRadius: "6px",// bo góc nếu muốn
            maxWidth: "100%"    // đảm bảo không vượt container
          }}
        />
      </div>

      <div className="container my-4">
        <Icons />
        <div className="line mt-4 mb-2" style={{ height: '2px', backgroundColor: '#1097e6' }}></div>
        <LienKetWebsite />
        <div className="line mt-4 mb-2" style={{ height: '2px', backgroundColor: '#1097e6' }}></div>

      </div>
    </div>


  );
}
