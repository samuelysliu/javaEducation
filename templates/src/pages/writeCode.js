import Header from '../components/navbar';
import { Row, Col, Container, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { css } from '@emotion/css'
import CodeEditor from './codeEditor';
import { useNavigate } from "react-router-dom";

function WriteCode({apiPath, config}) {
    const userName = useSelector((state) => state.userProfile.value["account"])
    const navigate = useNavigate();

    const topic = {
        textAlign: 'center'
    }
    const interval = {
        paddingTop: '15px',
        paddingBottom: '10px'
    }
    const [project, setProject] = useState({ title: '', content: '', step1: '', step2: '', step3: '' });    //設定題目的初始值，等取得實際題目內容後代入
    const [params, setParams] = useSearchParams();  //取得url 帶的值

    useEffect(() => {
        //取得題目內容
        axios.get(apiPath + '/api/project?projectId=' + params.get('projectId'), config).then((res) => {
            setProject(res["data"]["result"]);
        }).catch((error) => console.log(error));
    }, []);

    return (
        <>
            <Header hasLogin={true} />
            <Container className={style}>
                <Row>
                    <Col><h1>{project.title}</h1></Col>
                </Row>
                <Row>
                    <Col><p style={topic}>{project.content}</p></Col>
                </Row>
                <Row style={interval}>
                    <Col>
                        <h3>第一步驟</h3>
                        <p>{project.step1}</p>
                        <CodeEditor apiPath={apiPath} projectId={params.get('projectId')} stepNum="1" config={config} userName={userName} />
                    </Col>
                </Row>
                <Row style={interval}>
                    <Col>
                        <h3>第二步驟</h3>
                        <p>{project.step2}</p>
                        <CodeEditor apiPath={apiPath} projectId={params.get('projectId')} stepNum="2" config={config} userName={userName} />
                    </Col>
                </Row>
                <Row style={interval}>
                    <Col>
                        <h3>第三步驟</h3>
                        <p>{project.step3}</p>
                        <CodeEditor apiPath={apiPath} projectId={params.get('projectId')} stepNum="3" config={config} userName={userName} />
                    </Col>
                </Row>
                <Row style={interval}>
                    <Col>
                        <Button onClick={() => navigate("/")}>我已完成</Button>
                    </Col>
                </Row>

            </Container>

        </>
    );
}

export default WriteCode;

const style = css`
    h3{
        font-weight: 900;
    }
`