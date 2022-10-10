import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { css } from '@emotion/css'


function AnswerSitulation({ apiPath, config }) {
    const [classPage, setClassPage] = useState("資一A")
    const [projectArray, setProjectArray] = useState([])
    useEffect(() => {
        axios.get(apiPath + "/api/project?class=" + classPage, config).then((res) => {
            setProjectArray(res["data"]["result"])
        }).catch(error => console.log(error))
    }, [classPage])

    return (
        <div className={style}>
            <Header hasLogin={true} />
            <SideBar item={"answerSitulation"} />

            <Container>
                <Row>
                    <Col lg={12} xd={12}><h1 style={{ fontWeight: "800" }}>學生作答情況</h1></Col>
                </Row>
                <Row className="classSelect">
                    <Col lg={12} xd={12}>
                        <Form.Select onChange={(e) => setClassPage(e.target.value)}>
                            <option value="資一A">資一A</option>
                            <option value="資一B">資一B</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="projectList">
                    <Col lg={12} xd={12}>題目列表</Col>
                </Row>
                <Row style={{ fontSize: "20px" }}>
                    {projectArray.map((project) =>
                        <Col lg={12} xd={12}>
                            <Link to={"/ProjectAnswerSitulation?projectId=" + project.id}>{project.title}</Link>
                        </Col>
                    )}
                </Row>
            </Container>

        </div >
    );
}

export default AnswerSitulation;

const style = css`
    .classSelect{
        padding-top: 20px;
        padding-bottom: 20px;
        width: 30%;
        margin: auto;
    }


    .projectList{
        font-size: 28px;
        font-weight: 700;
        border-color: black;
        border-style: solid;
        border-width: 0 0 1px 0;
    }
`
