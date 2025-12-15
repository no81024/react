"use client";

import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppFooter() {
    return (
        <footer className="footer-section text-white pt-4 pb-3">
            <div className="container text-start">
                <h4 className="fw-bold  mb-2">HỖ TRỢ PHÁP LÝ CHO DOANH NGHIỆP</h4>
                <div className="row align-items-start g-0">
                    {/* Logo */}
                    <div className="col-auto mt-1">
                        <Image
                            src="/image 24.png" // đổi thành logo thực tế
                            alt="Logo"
                            width={100}
                            height={100}
                            className="footer-logo"
                        />

                    </div>

                    {/* Content */}
                    <div className="col ms-4">
                        <p className="mb-1">
                            Trưởng Ban biên tập: Đặng chí Lợi Về Quốc - Cục trưởng Cục Phổ biến,
                            giáo dục pháp luật
                        </p>
                        <p className="mb-1">Giấy phép số: 256/GP-BC ngày 25/03/2005.</p>
                        <p className="mb-1">Địa chỉ: Số 60 Trần Phú, Ba Đình, Hà Nội.</p>
                        <p className="mb-1">Điện thoại: 024.62739543</p>
                    </div>
                </div>

                <hr className="mt-3 mb-2 footer-line" />

                {/* Copyright */}
                <div className="text-center small">
                    © {new Date().getFullYear()} Hỗ trợ pháp lý cho doanh nghiệp. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
}
