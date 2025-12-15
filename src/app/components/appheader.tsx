"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

interface MenuItem {
    id: string | number;
    label: string;
    link: string;
}

function AppHeader() {

    const [menu, setMenu] = useState<MenuItem[]>([]);

    // Load JSON từ public/nav.json
    useEffect(() => {
        fetch("/navbar.json")
            .then(res => res.json())
            .then(data => setMenu(data));
    }, []);

    return (
        <>
            {/* TOP HEADER */}
            <div className="container py-3 header-top">
                <div className="row align-items-center">

                    {/* Logo + Title */}
                    <div className="col-md-7 d-flex align-items-center">
                        <Image
                            src="/image 24.png"
                            alt="Logo"
                            width={80}
                            height={100}
                            className="footer-logo"
                        />
                        <h1 className="header-title ms-3 text-primary">
                            HỖ TRỢ PHÁP LÝ CHO DOANH NGHIỆP
                        </h1>
                    </div>

                    {/* Search + Login */}
                    <div className="col-md-5 d-flex justify-content-end align-items-center gap-4">

                        {/* SEARCH BOX */}
                        <div className="search-box-wrapper">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="search-input"
                            />
                            <button className="search-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q..." />
                                </svg>
                            </button>
                        </div>


                        {/* LOGIN ICON */}
                        <div className="login-wrapper text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                fill="currentColor"
                                className="bi bi-person-circle text-primary"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path
                                    fillRule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                                />
                            </svg>
                            <p className="login-text text-primary">Đăng nhập</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="/IMAGE/image2.png"
                            width="32"
                            height="32"
                            alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ms-auto">

                            {menu.map(item => (
                                <Nav.Link key={item.id} href={item.link}>
                                    {item.label}
                                </Nav.Link>
                            ))}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default AppHeader;
