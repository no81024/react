"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

interface MenuItem {
    ten: string;
}

function AppHeader() {

    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        fetch("http://10.10.20.77:8057/items/main_menus?filter[menu_cha_id][_null]=true&fields=ten")
            .then(res => res.json())
            .then(data => setMenu(data.data));
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
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q..." />
                                </svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </div>


                        {/* LOGIN ICON */}
                        <div className="login-wrapper text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
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

                            <p className="login-text text-primary mb-0 mt-1 ">
                                Đăng nhập
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <Navbar expand="md" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="/IMAGE/image2.png" width="40" height="40" alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-4 ">
                            {menu.map((item, index) => (
                                <Nav.Link key={index} href="#">
                                    {item.ten}
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
