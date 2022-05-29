import Header from './components/navbar';
import { Row, Col, Container, Button, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Iframe from 'react-iframe'
import Dropzone, { useDropzone } from "react-dropzone";
import Image from '../src/images/Image.png'
import { useSearchParams } from 'react-router-dom';

function WriteCode(props) {
    const apiPath = "http://127.0.0.1:8000"

    const topic = {
        textAlign: 'center'
    }
    const interval = {
        paddingTop: '15px',
        paddingBottom: '10px'
    }
    const [project, setProject] = useState({ title: '', content: '', step1: '', step2: '', step3: '' });    //設定題目的初始值，等取得實際題目內容後代入
    const [params, setParams] = useSearchParams();  //取得url 帶的值

    const [username, setUsername] = useState()

    useEffect(() => {
        //取得題目內容
        axios.get(apiPath + '/api/addProject?projectId=' + params.get('projectId'), props.config).then((res) => {
            setProject(res['data']);
        }).catch((error) => console.log(error));

        //取得使用者身分
        axios.get(apiPath + '/api/userProfile', props.config)
            .then((res) => {
                setUsername(res['data'].username)
            })
            .catch((error) => console.log())
    }, []);

    const uploadFileContent = {
        textAlign: 'center',
        padding: '40px',
        border: '5px dashed #9D9D9D',
        backgroundColor: '#fafafa',
        color: '#46A3FF',
        marginBottom: '20px'
    };

    const [fileNames, setFileNames] = useState([]);
    const [file, setFile] = useState([])
    const handleDrop = (acceptedFiles) => {
        setFileNames(acceptedFiles.map(file => file.name));
        setFile(acceptedFiles)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData();
        data.append('projectId', params.get('projectId'))
        data.append('owner', username)
        data.append('fileName', file[0]['name'])
        data.append('file', file[0])
        try {
            axios.post(apiPath + '/api/javaFile', data, props.config)
                .then((res) => {
                    window.location.href = "/"
                    console.log(res)
                })
                .catch((error) => console.log(error))
        } catch {

        }
    }


    return (
        <>
            <Header />
            <Container>

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
                        <Iframe url='https://trinket.io/embed/java/0ec180e5e6' width='100%' height='356px;'></Iframe>
                    </Col>
                </Row>
                <Row style={interval}>
                    <Col>
                        <h3>第二步驟</h3>
                        <p>{project.step2}</p>
                        <Iframe url='https://trinket.io/embed/java/0ec180e5e6' width='100%' height='356px;'></Iframe>
                    </Col>
                </Row>
                <Row style={interval}>
                    <Col>
                        <h3>第三步驟</h3>
                        <p>{project.step3}</p>
                        <Iframe url='https://trinket.io/embed/java/0ec180e5e6' width='100%' height='356px;'></Iframe>
                    </Col>
                </Row>
                <Row style={interval}>
                    <Col>
                        <Dropzone onDrop={handleDrop} accept={'.java'}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ style: uploadFileContent })}>
                                    <input {...getInputProps()} />
                                    <img src={Image} className="uploadFileIcon"></img>
                                    <p><strong>請上傳您最終的Java檔</strong></p>
                                </div>

                            )}
                        </Dropzone>
                        <div>
                            <strong>Files:</strong>
                            <ul>
                                {fileNames.map(fileName => (
                                    <li key={fileName}>{fileName}</li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>

                <Row style={interval}>
                    <Col>
                        <Button onClick={handleSubmit}>確認上傳</Button>
                    </Col>
                </Row>

            </Container>

        </>
    );
}

export default WriteCode;
