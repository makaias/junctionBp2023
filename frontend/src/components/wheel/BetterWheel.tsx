import WheelComponent from "react-wheel-of-prizes-react-upgrade";

const VERY_SIZE = 300;
export const BetterWheel = (props: any) => {
  const size = props.size;
  const scale = size / VERY_SIZE / 2;
  const transformPercent = (1 - scale) / (scale) * 100 / 2

  const transform = `scale(${scale}, ${scale}) translate(-${transformPercent}%, -${transformPercent}%)`
  console.log({scale, size, transform})
  return (
    <div className="overflow-hidden" style={{ width: size, height: size }}>
      <div
        style={{
          transform: transform,
          width: size / scale,
          height: size / scale,
          overflow: "hidden",
        }}
      >
        <WheelComponent {...props} size={250} />
      </div>
    </div>
  );
};
