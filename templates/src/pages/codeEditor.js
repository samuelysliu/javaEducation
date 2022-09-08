import axios from 'axios';

import { useState } from 'react';
import Editor from "@monaco-editor/react";
import { css } from '@emotion/css'

function CodeEditor() {
    // State variable to set users source code
    const [userCode, setUserCode] = useState(``);

    // State variable to set editors default language
    const [userLang, setUserLang] = useState("java");

    // State variable to set editors default theme
    const [userTheme, setUserTheme] = useState("vs-dark");

    // State variable to set editors default font size
    const [fontSize, setFontSize] = useState(20);

    // State variable to set users input
    const [userInput, setUserInput] = useState("");

    // State variable to set users output
    const [userOutput, setUserOutput] = useState("");

    // Loading state variable to show spinner
    // while fetching data
    const [loading, setLoading] = useState(false);

    const options = {
        fontSize: fontSize
    }

    // Function to call the compile endpoint
    function compile() {
        setLoading(true);
        if (userCode === ``) {
            return
        }

        let data = {
            code: userCode,
            language: userLang,
            input: userInput
        }

        // Post request to compile endpoint
        axios.post('http://127.0.0.1:5000/api/compiler', data).then((res) => {
            setUserOutput(res.data.output);
        }).then(() => {
            setLoading(false);
        })
    }

    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        <div className={style}>
            <div className="App">
                <div className="main">
                    <div className="left-container">
                        <Editor
                            options={options}
                            height="calc(100vh - 50px)"
                            width="100%"
                            theme={userTheme}
                            language={userLang}
                            defaultLanguage="python"
                            defaultValue="# Enter your code here"
                            onChange={(value) => { setUserCode(value) }}
                        />
                        <button className="run-btn" onClick={() => compile()}>
                            Run
                        </button>
                    </div>
                    <div className="right-container">
                        <h4>Input:</h4>
                        <div className="input-box">
                            <textarea id="code-inp" onChange=
                                {(e) => setUserInput(e.target.value)}>
                            </textarea>
                        </div>
                        <h4>Output:</h4>
                        {loading ? (
                            <div className="spinner-box">
                                Loading...
                            </div>
                        ) : (
                            <div className="output-box">
                                <pre>{userOutput}</pre>
                                <button onClick={() => { clearOutput() }}
                                    className="clear-btn">
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;

const style = css`
    .App{
    max-height: 100vh;
    width: 100%;
    overflow-y: hidden;
    background-color: #474747;
    }
    .main{
    display: flex;
    height: calc(100vh - 50px);
    }
    .left-container{
    position: relative;
    flex: 60%;
    height: calc(100vh - 50px);
    }
    .right-container{
    flex: 40%;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    background-color: #242424;
    border-left: 3px solid #1f65e6;
    padding: 5px;
    }
    .input-box{
    flex: 50%;
    }
    .input-box textarea{
    font-size: 16px;
    }
    .spinner-box{
    flex: 50%;
    background-color: #242424;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .spinner-box img{
    width: 200px;
    }
    .output-box{
    flex: 50%;
    background-color: #242424;
    overflow-y: auto;
    color: white;
    position: relative;
    }
    .clear-btn{
    position: absolute;
    bottom: 14px;
    right: 18px;
    width: 80px;
    height: 40px;
    font-size: 22px;
    font-weight: bold;
    color: white;
    background-color: #1f65e6;
    border: none;
    border-radius: 4px;
    transition: 0.3s;
    cursor: pointer;
    }
    .output-box pre{
    font-size: 15px;
    white-space: pre-wrap;
    }
    h4{
    color: #afec3f;
    }
    #code-inp{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    background-color: #242424;
    color: whitesmoke;
    padding: 5px;
    }
    #code-inp:focus{
    outline: none;
    }
    .run-btn{
    position: absolute;
    bottom: 10px;
    right: 18px;
    width: 80px;
    height: 40px;
    font-size: 22px;
    font-weight: bold;
    background-color: #afec3f;
    border: none;
    border-radius: 4px;
    transition: 0.3s;
    cursor: pointer;
    }
    .run-btn:active{
    background-color: #6e9427;
    }
`