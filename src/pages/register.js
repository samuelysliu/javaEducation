import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/navbar';
import { Form, Button, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';


function Register() {
    const [account, setAccount] = useState()
    const [password, setPassword] = useState()

    const register = () => {
        let data = new FormData()

        data.append("account", account)
        data.append("password", password)
        axios.post('http://127.0.0.1:8000/api/register', data)
            .then((res) => window.location.href="./login")
            .catch((error) => console.log(error))
    }
    return (
        <>
            <Header />
            <Container>
                <Form onSubmit={register}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Account</Form.Label>
                        <Form.Control value={account} onChange={(e) => setAccount(e.target.value)} type="text" placeholder="請輸入您的學號" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="請輸入您的密碼" />
                    </Form.Group>
                    <Button variant="primary" onClick={register}>
                        註冊
                    </Button>
                    <font style={{paddingLeft:'10px'}}>已經有帳號？<a href='/login'>前往登入</a></font>
                </Form>
            </Container>

        </>
    );
}

export default Register;
