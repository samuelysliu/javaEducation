import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';

function Profile(props) {
    const [password, setPassword] = useState()

    const changePassword = () => {
        let data = new FormData()
        data.append("username", props.username)
        data.append("password", password)

        axios.put('http://127.0.0.1:8000/api/userProfile', data, props.config)
            .then((res) => {
                window.location.href="/"
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Header />
            <SideBar item='profile' />
            <Container>
                <Row>
                <Col lg={12} xs={12}><h1>個人檔案</h1></Col>
                </Row>
                <Row>
                    <Col lg={12} xs={12}>
                        <Form>
                            <Form.Group className="mb-3" controlId="account">
                                <Form.Label>Account:</Form.Label>
                                <Form.Control type="text" placeholder={props.username} disabled/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={changePassword}>
                                修改密碼
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>

        </>
    );
}

export default Profile;
