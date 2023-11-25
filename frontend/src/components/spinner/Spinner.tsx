interface SpinnerProps {
message?: string
}

export const Spinner = ({message = "Loading..."}: SpinnerProps) => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div>
        <div className="animate-spin h-10 mx-auto w-10 rounded-full border-black border-2 border-x-0"></div>
        <span>{message}</span>
      </div>
    </div>
  );
};
