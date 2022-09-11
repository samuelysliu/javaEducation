import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function Profile({apiPath, config}) {
    const userName = useSelector((state) => state.userProfile.value["account"])
    const userId = useSelector((state) => state.userProfile.value["userId"])
    const navigate = useNavigate();

    const [password, setPassword] = useState()

    const changePassword = () => {
        let data = {
            type: "password",
            userId: userId,
            password: password
        }

        axios.put(apiPath + '/api/user', data, config)
            .then((res) => {
                navigate("/")
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Header hasLogin={true} />
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
                                <Form.Control type="text" placeholder={userName} disabled/>
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
