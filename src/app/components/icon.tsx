"use client";

import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/* ===== INTERFACE ===== */
interface IconItem {
    ten: string;
    upload_file: string; // Directus sẽ trả về đường dẫn file
}

interface NewsItem {
    noi_dung: string;
}

export default function HoTroPhapLy() {
    const [icons, setIcons] = useState<IconItem[]>([]);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [ten, setTen] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const API_URL = "http://10.10.20.77:8057";
    const API_TOKEN = "YOUR_API_TOKEN"; // Thay bằng token của bạn

    /* Fetch danh sách hỗ trợ pháp lý */
    const fetchIcons = async () => {
        try {
            const res = await fetch(
                `${API_URL}/items/ho_tro_phap_ly?fields=upload_file,ten&limit=3`
            );
            if (!res.ok) throw new Error(`Error fetching icons: ${res.statusText}`);
            const data = await res.json();
            setIcons(data.data);
        } catch (err: any) {
            console.error(err);
            alert("Có lỗi xảy ra khi lấy danh sách hỗ trợ pháp lý!");
        }
    };

    /* Fetch tin tức */
    const fetchNews = async () => {
        try {
            const res = await fetch(
                `${API_URL}/items/tin_tuc?fields=noi_dung&limit=2`
            );
            if (!res.ok) throw new Error(`Error fetching news: ${res.statusText}`);
            const data = await res.json();
            setNews(data.data);
        } catch (err: any) {
            console.error(err);
            alert("Có lỗi xảy ra khi lấy tin tức!");
        }
    };

    useEffect(() => {
        fetchIcons();
        fetchNews();
    }, []);

    /* Upload file + tạo item hỗ trợ pháp lý */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ten || !file) {
            alert("Vui lòng nhập tên và chọn file!");
            return;
        }
        setLoading(true);
        try {
            // Upload file
            const formData = new FormData();
            formData.append("file", file);
            const uploadRes = await fetch(`${API_URL}/files`, {
                method: "POST",
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                body: formData,
            });
            if (!uploadRes.ok) throw new Error("Upload file thất bại");
            const uploadData = await uploadRes.json();
            const fileId = uploadData.data.id;

            // Tạo item
            const createRes = await fetch(`${API_URL}/items/ho_tro_phap_ly`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify({ ten, upload_file: fileId }),
            });
            if (!createRes.ok) throw new Error("Tạo item thất bại");

            await fetchIcons();
            setTen("");
            setFile(null);
            alert("Thêm hỗ trợ pháp lý thành công!");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Có lỗi xảy ra khi thêm hỗ trợ pháp lý!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="row">
                {/* Cột trái: hỗ trợ pháp lý */}
                <div className="col-6">
                    <Row className="g-3">
                        {Array.from({ length: 3 }).flatMap(() =>
                            icons.map((item) => (
                                <Col key={item.ten + Math.random()} md={4} sm={6} xs={12}>
                                    <div className="support-box bg-primary text-white text-center p-3 rounded h-100">
                                        <img
                                            src={item.upload_file}
                                            alt={item.ten}
                                            className="img-fluid mb-2"
                                            style={{ maxHeight: 60 }}
                                        />
                                        <h6 className="fw-semibold mb-1">{item.ten}</h6>
                                    </div>
                                </Col>
                            ))
                        )}
                    </Row>
                </div>

                {/* Cột phải: tin tức */}
                <div className="col-6">
                    <Row className="g-3">
                        {news.map((item, index) => (
                            <Col key={index} md={12}>
                                <div className="news-box border p-3 rounded h-100">
                                    <p className="small mb-0">{item.noi_dung}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );
}
