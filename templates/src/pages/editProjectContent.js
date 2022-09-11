import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function EditProjectContent({ apiPath, config }) {
    const navigate = useNavigate();
    const centerContainer = {
        textAlign: "center"
    }
    const [params, setParams] = useSearchParams();  //取得url 帶的值

    const [project, setProject] = useState([{
        "title": "", "class": "", "content": "", "step1": "",
        "step2": "", "step3": "", "totalStep": "3"
    }])

    useEffect(() => {
        axios.get(apiPath + '/api/project?projectId=' + params.get('projectId'), config).then((res) => {
            setProject(res["data"]["result"]);
            setProject(prevState => ({ ...prevState, projectId: params.get('projectId') }))
        }).catch((error) => console.log(error));
    }, [])

    const subProject = () => {
        axios.put(apiPath + '/api/project', project, config)
            .then((res) => {
                navigate("/editProject")
            })
            .catch((error) => console.log(error))
    }

    const deleteProject = () => {
        axios.delete(apiPath + '/api/project?projectId=' + params.get('projectId'), config)
            .then((res) => {
                navigate("/editProject")
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Header />
            <SideBar item='' />
            <Container style={centerContainer}>
                <Row>
                    <Col lg={12}><h1>新增題目</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>題目名稱：</Form.Label>
                                <Form.Control as="textarea" rows={1} value={project.title} onChange={(e) => setProject(prevState => ({ ...prevState, title: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>題目描述：</Form.Label>
                                <Form.Control as="textarea" rows={5} value={project.content} onChange={(e) => setProject(prevState => ({ ...prevState, content: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step1">
                                <Form.Label>題目分解步驟一：</Form.Label>
                                <Form.Control as="textarea" rows={3} value={project.step1} onChange={(e) => setProject(prevState => ({ ...prevState, step1: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step2">
                                <Form.Label>題目分解步驟二：</Form.Label>
                                <Form.Control as="textarea" rows={3} value={project.step2} onChange={(e) => setProject(prevState => ({ ...prevState, step2: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step3">
                                <Form.Label>題目分解步驟三：</Form.Label>
                                <Form.Control as="textarea" rows={3} value={project.step3} onChange={(e) => setProject(prevState => ({ ...prevState, step3: e.target.value }))} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step3">
                                <Form.Label>班級</Form.Label>
                                <Form.Select value={project.class} onChange={(e) => setProject(prevState => ({ ...prevState, class: e.target.value }))}>
                                    <option>資一A</option>
                                    <option>資一B</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col><Button variant="danger" style={{ width: '30%' }} onClick={deleteProject}>刪除</Button></Col>
                    <Col><Button variant="success" style={{ width: '30%' }} onClick={subProject}>送出</Button></Col>
                </Row>
            </Container>

        </>
    );
}

export default EditProjectContent;
