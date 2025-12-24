"use client";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

interface VbplItem {
    so_ky_hieu: string;
    ngay_ban_hanh: string;
    trich_yeu: string;
}

interface TbItem {
    noi_dung: string;
    ten: string;
}

export default function SelectSizesExample() {
    const [vbpl, setVbpl] = useState<VbplItem[]>([]);
    const [tb, setTb] = useState<TbItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vbplRes = await fetch(
                    "http://10.10.20.77:8057/items/van_ban_phap_luat?fields=so_ky_hieu,ngay_ban_hanh,trich_yeu"
                );
                const vbplJson = await vbplRes.json();
                setVbpl(vbplJson.data || []);

                const tbRes = await fetch(
                    "http://10.10.20.77:8057/items/thong_bao?filter[noi_dung][_nnull]=true&fields=ten"
                );
                const tbJson = await tbRes.json();
                setTb(tbJson.data || []);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Đang tải...</p>;

    return (
        <>
            <h5 className="text-primary">VĂN BẢN PHÁP LUẬT</h5>

            {/* ================== BỘ LỌC ================== */}
            <Row>
                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h6 className="form-lable">LOẠI VĂN BẢN</h6>
                    <Form.Select size="lg">
                        <option>Chọn loại văn bản</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h6 className="form-lable">PHÂN LOẠI</h6>
                    <Form.Select size="lg">
                        <option>Chọn phân loại</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h6 className="form-lable">CƠ QUAN BAN HÀNH</h6>
                    <Form.Select size="lg">
                        <option>Chọn cơ quan</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h6 className="form-lable">Năm từ</h6>
                    <Form.Select size="lg">
                        <option>Từ năm</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col mt-3">
                    <h6 className="form-lable"></h6>
                    <Form.Select size="lg">
                        <option>Đến năm</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col mt-3">
                    <h6 className="form-lable"></h6>
                    <Button className="btn-search">Tìm kiếm</Button>
                </Col>
            </Row>

            {/* ================== BẢNG + THÔNG BÁO ================== */}
            <Row className="equal-row mt-1">
                {/* ===== BẢNG VBPL ===== */}
                <Col md={8}>
                    <div className="table-wrapper h=100">
                        {/* HEADER CỐ ĐỊNH */}
                        <Table bordered className="mb-0 table-fixed">
                            <thead className="table-primary">
                                <tr>
                                    <th style={{ width: "20%" }}>Số/Ký hiệu</th>
                                    <th style={{ width: "20%" }}>Ngày phát hành</th>
                                    <th style={{ width: "60%" }}>Trích yếu</th>
                                </tr>
                            </thead>
                        </Table>

                        {/* BODY SCROLL */}
                        <div className="table-body-scroll">
                            <Table striped bordered hover className="table-fixed">
                                <tbody>
                                    {vbpl.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ width: "20%" }}>
                                                <strong>{item.so_ky_hieu}</strong>
                                            </td>
                                            <td style={{ width: "20%" }}>{item.ngay_ban_hanh}</td>
                                            <td style={{ width: "60%" }}>{item.trich_yeu}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
                {/* ===== THÔNG BÁO ===== */}
                <Col md={4} className="notify-fixed " >
                    <div className="p-1 border rounded bg-light">
                        <h5 className="fw-bold bg-primary text-white rounded">
                            🔔 THÔNG BÁO
                        </h5>

                        <div className="notify-list">
                            {/* CHẠY VÒNG */}
                            <div className="notify-inner">
                                {tb.map((item, index) => (
                                    <p key={`tb1-${index}`}>
                                        <img src="/IMAGE/Vector.png" alt="" />
                                        <span>{item.ten}</span>
                                    </p>
                                ))}
                            </div>

                            {/* LẶP LẠI ĐỂ CHẠY MƯỢT */}
                            <div className="notify-inner">
                                {tb.map((item, index) => (
                                    <p key={`tb2-${index}`}>
                                        <img src="/IMAGE/Vector.png" alt="" />
                                        <span>{item.ten}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}
