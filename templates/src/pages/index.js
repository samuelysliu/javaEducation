import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css'
import code from '../images/Code.png'
import comment from '../images/Comment.png'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Link } from "react-router-dom";

function Index({ apiPath, config }) {
    const account = useSelector((state) => state.userProfile.value["account"])
    const className = useSelector((state) => state.userProfile.value["class"])
    const groupName = useSelector((state) => state.userProfile.value["groupName"])
    const navigate = useNavigate();

    const [hasDoneArray, setHasDoneArray] = useState([])
    const [projectArray, setProjectArray] = useState([])
    const [notDoneArray, setNotDoneArray] = useState([])

    const [memberArray, setMemberArray] = useState({ member1: '', member2: '', member3: '', member4: '' })

    const toWriteCode = () => {
        navigate("/projectList")
    }

    const toAssessment = () => {
        navigate("/assessmentList")
    }

    useEffect(() => {
        axios.get(apiPath + '/api/projectStudent?account=' + account, config).then((res) => {
            setHasDoneArray(res["data"]["result"]);
        }).catch((error) => console.log(error));

        axios.get(apiPath + '/api/project?class=' + className, config).then((res) => {
            setProjectArray(res['data']["result"]);
        }).catch((error) => console.log(error));

        axios.get(apiPath + '/api/group?class=' + className + '&groupName=' + groupName, config).then((res) => {
            setMemberArray(res['data']["result"])
        }).catch(error => console.log(error))
    }, [account, className, groupName, config]);

    useEffect(() => {
        let notDoneTemp = []
        for (let i = 0; i < projectArray.length; i++) {
            if (hasDoneArray.length === 0) {
                notDoneTemp.push(projectArray[i])
            }
            else {
                for (let j = 0; j < hasDoneArray.length; j++) {
                    if (projectArray[i].id === hasDoneArray[j].projectId) {
                        break
                    }
                    else if (j === hasDoneArray.length - 1) {
                        notDoneTemp.push(projectArray[i])
                    }
                }
            }
        }
        setNotDoneArray(notDoneTemp)
    }, [projectArray, hasDoneArray])

    return (
        <>
            <Header hasLogin={true} />
            <SideBar />
            <Container className={style}>
                <Row>
                    <Col lg={12} xd={12}><h1>Java 課堂</h1></Col>
                </Row>
                <Row>
                    <Col lg={8} xs={12}><h2>今日挑戰</h2></Col>
                    <Col lg={4} xd={12}><h2>提醒事項</h2></Col>
                </Row>
                <Row>
                    <Col lg={4} xs={12}>
                        <Card border="info" style={{ width: 'auto' }} onClick={toWriteCode}>
                            <Card.Header><h3><img src={code} style={{ width: '50px' }}></img><strong>程式練習</strong></h3></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    按照老師給的提示將程式拆分進行練習
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} xs={12}>
                        <Card border="info" style={{ width: 'auto' }} onClick={toAssessment}>
                            <Card.Header><h3><img src={comment} style={{ width: '50px' }}></img><strong>同儕互評</strong></h3></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    請協助同學提升程式能力，留下您的回饋
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} xs={12}>
                        <div className="remindDiv">
                            <font className="title">您尚未完成的作業：</font>
                            {notDoneArray.map((project) =>
                                <Link key="{project.id}" to={'/writeCode?projectId=' + project.id}><font>{project.title}</font></Link>
                            )}

                            <br />
                            <font className="title">您需要評分的組員：</font>
                            <font id="alert">*此處僅顯示組員，並未偵測您是否已評分，請確認每一項作業都有為他們評分</font>
                            {account !== memberArray.member1 ? <font>{memberArray.member1}</font> : ''}
                            {account !== memberArray.member2 ? <font>{memberArray.member2}</font> : ''}
                            {account !== memberArray.member3 ? <font>{memberArray.member3}</font> : ''}
                            {account !== memberArray.member4 ? <font>{memberArray.member4}</font> : ''}
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Index;

const style = css`
    .remindDiv{
        background-color: white;
        border-color: #939393;
        border-style: solid;
        border-width: 1px;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 10px;
    }

    .remindDiv .title{
        font-size: 20px;
        font-weight: 700;
    }

    #alert{
        font-size: 12px;
        color: #6C757D
    }

`