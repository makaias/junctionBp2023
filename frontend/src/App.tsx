import { useState } from "react";
import { useSocketEvent } from "./hooks/useSocket";

function App() {
  const [userTurn, setUserTurn] = useState<boolean>(false);
  // const io = useSocket()
  useSocketEvent("connect", () => console.log("REEEEEEE"));
  // const messageHandler = () => {
  //   console.log('Do stuff here :)')
  //   io.emit('execute', { messages: null})
  // }

  return (
    <div className="h-screen w-screen flex gap-8 items-center text-blue-900">
      <div className="flex flex-col w-full items-center">
        <div className="p-4 mb-20 text-3xl font-bold rounded-xl border-2 border-white bg-blue-200">
          {!userTurn ? "Your turn" : "Waiting for response"}
        </div>
        <div className="w-full flex justify-center">
          <img src="/man.png" alt="man" className="w-60 h-60 mx-4" />
          <div className="relative w-full max-w-2xl bg-blue-200 p-4 border-white border-2 rounded-xl opacity-90 h-40">
            <div className="absolute top-[-48px] left-[-32px] border-white border-2 opacity-100 bg-blue-200 p-4">
              Name
            </div>
            <div>
              {userTurn ? (
                <p>Reeee</p>
              ) : (
                <div className="flex flex-col space-between">
                  <textarea className="resize-none flex-1 w-full h-full" rows={4} />
                  <button className="p-4">Send</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="bg-blue-200 border-2 border-white p-4 px-20 rounded-xl w-fit hover:bg-blue-400 duration-200"
          onClick={() => {
            setUserTurn(!userTurn);
          }}
          // disabled={!userTurn}
        >
          Respond
        </button>
      </div>
    </div>
  );
}

export default App;
