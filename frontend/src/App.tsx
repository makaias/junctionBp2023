import { useState } from "react";
import { useSocketEvent } from "./hooks/useSocket";
import { Modal } from "./components/modal/Modal";
import WheelComponent from "react-wheel-of-prizes-react-upgrade";
import { NewGame } from "./components/screens/NewGame";
import { InGame } from "./components/screens/InGame";
// import "react-wheel-of-prizes-react-upgrade/dist/index.css";

function App() {
  const [userTurn, setUserTurn] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [gameState, setGameState] = useState<'NEW_GAME' | 'IN_GAME' | 'END_GAME'>('NEW_GAME')
  // const io = useSocket()
  useSocketEvent("connect", () => console.log("REEEEEEE"));
  // const messageHandler = () => {
  //   console.log('Do stuff here :)')
  //   io.emit('execute', { messages: null})
  // }

  const segments = [
    "Rubber burning Robert",
    "Sarah the Scatterer",
    "Rubber burning Robert",
    "Sarah the Scatterer",
    "Rubber burning Robert",
    "Sarah the Scatterer",
    "Rubber burning Robert",
    "Sarah the Scatterer",
  ];
  const segColors = [
    "#000000",
    "#FF9000",
    "#000000",
    "#FF9000",
    "#000000",
    "#FF9000",
    "#000000",
    "#FF9000",
  ];
  const onFinished = (winner: any) => {
    console.log(winner);
  };

  return (
  // <NewGame />
  // <EndGame />
  <InGame />
    // <div
    //   className="flex flex-col h-screen w-screen gap-8"
    //   style={{
    //     backgroundImage: 'url("/background.jpg")',
    //     backgroundSize: "cover",
    //     boxSizing: "border-box",
    //   }}
    // >
    //   <div className="flex w-full justify-center p-4">
    //     <button
    //       className="p-4 bg-blue-200 rounded-xl border-2 border-white"
    //       onClick={() => setModal(true)}
    //     >
    //       New game
    //     </button>
    //   </div>
    //   <div className="h-full w-screen flex gap-8 items-center text-blue-900">
    //     <div className="flex flex-col w-full items-center">
    //       <div className="p-4 mb-20 text-3xl font-bold rounded-xl border-2 border-white bg-blue-200">
    //         {!userTurn ? "Your turn" : "Waiting for response"}
    //       </div>
    //       <div className="w-full flex justify-center">
    //         <img src="/man.png" alt="man" className="w-60 h-60 mx-4" />
    //         <div className="relative w-full max-w-2xl bg-blue-200 p-4 border-white border-2 rounded-xl opacity-90 h-40">
    //           <div className="absolute top-[-48px] left-[-32px] border-white border-2 opacity-100 bg-blue-200 p-4">
    //             Name
    //           </div>
    //           <div>
    //             {userTurn ? (
    //               <p>Reeee</p>
    //             ) : (
    //               <div className="flex flex-col space-between">
    //                 <textarea
    //                   className="resize-none flex-1 w-full h-full"
    //                   rows={4}
    //                 />
    //                 <button className="p-4">Send</button>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       <button
    //         className="bg-blue-200 border-2 border-white p-4 px-20 rounded-xl w-fit hover:bg-blue-400 duration-200"
    //         onClick={() => {
    //           setUserTurn(!userTurn);
    //         }}
    //         // disabled={!userTurn}
    //       >
    //         Respond
    //       </button>
    //     </div>
    //   </div>
    //   {modal && (
    //     <Modal callback={() => setModal(false)}>
    //       <div>
    //         <div className="flex w-full justify-center">
    //           <h1 className="text-2xl">Your next opponent:</h1>
    //         </div>
    //         <WheelComponent
    //           segments={segments}
    //           segColors={segColors}
    //           winningSegment="won 10"
    //           onFinished={(winner: any) => onFinished(winner)}
    //           primaryColor="black"
    //           contrastColor="white"
    //           buttonText="Spin"
    //           isOnlyOnce={false}
    //           size={260}
    //           upDuration={50}
    //           downDuration={500}
    //           fontFamily="Arial"
    //         />
    //       </div>
    //     </Modal>
    //   )}
    // </div>
  );
}

export default App;
