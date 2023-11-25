interface ProgressProps {
  value: number | undefined;
}

export const Progress = ({ value }: ProgressProps) => {
  return (
    <div className="w-full flex">
      <div className="h-5 w-full bg-blue-200">
        <div
          className={`h-5 ${
            value === undefined
              ? "bg-red-200"
              : value < 33
                ? "bg-green-200"
                : value < 66
                  ? "bg-yellow-200"
                  : "bg-red-200"
          }`}
          style={{ width: `${value !== undefined ? 100 - value : 0}%` }}
        ></div>
      </div>
    </div>
  );
};
