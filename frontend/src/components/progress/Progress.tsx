interface ProgressProps {
  value: number | undefined;
}

export const Progress = ({ value }: ProgressProps) => {
  return (
    <div className="w-full max-w-xs flex rounded-xl">
      <div className="h-full w-full bg-gray-700 rounded-xl">
        <div
          className={`h-full rounded-xl ${
            value === undefined
              ? "bg-red-500"
              : value < 33
                ? "bg-green-500"
                : value < 66
                  ? "bg-yellow-500"
                  : "bg-red-500"
          }`}
          style={{ width: `${value !== undefined ? 100 - value : 0}%` }}
        ></div>
      </div>
    </div>
  );
};
