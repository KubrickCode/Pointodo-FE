import axios from "axios";
import { useState } from "react";
import { FC } from "react";

const App: FC = () => {
  const [message, setMessage] = useState("");
  const onRequest = async () => {
    const result = await axios.get(window.location.origin + "/api");
    setMessage(result.data);
  };

  return (
    <>
      <div>
        <button onClick={onRequest}>서버에 메시지 요청</button>
        <div>{message}</div>
      </div>
    </>
  );
};

export default App;
