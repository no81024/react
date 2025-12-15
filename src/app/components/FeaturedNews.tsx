"use client";
import { useEffect, useState } from "react";
function FeaturedNews() {
    const [newsData, setNewsData] = useState<any>(null);
    useEffect(() => {
        fetch("/new.json")
            .then(res => res.json())
            .then(data => {
                setNewsData(data);
            });

    }, []);
    if (!newsData) return <p>Đang tải.....</p>;
    return (
        <div className="news-section ">
            <div className="news-left">
                <img
                    src={newsData.featuredImage}
                    alt="f"
                    className="news-image" />

            </div>
            <div className="news-right">
                <h4 className="news-title">TIN NỔI BẬT</h4>
                {newsData.news.map((item: any) => (
                    <div className="item-title mb-2 pb-3 border-bottom" key={item.id}>
                        <h5 className="item-title">{item.title}</h5>
                        <p className="item-desc">{item.description}</p>
                        <div className="d-flex justify-content-between small text-muted">
                            <span>1 giờ trước<img src="/IMAGE/oclock.png" alt="" height={16} width={16} /></span>
                            <span>xem thêm</span>
                        </div>


                    </div>
                ))}

            </div>

        </div>

    );
}
export default FeaturedNews;