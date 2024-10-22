import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secPassword, setSecPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [emailCheckMessage, setEmailCheckMessage] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleSubmit = async (evnet) => {
        evnet.preventDefault();
        try {
            if (password !== secPassword) {
                throw new Error(
                    "패스워드가 일치하지 않습니다 다시 입력해주세요"
                );
            }
            const response = await api.post("/user", { name, email, password });
            if (response.status == 200) {
                navigate("/login");
            } else {
                throw new Error(response.data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // const emailCheck = async () => {
    //     try {
    //         const response = await api.post("/user/checkEmail", { email });
    //     } catch (error) {}
    // };

    return (
        <div className="display-center">
            {/* error가 있다면 error 보여줌 */}
            {error && <div className="red-error">{error}</div>}
            <Form className="login-box" onSubmit={handleSubmit}>
                <h1>회원가입</h1>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="Name"
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>re-enter the password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="re-enter the password"
                        required
                        onChange={(event) => setSecPassword(event.target.value)}
                    />
                </Form.Group>

                <Button className="button-primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;
