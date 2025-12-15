"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";

const Home = () => {
    const router = useRouter();

    const handleBtn = () => {
        router.push('/admin');
        alert("mấy con gà");
    }

    return (
        <div className="container mt-4">
            <h1>Home Page</h1>

            <div className="mt-3">
                <button onClick={handleBtn} className="btn btn-warning me-3">
                    Back home
                </button>

                <Button variant="primary">

                </Button>
            </div>
        </div>
    );
}

export default Home;
