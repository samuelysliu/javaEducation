import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/navbar';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';


function Login() {
    const apiPath = 'http://localhost:8000'
    const [account, setAccount] = useState()
    const [password, setPassword] = useState()
    const [loginError, setLoginError] = useState(false)

    const login = () => {
        let data = { "username": account, "password": password }
        console.log(data)
        axios.post(apiPath+'/api/login', data)
            .then((res) => {
                console.log(res['data']['token'])
                localStorage.setItem('token', res['data']['token'])
                window.location.href = "/"
            })
            .catch((error) => setLoginError(true))
    }
    return (
        <>
            <Header />
            <Container>
                <Form onSubmit={login}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Account</Form.Label>
                        <Form.Control value={account} onChange={(e) => setAccount(e.target.value)} type="text" placeholder="請輸入您的學號" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="請輸入您的密碼" />
                    </Form.Group>
                    <Button variant="primary" onClick={login}>
                        登入
                    </Button>
                    <font style={{paddingLeft:'10px'}}>還沒有帳號？<a href='/register'>前往註冊</a></font>
                </Form>
                <br></br>
                {loginError 
                ? (<Alert variant="danger">
                    帳號或密碼錯誤
                </Alert>)
                :
                ""}
                
            </Container>

        </>
    );
}

export default Login;
