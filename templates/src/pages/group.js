import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/navbar';
import SideBar from '../components/sidebar';
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { css } from '@emotion/css'
import GroupExampleFile from '../files/groupList.xlsx';
import axios from 'axios';
import LoadingAnimation from '../components/loadingAnimation';
import PopUp from '../components/popUp';

function Group({ apiPath, config }) {
    const [classPage, setClassPage] = useState("資一A")
    const [file, setFile] = useState();
    const fileTypes = ["xlsx"];
    const [isUploadFile, setIsUploadFile] = useState(false)
    const [popUpShow, setPopUpShow] = useState(false)
    const [group, setGroup] = useState([])
    const [studentArray, setStudentArray] = useState([])

    const handleUpload = (file) => {
        setFile(file)
    }

    const sendFile = () => {
        setIsUploadFile(true)
        let formData = new FormData();
        formData.append("file", file)
        formData.append("class", classPage)
        
        axios.post(apiPath + "/api/group", formData, config).then((res) => {
            setIsUploadFile(false)
            setPopUpShow(true)
        }).catch(error => setIsUploadFile(false))
    }

    const getStudentLabel = (studentAccount) => {
        if (studentAccount !== undefined) {
            for (let i = 0; i < studentArray.length; i++) {
                if (studentArray[i].account === studentAccount) {
                    if (studentArray[i].label === "high")
                        return "#0FE600"
                    else if (studentArray[i].label === "mid")
                        return "#FFA000"
                    else if (studentArray[i].label === "low")
                        return "#E0002F"
                }
            }
            return "#0049F5"
        }
    }

    useEffect(() => {
        axios.get(apiPath + "/api/group?class=" + classPage, config).then((res) => {
            setGroup(res["data"]["result"])
            axios.get(apiPath + "/api/student?class=" + classPage, config).then((res) => {
                setStudentArray(res["data"]["result"])
            }).catch(error => console.log(error))

        }).catch(error => console.log(error))
    }, [isUploadFile, classPage])

    return (
        <div className={style}>
            <Header hasLogin={true} />
            <SideBar item={"group"} />

            <Container>
                <Row>
                    <Col lg={12} xd={12}><h1 style={{ fontWeight: "800" }}>分組設定</h1></Col>
                </Row>

                <Row className="classSelect">
                    <Col lg={12} xd={12}>
                        <Form.Select onChange={(e) => setClassPage(e.target.value)}>
                            <option value="資一A">資一A</option>
                            <option value="資一B">資一B</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} xs={12}>
                        <Row>
                            <Col lg={6} xs={12} className="fileUpload">
                                <FileUploader mutiple={false} handleChange={handleUpload} name="file" types={fileTypes} label="Click or drop to upload file" />

                                {file ?
                                    <>
                                        <font>檔名: {file.name}</font>
                                        <Button className='uploadBt' onClick={sendFile}>確認上傳</Button>
                                    </>
                                    : ""}

                            </Col>
                            <Col lg={6} xs={12}>
                                <font style={{ fontWeight: "800" }}>說明:</font>
                                <font>
                                    系統會根據您上傳的檔案自動產生新的學生分組。請依據範例格式上傳.xlsx檔。
                                </font>
                                <br></br>
                                <Link to={GroupExampleFile}>下載範例檔</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="description">
                    <Col lg={12} xs={12}>
                        <font className="title">分組名單</font>
                        <div className="colorBoard">
                            <div className="circle" style={{ backgroundColor: "#0FE600" }}></div><font>成績優異</font>
                            <div className="circle" style={{ backgroundColor: "#FFA000" }}></div><font>成績普通</font>
                            <div className="circle" style={{ backgroundColor: "#E0002F" }}></div><font>成績待加強</font>
                            <div className="circle" style={{ backgroundColor: "#0049F5" }}></div><font>該學生尚未註冊</font>
                        </div>
                    </Col>
                </Row>

                <Row className="tableStyle">
                    <Row className="tableHead">
                        <Col lg={1} xs={1}>班級</Col>
                        <Col lg={3} xs={3}>組員一</Col>
                        <Col lg={3} xs={3}>組員二</Col>
                        <Col lg={3} xs={3}>組員三</Col>
                        <Col lg={2} xs={2}>組員四</Col>
                    </Row>
                    {group.map((gp) =>
                        <Row>
                            <Col lg={1} xs={1}>{gp.class}</Col>
                            <Col lg={3} xs={3} className="member">
                                <div className="smallCircle" style={{ backgroundColor: getStudentLabel(gp.member1) }}></div>{gp.member1}
                            </Col>
                            <Col lg={3} xs={3} className="member">
                                <div className="smallCircle" style={{ backgroundColor: getStudentLabel(gp.member2) }}></div>{gp.member2}
                            </Col>
                            <Col lg={3} xs={3} className="member">
                                <div className="smallCircle" style={{ backgroundColor: getStudentLabel(gp.member3) }}></div>{gp.member3}
                            </Col>
                            <Col lg={2} xs={2} className="member">
                                <div className="smallCircle" style={{ backgroundColor: getStudentLabel(gp.member4) }}></div>{gp.member4}
                            </Col>
                        </Row>
                    )}
                </Row>
            </Container>
            <LoadingAnimation show={isUploadFile} message="分組中" />
            <PopUp show={popUpShow} setShow={setPopUpShow} message="分組完成" />
        </div >
    );
}

export default Group;

const style = css`
    .classSelect{
        padding-top: 20px;
        padding-bottom: 20px;
        width: 30%;
        margin: auto;
    }

    .fileUpload{
        padding-bottom: 10px;
    }
    .fileUpload label{
        min-width: 100%;
    }
    .fileUpload font{
        font-weight: 800;
    }

    .uploadBt{
        margin: 10px;
    }

    .description{
        padding-top: 30px;
        text-align: center;
    }

    .description .title{
        font-size: 28px;
        font-weight: 800;
    }

    .description .colorBoard{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .circle{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin: 10px;
    }

    .smallCircle{
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin: 2px;
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

    .member{
        display: flex;
    }
`
