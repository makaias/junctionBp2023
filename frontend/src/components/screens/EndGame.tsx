export const EndGame = () => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        backgroundImage: 'url("/endgame_background.jpg")',
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <div className="flex flex-col justify-center">
        <h1 className="p-4 mb-10 text-3xl font-bold">Game Over</h1>
        <button className="p-4 bg-blue-200 rounded-xl border-2 border-white">
          Back to home
        </button>
      </div>
    </div>
  );
};
