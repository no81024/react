"use client";

import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


/* ===== INTERFACE ===== */
interface WebsiteLinkItem {
    logo: string; // file ID Directus
    link: string;
}

export default function LienKetWebsite() {
    const [items, setItems] = useState<WebsiteLinkItem[]>([]);

    const API_URL = "http://10.10.20.77:8057";

    /* Tạo URL ảnh từ Directus */
    const getImageUrl = (fileId: string) =>
        `${API_URL}/assets/${fileId}`;

    /* Fetch dữ liệu */
    const fetchLinks = async () => {
        try {
            const res = await fetch(
                `${API_URL}/items/lien_ket_website?fields=logo,link`
            );
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            setItems(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div className="lien-ket-website">
            <Row className="g-3 mt-2">
                {items.map((item, index) => (
                    <Col key={index} md={3} sm={4} xs={6}>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-block text-center  p-1 h-100"
                        >
                            <img
                                src={getImageUrl(item.logo)}
                                alt="Liên kết website"
                                className="img-fluid"
                                style={{ maxHeight: 60, objectFit: "contain" }}
                            />
                        </a>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
