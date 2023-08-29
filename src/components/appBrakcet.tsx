import styled from "@emotion/styled";
import 'font-awesome/css/font-awesome.min.css';
import { ConnectWallets } from "./innerds";
export function Window () {
    return (
        <StyledContainer>
            <div className="container">
  <div className="wmp">
    <div className="top-bar">
      <div className="title">
        <img src="https://canto.io/assets/logo-a672d2b0.svg" />
        <h1>Canto Cluster Registry </h1>
      </div>
      <div className="buttons">
        <div className="button">
          <i className="fa-regular fa-window-minimize"></i>
        </div>
        <div className="button">
          <i className="fa-regular fa-window-maximize"></i>
        </div>
        <div className="button">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>

    <div className="video-container">
        
    <ConnectWallets/>
     
    </div>
  
    <div className="bottom-bar">
    </div>
  </div>
</div>

        </StyledContainer>
    )
}



const StyledContainer = styled.div`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
  }
  body {
    overflow: hidden;
    font-family: "Microsoft Sans Serif", sans-serif;
    font-size: 13px;
    box-sizing: border-box;
  }
  a {
    color: black;
    text-decoration: none;
  }
  .container {
    position: absolute; 
    top: 0;            
    left: 0;             
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.06)
    );
    background-size: 100% 3px, 15px 100%;
    z-index: 1;
    animation: flicker 100ms infinite;
  }
  .wmp {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 80%;
    height: 80%;
    min-width: 500px;
    background-color: #c0c0c0;
    border-top: 3px solid #efefef;
    border-left: 3px solid #efefef;
    border-right: 3px solid black;
    border-bottom: 3px solid black;
    padding: 5px;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    height: 30px;
    background: rgb(0, 0, 128);
    background: linear-gradient(
        90deg,
        rgba(0, 128, 0, 1) 0%,      
        rgba(57, 255, 20, 1) 100%  
      );
    padding: 5px;
  
    & .title {
      display: flex;
      align-items: center;
  
      h1 {
        margin: 0;
        margin-left: 5px;
        font-weight: bold;
        color: white;
      }
    }
    & .buttons {
      display: flex;
      align-items: center;
      height: 100%;
    }
  
    & .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 25px;
      background-color: #c0c0c0;
      border-top: 3px solid #efefef;
      border-left: 3px solid #efefef;
      border-right: 3px solid black;
      border-bottom: 3px solid black;
      cursor: pointer;
    }
  }
  .video-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin-top: 5px;
  }
  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efefef;
    background-size: 100% 3px, 15px 100%;
    z-index: 1;
    animation: flicker 100ms infinite;
  }
  .video-overlay:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    opacity: 0.6;
    z-index: 2;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    object-fit: cover;
  }
  .bottom-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-top: 5px;
  
    & .progress-bar {
      position: relative;
      width: 100%;
      height: 15px;
      border: 3px solid #efefef;
      border-top: 3px solid black;
    }
    & .progress-perc {
      position: absolute;
      top: -7px;
      left: 15px;
      width: 10px;
      height: 22px;
      background-color: #c0c0c0;
      border-bottom: 3px solid black;
      border-right: 3px solid black;
      border-top: 3px solid #efefef;
      border-left: 3px solid #efefef;
      cursor: pointer;
    }
    & .buttons {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 15px;
    }
    & .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 98%;
      cursor: pointer;
      color: #808080;
    }
    & .audio {
      display: flex;
      align-items: center;
      margin-left: 15px;
      cursor: pointer;
    }
    & .slider {
      position: relative;
      border-bottom: 2px solid #efefef;
      border-right: 2px solid #efefef;
      margin-left: 5px;
      width: 70px;
      height: 25px;
      background: linear-gradient(
        to bottom right,
        transparent 0%,
        transparent 50%,
        #adadad 50%,
        #c0c0c0 100%
      );
    }
  
    & .audio-perc {
      position: absolute;
      top: 0;
      left: 15px;
      width: 10px;
      height: 110%;
      background-color: #c0c0c0;
      border-bottom: 3px solid black;
      border-right: 3px solid black;
      border-top: 3px solid #efefef;
      border-left: 3px solid #efefef;
      cursor: pointer;
    }
  }
  `