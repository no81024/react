import Image from "next/image";
import styles from "./page.module.css";
import AppHeader from "@/app/components/appheader";
import AppFooter from "@/app/components/appfooter";
import FeaturedNews from "@/app/components/FeaturedNews";
import Test from "@/app/components/alert";
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
        <img src="/IMAGE/ảnh-01 1.png" alt="" />
      </div>
      <div className="container my-4">
        <Icons />

      </div>
    </div>


  );
}
