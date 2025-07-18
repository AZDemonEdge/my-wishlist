import styled from 'styled-components';

const ProgressBar = ({percent}) => {
    return (
        <StyledWrapper>
            <div className="container">
                <div className="skill-box">
                    <span className="title">Progreso</span>
                    <div className="skill-bar">
                        <span className="skill-per wish" style={{width : percent + "%"}}>
                            <span className="tooltip">{percent}%</span>
                        </span>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .container {
    position: absolute;
    width: 90%;
    bottom: 1%;
    left: 5%;
    border-radius: 7px;
  }

  .container .skill-box {
    width: 100%;
    margin: 0;
  }

  .skill-box .title {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-left: 20px;
    color: #fff;
  }

  .skill-box .skill-bar {
    height: 8px;
    width: 100%;
    border-radius: 6px;
    margin-top: 6px;
    background: rgba(0,0,0,0.1);
  }

  .skill-bar .skill-per {
    position: relative;
    display: block;
    height: 100%;
    width: 90%;
    border-radius: 6px;
    background: #44e30f;
    animation: progress 0.4s ease-in-out forwards;
    opacity: 0;
  }

  .skill-per.wish {
    width: 0%;
    animation-delay: 0.1s;
  }

  @keyframes progress {
    0% {
      width: 0;
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }

  .skill-per .tooltip {
    position: absolute;
    right: -14px;
    top: -28px;
    font-size: 9px;
    font-weight: 500;
    color: #fff;
    padding: 2px 6px;
    border-radius: 3px;
    background: #44e30f;
    z-index: 1;
  }

  .tooltip::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    height: 10px;
    width: 10px;
    z-index: -1;
    background-color: #44e30f;
    transform: translateX(-50%) rotate(45deg);
  }`;

export default ProgressBar;
