import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../index.css'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { editUser } from '../model/userProfile'


function Login({ apiPath }) {
    const navigate = useNavigate();

    const [account, setAccount] = useState()
    const [password, setPassword] = useState()
    const [loginError, setLoginError] = useState(false)

    const [loginBt, setLoginBt] = useState()

    const dispatch = useDispatch()

    const login = () => {
        let data = { "account": account, "password": password }
        axios.post(apiPath + '/api/user', data)
            .then((res) => {
                let userProfile = res["data"]["result"]
                userProfile["token"] = res["data"]["token"]
                dispatch(editUser(userProfile))
                localStorage.setItem('token', res['data']['token'])
                navigate("/")
            })
            .catch((error) => setLoginError(true))
    }

    const handleKeypress = (e) => {
        if (e.key === "Enter") {
            loginBt.click();
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
                    <Button variant="primary" ref={node => (setLoginBt(node))} onClick={login}>
                        登入
                    </Button>
                    <font style={{ paddingLeft: '10px' }}>還沒有帳號？<a href='/register'>前往註冊</a></font>
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
