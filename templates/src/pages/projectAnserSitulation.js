import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { css } from '@emotion/css'
import { useSearchParams } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md'


function ProjectAnswerSitulation({ apiPath, config }) {
    const navigate = useNavigate();

    const [params, setParams] = useSearchParams();  //取得url 帶的值
    const [project, setProject] = useState({});
    const [tableContent, setTableContent] = useState([])



    //get project info
    useEffect(() => {
        axios.get(apiPath + "/api/project?projectId=" + params.get('projectId'), config).then((res) => {
            setProject(res["data"]["result"])
        }).catch(error => console.log(error))
    }, [])

    // get prject, comment, group student info         
    useEffect(() => {
        axios.get(apiPath + "/api/completeSitulation?projectId=" + params.get('projectId') + "&class=" + project.class, config).then((res) => {
            let allCompleteArray = res["data"]["result"]["allCompleteArray"]
            let completeProjectArray = res["data"]["result"]["completeProjectArray"]
            let completeCommentArray = res["data"]["result"]["completeCommentArray"]
            let noCompleteArray = res["data"]["result"]["noCompleteArray"]

            let totalArrayLen = res["data"]["result"]["totalArrayLen"]
            let tempContent = [];

            for (let i = 0; i < totalArrayLen; i++) {
                tempContent.push(
                    <Row className="tableContent">
                        <Col lg={3} xs={3}><Link to={"/userSitulation?account=" + allCompleteArray[i] + "&projectId=" + params.get('projectId')} >{allCompleteArray[i]}</Link></Col>
                        <Col lg={3} xs={3}><Link to={"/userSitulation?account=" + completeProjectArray[i] + "&projectId=" + params.get('projectId')} >{completeProjectArray[i]}</Link></Col>
                        <Col lg={3} xs={3}><Link to={"/userSitulation?account=" + completeCommentArray[i] + "&projectId=" + params.get('projectId')} >{completeCommentArray[i]}</Link></Col>
                        <Col lg={3} xs={3}><Link to={"/userSitulation?account=" + noCompleteArray[i] + "&projectId=" + params.get('projectId')} >{noCompleteArray[i]}</Link></Col>
                    </Row>
                )
            }

            setTableContent(tempContent)
        }).catch(error => console.log(error))

    }, [project])

    return (
        <div className={style}>
            <Header hasLogin={true} />
            <SideBar item={"answerSitulation"} />

            <Container>
                <Row>
                    <Col className="goBack" lg={1} xd={1}><MdArrowBackIosNew className="goBackIcon" size="24" onClick={() => navigate(-1)} /></Col>
                </Row>
                <Row>
                    <Col lg={12} xs={12}><h1 style={{ fontWeight: "800" }}>學生作答情況</h1></Col>
                </Row>

                <Row className="description">
                    <Col lg={12} xs={12}>
                        <font className="title">{project.title}</font>
                    </Col>
                </Row>

                <Row className="tableStyle">
                    <Row className="tableHead">
                        <Col lg={3} xs={3}>完成作業&評論</Col>
                        <Col lg={3} xs={3}>僅完成作業</Col>
                        <Col lg={3} xs={3}>僅完成評論</Col>
                        <Col lg={3} xs={3}>都未完成</Col>
                    </Row>

                    {tableContent}
                </Row>
            </Container>

        </div >
    );
}

export default ProjectAnswerSitulation;

const style = css`
    .goBack{
        position: fixed;
    }

    .goBack svg{
        color: #378dfc;
    }

    .description{
        padding-top: 30px;
        text-align: center;
    }

    .description .title{
        font-size: 28px;
        font-weight: 800;
    }

    .tableStyle{
        background-color: white;
        display: flex;
        justify-content: center;
        margin: 10px;
    }

    .tableHead{
        border-color: #E0E0E0;
        border-style: solid;
        border-width: 0 0 1px 0;
        color: #666666;
    }

    .tableContent{
        margin-top: 5px;
        margin-bottom: 5px;
    }
`
