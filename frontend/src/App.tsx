import { useSocket, useSocketEvent } from "./hooks/useSocket";

function App() {
  const io = useSocket()
  useSocketEvent('connect', () => console.log('REEEEEEE'))
  const messageHandler = () => {
    console.log('Do stuff here :)')
    io.emit('execute', { messages: null})
  }

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
