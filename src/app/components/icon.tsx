"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";

/* ===== INTERFACE ===== */
interface IconItem {
    icon: string;
    title: string;
    desc: string;
}

interface Featured {
    image: string;
    title: string;
    desc: string;
}

interface EventItem {
    time: string;
    title: string;
}

interface EventData {
    featured: Featured;
    list: EventItem[];
}
interface coquanData {
    // Add your properties here
    image: string;
}

interface coquanItem {
    image: string;
}
/* ===== COMPONENT ===== */
export default function IconExample() {
    const [icons, setIcons] = useState<IconItem[]>([]);
    const [event, setEvent] = useState<EventData | null>(null);
    const [coquan, setCoquan] = useState<coquanItem[]>([]);

    /* fetch icon */
    useEffect(() => {
        fetch("/icon.json")
            .then((res) => res.json())
            .then((data: IconItem[]) => setIcons(data));
    }, []);

    /* fetch event */
    useEffect(() => {
        fetch("/event.json")
            .then((res) => res.json())
            .then((data: EventData) => setEvent(data));
    }, []);
    // Cơ quan
    useEffect(() => {
        fetch("/coquan.json")
            .then((res) => res.json())
            .then((data: coquanItem[]) => setCoquan(data));
    }, []);
    if (!event) return <p>Đang tải dữ liệu...</p>;

    return (
        <>
            <Row className="mt-4">
                {/* LEFT */}
                <Col md={5} sm={12}>
                    <h4 className="text-primary fw-semibold mb-3">
                        HỖ TRỢ PHÁP LÝ
                    </h4>

                    <div className="row g-3">
                        {icons.map((item) => (
                            <div className="col-4 " key={item.title}>
                                <div className="support-box bg-primary text-white text-center p-3 rounded h-100">
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        width={40}
                                        height={40}
                                        className="mb-2"
                                    />
                                    <h6 className="fw-semibold mb-1">{item.title}</h6>
                                    <p className="small mb-0">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>

                {/* RIGHT */}
                <Col md={7} sm={12}>
                    <h4 className="text-primary fw-semibold mb-2 mt-1">
                        TIN TỨC & SỰ KIỆN
                    </h4>
                    {/* featured */}
                    <div className="mb-3 row">
                        <img
                            src={event.featured.image}
                            alt={event.featured.title}
                            className="img-fluid rounded mb-2 col-6"
                        />
                        <div className="col-6">
                            <h6 className="fw-semibold mb-1">
                                {event.featured.title}
                            </h6>
                            <p className="small text-muted">
                                {event.featured.desc}
                            </p>

                        </div>

                    </div>

                    {/* list */}
                    <ul className="list-unstyled">
                        {event.list.map((item, index) => (
                            <li
                                key={index}
                                className="d-flex gap-3 border-bottom py-2 small"
                            >
                                <span className="text-primary fw-semibold">
                                    {item.time}:
                                </span>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
            <div className="line mt-4 mb-2" style={{ height: '2px', backgroundColor: '#1097e6' }}></div>
            <div className="row g-3">
                {coquan.map((item, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 ">
                        <img src={item.image} alt="coquan" className="coquan-img " />
                    </div>
                ))}

            </div>
            <div className="line mt-4 mb-2" style={{ height: '2px', backgroundColor: '#1097e6' }}></div>


        </>
    );
}
