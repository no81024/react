"use client";

import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/* ===== INTERFACE ===== */
interface IconItem {
    ten: string;
    logo: string;
    link: string;
}

interface MediaItem {
    file: string;
    mo_ta: string;
    date_created: string;
}

interface NewsItem {
    noi_dung: string;
}

export default function HoTroPhapLy() {
    const [icons, setIcons] = useState<IconItem[]>([]);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [ten, setTen] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const API_URL = "http://10.10.20.77:8057";
    const API_TOKEN = "YOUR_API_TOKEN";

    /* ===== FETCH ICON ===== */
    const fetchIcons = async () => {
        try {
            const res = await fetch(
                `${API_URL}/items/logo_link?fields=ten,logo,link`
            );
            const data = await res.json();
            setIcons(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    /* ===== FETCH MEDIA ===== */
    const fetchMedia = async () => {
        try {
            const res = await fetch(
                `${API_URL}/items/thu_vien_media?fields=file,mo_ta,date_created&limit=2`
            );
            const data = await res.json();
            setMedia(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchIcons();
        fetchMedia();
    }, []);

    const getImageUrl = (fileId: string) =>
        `${API_URL}/assets/${fileId}`;

    /* ===== SUBMIT (GIỮ NGUYÊN) ===== */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ten || !file) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch(`${API_URL}/files`, {
                method: "POST",
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                body: formData,
            });

            const uploadData = await uploadRes.json();
            const fileId = uploadData.data.id;

            await fetch(`${API_URL}/items/ho_tro_phap_ly`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify({ ten, upload_file: fileId }),
            });

            fetchIcons();
            setTen("");
            setFile(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <Row className="g-4">
                {/* ===== LEFT COLUMN ===== */}
                <Col xs={12} md={6}>
                    <h5 className="text-primary mb-3">HỖ TRỢ PHÁP LÝ</h5>
                    <Row className="g-3">
                        {icons.map((item, index) => (
                            <Col key={index} xs={6} sm={4}>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                >
                                    <div className="support-box bg-primary text-white text-center p-3 h-100">
                                        <div
                                        >
                                            <img
                                                src={getImageUrl(item.logo)}
                                                alt={item.ten}
                                                style={{
                                                    maxHeight: 50,
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                        <h6 className="fw-semibold mb-0 small">
                                            {item.ten}
                                        </h6>
                                    </div>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </Col>

                {/* ===== RIGHT COLUMN ===== */}
                <Col xs={12} md={6}>
                    <h5 className="text-primary mb-3">
                        TIN TỨC & SỰ KIỆN
                    </h5>
                    <Row className="g-2">
                        {media.map((item, index) => (
                            <Col key={index} xs={12}>
                                <div className="border p-3 h-100 d-flex gap-3">
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            overflow: "hidden",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <img
                                            src={getImageUrl(item.file)}
                                            alt={item.mo_ta}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="fw-semibold mb-1 small">
                                            {item.mo_ta}
                                        </p>
                                        <small className="text-muted">
                                            {new Date(
                                                item.date_created
                                            ).toLocaleDateString("vi-VN")}
                                        </small>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
