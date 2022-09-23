import axios from 'axios';
import { useState } from 'react';
import Editor from "@monaco-editor/react";
import { css } from '@emotion/css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

function CodeEditor({ apiPath, projectId, stepNum, config, readOnly }) {
    const userName = useSelector((state) => state.userProfile.value["account"])

    // State variable to set users source code
    const [userCode, setUserCode] = useState(``);

    // State variable to set users input
    const [userInput, setUserInput] = useState("");

    // State variable to set users output
    const [userOutput, setUserOutput] = useState("");

    // Loading state variable to show spinner
    // while fetching data
    const [loading, setLoading] = useState(false);

    const [defaultCode, setDefaultCode] = useState(
        `// Enter your code here 
public class Example {
    public static void main (String[] args){

    }
}`
    )

    const options = {
        fontSize: 16,
        readOnly: readOnly ? true : false
    }

    // Function to call the compile endpoint
    function compile() {
        setLoading(true);

        let data = {
            code: userCode,
            language: "java",
            userInput: userInput,
            input: userInput
        }

        // Post request to compile endpoint
        axios.post(apiPath + '/api/compiler', data, config).then((res) => {
            setUserOutput(res["data"]["result"]);

            data = {
                projectId: projectId,
                account: userName,
                stepNum: stepNum,
                code: userCode
            }
            //save file
            axios.post(apiPath + "/api/file", data, config).then((res) => {
                setLoading(false);
            }).catch(error => console.log(error))

        }).catch(error => console.log(error))
    }

    useEffect(() => {
        if (userName !== "") {
            axios.get(apiPath + "/api/file?projectId=" + projectId + "&account=" + userName + "&stepNum=" + stepNum, config).then((res) => {
                if (res["data"]["result"] !== "failed") {
                    setDefaultCode(res["data"]["result"])
                    setUserCode(res["data"]["result"])
                }
            }).catch(error => console.log(error))
        }
    }, [userName])


    return (
        <div className={style}>
            <Container className="bc">
                <Row>
                    <Col className="codeEditor-div">
                        <Editor
                            options={options}
                            width="100%"
                            theme="vs-dark"
                            language="java"
                            defaultLanguage="java"
                            defaultValue={defaultCode}
                            onChange={(value) => { setUserCode(value) }}
                            keepCurrentOriginalModel={true}
                        />
                    </Col>
                    {readOnly !== true ?
                        <Col>
                            <Row>
                                <Col className='result-div'>
                                    <p>Input:</p>
                                    <div>
                                        <input className="box" onChange=
                                            {(e) => setUserInput(e.target.value)}>
                                        </input>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='result-div'>
                                    <h4>Output:</h4>
                                    <div className="box">
                                        {loading ? <p>Loading...</p> : <p>{userOutput}</p>}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        : ""}
                </Row>
                {readOnly !== true ?
                    <Row className='bt-div'>
                        <button onClick={compile}>
                            Save & Run
                        </button>
                    </Row>
                    : ""}
            </Container>

        </div>
    );
}

export default CodeEditor;

const style = css`
    .bc{
        background-color: #1E1E1E;
        padding-bottom: 10px;
    }

    .codeEditor-div{
        border-color: #545454;
        border-style: solid;
        border-width: 0px 2px 0px 0px;
        height: 300px;
    }

    .result-div{
        color: white;
        font-size: 24px;
        font-weight: 900;
        padding-bottom: 5px;
    }

    .box{
        background-color: #1E1E1E;
        border-style: solid;
        border-color: #545454;
        border-width: 2px;
        width: 100%;
        border-radius: 8px;
        color: white;
        font-size: 12px;
    }

    .bt-div{
        position: relative;
        left: 90%;
        padding-top: 10px;
    }

    .bt-div button{
        background-color: #04AA6D;
        border-radius: 8px;
        border-width: 0px;
        height: 50px;
        color: white;
        width: 10%;
    }
`