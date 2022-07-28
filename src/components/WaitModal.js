import { Puff } from "react-loading-icons";

function WaitModal(props) {
  const handleClick = () => {
    props.setState(false);
    props.socket.removeAllListeners(props.listenerEvent);
  };

  return (
    <div className="modal-outer">
      <div className="modal-inner">
        <h2>Waiting for opponent</h2>
        <Puff height="10rem" width="10rem" />
        <button className="lobby-btn" onClick={handleClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default WaitModal;
