export const Progress = () => {
  return (
    <div className="w-full flex ">
      <div className="h-5 w-full bg-blue-200 dark:bg-neutral-600">
        <div className="h-5 bg-red-200" style={{ width: "25%" }}></div>
      </div>
    </div>
  );
};
