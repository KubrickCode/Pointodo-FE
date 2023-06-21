import axios from "axios";
import { useState } from "react";
import { FC } from "react";

const host = import.meta.env.VITE_SERVER_HOST;

const App: FC = () => {
  const [message, setMessage] = useState("");
  const onRequest = async () => {
    const result = await axios.get(host);
    setMessage(result.data);
  };

  return (
    <>
      <div>
        <button onClick={onRequest}>서버에 요청</button>
        <div>{message}</div>
      </div>
    </>
  );
};

export default App;
