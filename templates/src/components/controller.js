export class Controller{
    constructor(){
        if(process.env.REACT_APP_Environment === "local"){
            this.apiPath = "http://127.0.0.1:5000"
        }else if(process.env.REACT_APP_Environment === "main"){
            this.apiPath = "http://163.14.74.159:5000"
        }else{
            this.apiPath = "http://127.0.0.1:5000"
        }
    }

    viewApiPath(){
        return this.apiPath
    } 
}