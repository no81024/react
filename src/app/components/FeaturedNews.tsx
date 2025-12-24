"use client";

import { useEffect, useState } from "react";

/* ================== TYPES ================== */
interface FeaturedItem {
    ten: string;
    tom_tat: string;
    date_created: string;
}

/* ================== COMPONENT ================== */
function FeaturedNews() {
    const [image, setImage] = useState<string | null>(null);
    const [featuredNews, setFeaturedNews] = useState<FeaturedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const timeAgo = (dateStr: string) => {
        const now = new Date();
        const past = new Date(dateStr);

        const diffMs = now.getTime() - past.getTime();

        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = month * 12;

        if (diffMs < minute) {
            return "Vừa xong";
        }

        if (diffMs < hour) {
            return `${Math.floor(diffMs / minute)} phút trước`;
        }

        if (diffMs < day) {
            return `${Math.floor(diffMs / hour)} giờ trước`;
        }

        if (diffMs < month) {
            return `${Math.floor(diffMs / day)} ngày trước`;
        }

        if (diffMs < year) {
            return `${Math.floor(diffMs / month)} tháng trước`;
        }

        return `${Math.floor(diffMs / year)} năm trước`;
    };


    /* ================== FORMAT DATE ================== */
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN");
    };

    /* ================== FETCH DATA ================== */
    useEffect(() => {
        const fetchData = async () => {
            try {
                /* ========= 1️⃣ LẤY ẢNH NỔI BẬT ========= */
                const imageRes = await fetch(
                    "http://10.10.20.77:8057/items/tin_tuc?fields=anh_dai_dien.*&limit=1&sort=date_created"
                );
                if (!imageRes.ok) throw new Error("Lỗi tải ảnh");

                const imageJson = await imageRes.json();
                const imageItem = imageJson?.data?.[0];

                if (imageItem?.anh_dai_dien?.id) {
                    setImage(
                        `http://10.10.20.77:8057/assets/${imageItem.anh_dai_dien.id}`
                    );
                } else {
                    setImage("/IMAGE/placeholder.jpg");
                }

                /* ========= 2️⃣ LẤY TIN NỔI BẬT ========= */
                const newsRes = await fetch(
                    "http://10.10.20.77:8057/items/tin_tuc?fields=ten,tom_tat,date_created&limit=2&sort=date_created"
                );
                if (!newsRes.ok) throw new Error("Lỗi tải tin nổi bật");

                const newsJson = await newsRes.json();
                setFeaturedNews(newsJson?.data || []);
            } catch (err) {
                console.error(err);
                setError("Không tải được tin nổi bật");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /* ================== STATES ================== */
    if (loading) return <p>Đang tải.....</p>;
    if (error) return <p className="text-danger">{error}</p>;

    /* ================== RENDER ================== */
    return (
        <div className="news-section">
            {/* ====== ẢNH NỔI BẬT ====== */}
            <div className="news-left">
                <img
                    src={image ?? "/IMAGE/placeholder.jpg"}
                    alt="Tin nổi bật"
                    className="news-image"
                    onError={(e) =>
                        (e.currentTarget.src = "/IMAGE/placeholder.jpg")
                    }
                />
            </div>

            {/* ====== DANH SÁCH TIN ====== */}
            <div className="news-right">
                <h5 className="news-title">TIN NỔI BẬT</h5>

                {featuredNews.map((item, index) => (
                    <div
                        key={index}
                        className="mb-3 pb-3 border-bottom"
                    >
                        {/* TIÊU ĐỀ */}
                        <h6 className="fw-bold text-primary  mb-1">
                            {item.ten}
                        </h6>

                        {/* TÓM TẮT */}
                        <p className="item-desc mb-2">
                            {item.tom_tat}
                        </p>

                        {/* NGÀY + XEM THÊM */}
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted small fst-italic">
                                {timeAgo(item.date_created)}
                                <img
                                    src="/IMAGE/oclock.png"
                                    alt="time"
                                    width={14}
                                    height={14}
                                    className="ms-1"
                                />
                            </span>

                            <span className="small fst-italic cursor-pointer">
                                xem thêm
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedNews;
