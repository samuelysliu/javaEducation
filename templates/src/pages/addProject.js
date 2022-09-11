import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function AddProject({ apiPath, config }) {
    const navigate = useNavigate();

    const centerContainer = {
        textAlign: "center"
    }

    const [project, setProject] = useState({ title: '', content: '', step1: '', step2: '', step3: '', class: '資一A' })

    const subProject = () => {
        axios.post(apiPath + '/api/project', project, config)
            .then((res) => {
                navigate("/")
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Header />
            <SideBar item='addProject' />
            <Container style={centerContainer}>
                <Row>
                    <Col lg={12}><h1>新增題目</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>題目名稱：</Form.Label>
                                <Form.Control as="textarea" rows={1} onChange={(e) => setProject(prevState => ({ ...prevState, title: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>題目描述：</Form.Label>
                                <Form.Control as="textarea" rows={5} onChange={(e) => setProject(prevState => ({ ...prevState, content: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step1">
                                <Form.Label>題目分解步驟一：</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => setProject(prevState => ({ ...prevState, step1: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step2">
                                <Form.Label>題目分解步驟二：</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => setProject(prevState => ({ ...prevState, step2: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step3">
                                <Form.Label>題目分解步驟三：</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => setProject(prevState => ({ ...prevState, step3: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step3">
                                <Form.Label>班級</Form.Label>
                                <Form.Select onChange={(e) => setProject(prevState => ({ ...prevState, class: e.target.value }))}>
                                    <option>資一A</option>
                                    <option>資一B</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="success" style={{ width: '30%' }} onClick={subProject}>送出</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default AddProject;
