import { Puff } from "react-loading-icons";

function PlanningWait(props) {
  const handleClick = () => {
    props.setIsReady(false);
    props.socket.removeAllListeners("check-ready");
  };

  return (
    <div className="modal-outer">
      <div className="modal-inner">
        <h2>Waiting for opponent to finish planning.</h2>
        <Puff height="10rem" width="10rem" />
        <button className="lobby-btn" onClick={handleClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default PlanningWait;
