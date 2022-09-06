import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Card } from 'react-bootstrap';
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios';
import code from '../images/Code.png'
import comment from '../images/Comment.png'


function Index() {

    const toWriteCode = () => {
        window.location.href = "./projectList"
    }

    const toAssessment = () => {
        window.location.href = "./assessmentList"
    }

    return (
        <>
            <Header />
            <SideBar item='' />
            <Container>
                <Row>
                    <Col lg={12} xd={12}><h1>Java 小課堂</h1></Col>
                </Row>
                <Row>
                    <Col lg={8} xs={12}><h2>今日挑戰</h2></Col>
                    <Col lg={4} xd={0}></Col>
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
                    <Col lg={4} xd={0}></Col>
                </Row>
            </Container>

        </>
    );
}

export default Index;
