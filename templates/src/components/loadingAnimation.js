import LoadingGIF from '../images/loading.gif';
import { css } from '@emotion/css'

function LoadingAnimation({ show, message }) {
    let card = {}
    if (show) {
        card = {
            display: "inherit",
        }
    } else {
        card = {
            display: "none",
        }
    }


    const pupUpDiv = {
        backgroundImage: `url(${LoadingGIF})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "160px",
        position: "absolute",
        left: "50%",
        width: "300px",
        textAlign: "center",
        borderRadius: "50px",
        zIndex: "9992"
    }

    return (
        <div className={style} style={card}>
            <div className='bc'>
            </div>
            <div style={pupUpDiv}>
                <p className='loadingText'>{message}</p>
            </div>
        </div>

    );
}

export default LoadingAnimation;

const style = css`
    .bc{
        background-color: #8f8f8f;
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        opacity: 0.7;
        z-index: 9991;
    }

    .loadingText{
        padding-top: 15px;
        font-size: 36px;
        font-weight: 900;
    }

`
