import React, { useState, useEffect } from 'react'
import Header from '../components/navbar';
import '../index.css'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import commentImg from '../images/Comment.png'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import CodeEditor from '../components/codeEditor';
import { useNavigate } from "react-router-dom";
import { css } from '@emotion/css'

function Assessment({ apiPath, config }) {
  const navigate = useNavigate();

  const [sourceCode, setSourceCode] = useState();
  const [params, setParams] = useSearchParams();
  const projectId = params.get('projectId');
  const owner = params.get('owner');
  const [project, setProject] = useState({
    "title": "", "class": "", "content": "",
    "step1": "", "step2": "", "step3": ""
  });
  const [commentRecord, setCommentRecord] = useState([{ comment: '', commentator: '', projectId: '', response: '', reviewed: '' }]);

  useEffect(() => {
    //取得題目
    axios.get(apiPath + '/api/project?projectId=' + projectId, config).then((res) => {
      setProject(res["data"]["result"]);
    }).catch((error) => console.log(error));

    //取得所有評論
    axios.get(apiPath + '/api/comment?projectId=' + projectId + "&owner=" + owner, config).then((res) => {
      setCommentRecord(res["data"]["result"])
    }).catch((error) => console.log(error));

  }, []);

  const card = {
    border: '1px solid white',
    borderRadius: '20px',
    backgroundColor: 'white',
    paddingTop: '20px',
  }

  const [comment, setComment] = useState()

  const commentSubmit = () => {
    //傳送評論
    let data = {
      projectId: projectId,
      comment: comment,
      owner: owner
    }
    axios.post(apiPath + '/api/comment', data, config).then((res) => {
      setComment("")
      //刷新所有評論
      axios.get(apiPath + '/api/comment?projectId=' + projectId + "&owner=" + owner, config).then((res) => {
        setCommentRecord(res["data"]["result"])
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error))

  }

  return (
    <>
      <Header hasLogin={true} />
      <Container className={style}>
        <Row>
          <Col><h1><img src={commentImg} style={{ width: '50px' }}></img>同儕互評</h1></Col>
        </Row>
        <Row className="interval">
          <Col style={{ textAlign: 'center' }}><h3>{owner} 同學</h3></Col>
        </Row>
        <Row className="interval">
          <Col style={{ textAlign: 'center' }}><p>{project.content}</p></Col>
        </Row>

        <Row className="interval">
          <Col style={card}>
            <h2>Step1</h2>
            <p>{project.step1}</p>
            <CodeEditor apiPath={apiPath} projectId={projectId} stepNum="1" config={config} readOnly={true} owner={owner} />
          </Col>
        </Row>

        <Row className="interval">
          <Col style={card}>
            <h2>Step2</h2>
            <p>{project.step2}</p>
            <CodeEditor apiPath={apiPath} projectId={projectId} stepNum="2" config={config} readOnly={true} owner={owner} />
          </Col>
        </Row>

        <Row className="interval">
          <Col style={card}>
            <h2>Step3</h2>
            <p>{project.step3}</p>
            <CodeEditor apiPath={apiPath} projectId={projectId} stepNum="3" config={config} readOnly={true} owner={owner} />
          </Col>
        </Row>

        <br></br>
        <Row>
          <Col style={{ textAlign: 'center', borderRadius: "5px" }}><h3><strong>留言區</strong></h3></Col>
        </Row>
        <Row className='messageCard'>

          {commentRecord === "no data"
            ?
            (commentRecord.length === undefined
              ?
              (<p>{commentRecord.commentator} ： {commentRecord.comment}</p>)
              :
              "")
            :
            (commentRecord.length === undefined
              ?
              (<p>{commentRecord.commentator} ： {commentRecord.comment}</p>)
              :
              commentRecord.map((message) => <>
                <p>{message.commentator} ： {message.comment}</p>
              </>)
            )
          }
        </Row>
        <Row className="interval">
          <Col>
            <Form className="commentForm">
              <Form.Control style={{ height: '80px', width: "80%" }} as="textarea" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='請輸入您的評論' />
              <Button variant="success" style={{ marginTop: '20px' }} onClick={commentSubmit}>送出</Button>
            </Form>
          </Col>
        </Row>
      </Container>


    </>
  );
}

export default Assessment;

const style = css`
  .messageCard{
    background-color: white; 
    min-height: 100px;
    padding: 10px;
    max-height: 200px;
    overflow: auto;
  }

  .interval{
    padding-top: 15px;
    padding-bottom: 10px;
  }

  .commentForm{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .commentForm button{
    width: 50%;
  }
`
