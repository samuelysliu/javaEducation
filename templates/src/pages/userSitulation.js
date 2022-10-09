import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { css } from '@emotion/css'
import { useSearchParams } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import rocketPng from "../images/rocket.png"
import rocketGif from "../images/rocket.gif"


function UserSitulaion({ apiPath, config }) {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();  //取得url 帶的值

    const [projectLink, setProjectLink] = useState()
    const [ownerArray, setOwnerArray] = useState([])

    const [rocketImg, setRocketImg] = useState(rocketPng)

    useEffect(() => {
        axios.get(apiPath + '/api/projectStudent?projectId=' + params.get('projectId'), config).then((res) => {
            let studentArray = res["data"]["result"]
            for (let i = 0; i < studentArray.length; i++) {
                if (params.get('account') === studentArray[i].account) {
                    setProjectLink("/assessment?projectId=" + params.get('projectId') + "&owner=" + params.get('account'))
                    break;
                }
            }
        }).catch((error) => console.log(error));

        axios.get(apiPath + "/api/comment?projectId=" + params.get('projectId') + "&commentator=" + params.get('account'), config).then((res) => {
            let commentArray = res["data"]["result"]
            let ownerTemp = [];

            for (let i = 0; i < commentArray.length; i++) {
                if (!ownerTemp.includes(commentArray[i].owner)) {
                    ownerTemp.push(commentArray[i].owner)
                    break;
                }
            }
            setOwnerArray(ownerTemp)
        }).catch(error => console.log(error))
    }, [])
    return (
        <div className={style}>
            <Header hasLogin={true} />
            <SideBar item={"answerSitulation"} />

            <Container>
                <Row>
                    <Col className="goBack" lg={1} xs={1}><MdArrowBackIosNew className="goBackIcon" size="24" onClick={() => navigate(-1)} /></Col>
                </Row>
                <Row>
                    <Col lg={12} xs={12}><h1 style={{ fontWeight: "800" }}>學生作答情況</h1></Col>
                </Row>
                <Row className="controlDiv">
                    <Col lg={6} xs={12} className="goToStudentProject">
                        {projectLink
                            ?
                            <>
                                <Link to={projectLink}
                                    onMouseEnter={() => setRocketImg(rocketGif)}
                                    onMouseLeave={() => setRocketImg(rocketPng)}>
                                    <Row>
                                        <Col lg={12} xs={12}><font>前往作業頁面</font></Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12} xs={12}><img src={rocketImg} alt="rocket" width="200px"></img></Col>
                                    </Row>
                                </Link>
                            </>
                            :
                            <font>該學生尚未完成作業</font>
                        }
                    </Col>
                    <Col lg={6} xs={12} className="commentDiv">
                        <font className="title">已評論對象</font>
                        {ownerArray.map((owner) =>
                            <Link to={"/assessment?projectId=" + params.get('projectId') + "&owner=" + owner}><font>{owner}</font></Link>
                        )}
                    </Col>
                </Row>
            </Container>

        </div >
    );
}

export default UserSitulaion;

const style = css`
    .goBack{
        position: fixed;
    }

    .goBack svg{
        color: #378dfc;
    }

    .controlDiv{
        padding-left: 10px;
        display: flex;
        justify-content: space-around;
    }

    .goToStudentProject{
        border-color: #378dfc;
        border-style: solid;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        border-radius: 20px;
        max-width: 300px;
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
    }

    .goToStudentProject a{
        text-decoration:none;
    }

    .goToStudentProject font{
        font-size: 24px;
        color: black;
        font-weight: 700;
    }
    
    .goToStudentProject img{
        border-radius: 50%;
    }

    .commentDiv{
        border-color: #378dfc;
        border-style: solid;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        border-radius: 20px;
        max-width: 300px;
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
    }

    .commentDiv .title{
        font-size: 24px;
        color: black;
        font-weight: 700;
    }
`
