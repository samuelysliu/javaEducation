import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/navbar';
import SideBar from './components/sidebar';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


function EditProjectContent(props) {
    const apiPath = 'http://127.0.0.1:8000/';

    const centerContainer = {
        textAlign: "center"
    }
    const [params, setParams] = useSearchParams();  //取得url 帶的值

    const [project, setProject] = useState([{ title: '', content: '', step1: '', step2: '', step3: '' }])

    const handleSetProject = (item, value) => {
        let copyProject = { ...project }
        copyProject[item] = value
        setProject(project => ({ ...copyProject }));
    }

    useEffect(() => {
        axios.get(apiPath + 'api/addProject?projectId=' + params.get('projectId'), props.config).then((res) => {
            setProject(res['data']);
        }).catch((error) => console.log(error));
    }, [])

    const subProject = () => {
        let data = new FormData()
        data.append("projectId", params.get('projectId'))
        data.append("title", project.title)
        data.append("content", project.content)
        data.append("step1", project.step1)
        data.append("step2", project.step2)
        data.append("step3", project.step3)
        axios.put(apiPath + 'api/addProject', data, props.config)
            .then((res) => {
                window.location.href = "/editProject"
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
                                <Form.Control as="textarea" rows={1} value={project.title} onChange={(e) => handleSetProject('title', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>題目描述：</Form.Label>
                                <Form.Control as="textarea" rows={5} value={project.content} onChange={(e) => handleSetProject('content', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step1">
                                <Form.Label>題目分解步驟一：</Form.Label>
                                <Form.Control as="textarea" rows={3} value={project.step1} onChange={(e) => handleSetProject('step1', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step2">
                                <Form.Label>題目分解步驟二：</Form.Label>
                                <Form.Control as="textarea" rows={3} value={project.step2} onChange={(e) => handleSetProject('step2', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step3">
                                <Form.Label>題目分解步驟三：</Form.Label>
                                <Form.Control as="textarea" rows={3} value={project.step3} onChange={(e) => handleSetProject('step3', e.target.value)} />
                            </Form.Group>
                            <Button variant="success" style={{ width: '30%' }} onClick={subProject}>送出</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default EditProjectContent;
