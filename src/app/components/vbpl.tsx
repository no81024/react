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
}

export default function SelectSizesExample() {
    const [vbpl, setVbpl] = useState<VbplItem[] | null>(null);
    const [tb, setTb] = useState<TbItem[] | null>(null);

    // Fetch vbpl
    useEffect(() => {
        fetch("/vbpl.json")
            .then((res) => res.json())
            .then((data) => setVbpl(data));
    }, []);

    // Fetch thông báo
    useEffect(() => {
        fetch("/thongbao.json")
            .then((res) => res.json())
            .then((data) => setTb(data));
    }, []);

    // Loading chung
    if (!vbpl || !tb) return <p>Đang tải...</p>;

    return (
        <>
            <h4 className="text-primary">VĂN BẢN PHÁP LUẬT</h4>

            {/* Bộ lọc */}
            <Row>
                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h5 className="form-lable">LOẠI VĂN BẢN</h5>
                    <Form.Select size="lg">
                        <option>Chọn loại văn bản</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h5 className="form-lable">PHÂN LOẠI</h5>
                    <Form.Select size="lg">
                        <option>Chọn phân loại</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h5 className="form-lable">CƠ QUAN BAN HÀNH</h5>
                    <Form.Select size="lg">
                        <option>Chọn cơ quan</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col">
                    <h5 className="form-lable">Năm từ</h5>
                    <Form.Select size="lg">
                        <option>Từ năm</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col mt-4">
                    <Form.Select size="lg">
                        <option>Đến năm</option>
                    </Form.Select>
                </Col>

                <Col md={2} sm={6} xs={12} className="filter-col mt-4">
                    <Button className="btn-search" variant="primary">
                        Tìm kiếm
                    </Button>
                </Col>
            </Row>

            {/* Bảng + Thông báo */}
            <Row className="equal-row mt-4">
                {/* Bảng chiếm 75% */}
                <Col md={8}>
                    <Table striped bordered hover responsive>
                        <thead className="table-primary">
                            <tr>
                                <th>Số/Ký hiệu</th>
                                <th>Ngày phát hành</th>
                                <th>Trích yếu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vbpl.map((item, index) => (
                                <tr key={index}>
                                    <td ><strong>{item.so_ky_hieu}</strong></td>
                                    <td><strong>{item.ngay_ban_hanh}</strong></td>
                                    <td>{item.trich_yeu}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                {/* THÔNG BÁO chiếm 25% */}
                <Col md={4} className="notify-fixed">
                    <div className="p-1 border rounded bg-light">
                        <h5 className="fw-bold bg-primary text-white p-0 rounded">
                            🔔 THÔNG BÁO
                        </h5>
                        <div className="notify-list">
                            <div className="notify-inner">
                                {tb.map((item, index) => (
                                    <p key={index} className=" mb-4">
                                        <img src="/IMAGE/Vector.png" alt="" />
                                        <span >{item.noi_dung}</span>
                                    </p>
                                ))}
                            </div>
                            <div className="notify-inner">
                                {tb.map((item, index) => (
                                    <p key={index} className=" mb-4">
                                        <img src="/IMAGE/Vector.png" alt="" />
                                        <span >{item.noi_dung}</span>
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
