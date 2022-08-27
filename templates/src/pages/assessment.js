import React, { useState, useEffect } from 'react'
import Header from '../components/navbar';
import { Rating } from 'react-simple-star-rating'
import '../index.css'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import commentImg from '../images/Comment.png'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


function Assessment(props) {
  const [sourceCode, setSourceCode] = useState();
  const [params, setParams] = useSearchParams();
  const projectId = params.get('projectId');
  const owner = params.get('owner');
  const [project, setProject] = useState();
  const [commentRecord, setCommentRecord] = useState([{ comment: '', commentator: '', projectId: '', response: '', reviewed: '' }]);

  useEffect(() => {
    //取得題目
    axios.get('http://127.0.0.1:8000/api/addProject?projectId=' + projectId, props.config).then((res) => {
      setProject(res['data'].content);
    }).catch((error) => console.log(error));

    //取得評論對象程式碼作品
    axios.get('http://127.0.0.1:8000/api/javaFile?projectId=' + projectId + "&reviewed=" + owner, props.config).then((res) => {
      setSourceCode(res['data'].replaceAll("< ", "").replaceAll("<", "< ").replaceAll("\n", "<br/>").replaceAll(" ", "&nbsp;"))
    }).catch((error) => console.log(error));

    //取得所有評論
    axios.get('http://127.0.0.1:8000/api/comment?projectId=' + projectId + "&reviewed=" + owner, props.config).then((res) => {
      setCommentRecord(res['data'])
    }).catch((error) => console.log(error));

  }, []);

  const interval = {
    paddingTop: '15px',
    paddingBottom: '10px'
  }

  const card = {
    border: '1px solid white',
    borderRadius: '20px',
    backgroundColor: 'white',
    paddingTop: '20px',
  }

  const [comment, setComment] = useState()
  const [rating, setRating] = useState(0) // initial rating value

  const commentSubmit = () => {
    //傳送評論
    let data = new FormData();
    data.append('projectId', projectId)
    data.append('commentator', props.username)
    data.append('reviewed', owner)
    data.append('comment', comment)
    axios.post('http://127.0.0.1:8000/api/comment', data, props.config).then((res) => {
      window.location.reload()
    }).catch((error) => console.log(error))

    /*
    //傳送分數
    let score = new FormData();
    score.append('projectId', projectId)
    score.append('commentator', props.username)
    score.append('rating', rating)
    axios.put('http://127.0.0.1:8000/api/assignComment', score, props.config).then((res) => {
      window.location.href = "/";
    }).catch((error) => console.log(error))
    */
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col><h1><img src={commentImg} style={{ width: '50px' }}></img>同儕互評</h1></Col>
        </Row>
        <Row style={interval}>
          <Col style={{ textAlign: 'center' }}><h3>{owner} 同學</h3></Col>
        </Row>
        <Row style={interval}>
          <Col style={{ textAlign: 'center' }}><p>{project}</p></Col>
        </Row>
        <Row style={interval}>
          <Col style={card}>
            <div dangerouslySetInnerHTML={{ __html: sourceCode }} />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col style={{ textAlign: 'center' }}><h3><strong>留言區</strong></h3></Col>
        </Row>
        <Row style={{ backgroundColor: 'white', minHeight: '100px', padding: '10px' }}>

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
        <Row style={interval}>
          <Col>
            <Form>
              {/*<Form.Label>您的評分：<Rating onClick={(e) => setRating(e)} ratingValue={rating} /></Form.Label>*/}
              <Form.Control style={{ height: '50px' }} as="textarea" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='請輸入您的評論' />
              <Button variant="success" style={{ marginTop: '20px' }} onClick={commentSubmit}>送出</Button>
            </Form>
          </Col>
        </Row>
      </Container>


    </>
  );
}

export default Assessment;
