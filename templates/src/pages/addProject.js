import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';


function AddProject(props) {
    const centerContainer = {
        textAlign: "center"
    }

    const [project, setProject] = useState([{ title: '', content: '', step1: '', step2: '', step3: '' }])

    const handleSetProject = (item, value) =>{
        let copyProject = {...project}
        copyProject[item] = value
        setProject(project => ({...copyProject}));
    }

    const subProject = () => {
        let data = new FormData()
        data.append("title", project.title)
        data.append("content", project.content)
        data.append("step1", project.step1)
        data.append("step2", project.step2)
        data.append("step3", project.step3)
        axios.post('http://127.0.0.1:8000/api/addProject', data, props.config)
            .then((res) => {
                window.location.href = "/"
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
                                <Form.Control as="textarea" rows={1} onChange={(e) => handleSetProject('title', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>題目描述：</Form.Label>
                                <Form.Control as="textarea" rows={5} onChange={(e) => handleSetProject('content', e.target.value )} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step1">
                                <Form.Label>題目分解步驟一：</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => handleSetProject('step1', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step2">
                                <Form.Label>題目分解步驟二：</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => handleSetProject('step2', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="step3">
                                <Form.Label>題目分解步驟三：</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => handleSetProject('step3', e.target.value)} />
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
