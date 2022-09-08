export class Controller{
    constructor(){
        if(process.env.REACT_APP_NETWORK === "local"){
            this.apiPath = "http://127.0.0.1:5000"
        }else if(process.env.REACT_APP_NETWORK === "main"){

        }else{
            this.apiPath = "http://127.0.0.1:5000"
        }
    }

    viewApiPath(){
        return this.apiPath
    } 
}