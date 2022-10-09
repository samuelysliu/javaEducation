import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import { Form, Button, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


function Register({ apiPath }) {
    const navigate = useNavigate();

    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [studentClass, setStudentClass] = useState("資一A")

    const [systemMessage, setSystemMessage] = useState("")

    const [registerBt, setRegisterBt] = useState()

    const register = () => {
        if (account !== "" || password !== "") {
            let data = { "account": account, "password": password, "class": studentClass }
            axios.post(apiPath + '/api/register', data)
                .then((res) => {
                    if (res["data"]["result"] == "failed") {
                        setSystemMessage("帳號已經存在")

                        setTimeout(() => {
                            setSystemMessage("")
                        }, 3000)
                    } else {
                        navigate("/login")
                    }
                })
                .catch((error) => console.log(error))
        }
        else {
            setSystemMessage("帳號或密碼不可以為空")

            setTimeout(() => {
                setSystemMessage("")
            }, 3000)
        }
    }

    const handleKeypress = (e) => {
        if (e.key === "Enter") {
            registerBt.click();
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Account</Form.Label>
                        <Form.Control value={account} onChange={(e) => setAccount(e.target.value)} type="text" placeholder="請輸入您的學號" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="請輸入您的密碼" onKeyPress={handleKeypress} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Select onChange={(e) => setStudentClass(e.target.value)}>
                            <option value="資一A">資一A</option>
                            <option value="資一B">資一B</option>
                        </Form.Select>
                    </Form.Group>

                    <br></br>
                    <p style={{ color: "red", fontSize: "12px" }}>{systemMessage}</p>
                    <Button variant="primary" ref={node => (setRegisterBt(node))} onClick={register}>
                        註冊
                    </Button>
                    <font style={{ paddingLeft: '10px' }}>已經有帳號？<Link to='/login'>前往登入</Link></font>
                </Form>
            </Container>

        </>
    );
}

export default Register;
