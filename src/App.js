import React, { useRef, useState } from "react";
import { extend, Canvas, useFrame } from "react-three-fiber";
import { range } from "lodash";

import { Text } from "troika-three-text";

extend({ Text });
function App() {
  return (
    <div className="App" style={{ height: "600px" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Rad position={[0, 0, -5]} />
      </Canvas>
    </div>
  );
}

function Rad(props) {
  let group = useRef();

  const [spinRate, setSpinRate] = useState(0);

  useFrame(() => {
    if (spinRate < 0.0001) {
      setSpinRate(0);
    } else {
      group.current.rotation.z = group.current.rotation.z += spinRate;
      setSpinRate(spinRate * 0.992);
    }
  });

  const handleClick = () => {
    setSpinRate(0.2);
    console.log("click");
  };

  const nr_colors = 10;
  const colors = ["orange", "forestgreen", "cyan", "yellow", "#ff71ff"];
  const fullLength = 2 * Math.PI;
  const segmentInRadians = fullLength / nr_colors;
  return (
    <group ref={group} onClick={spinRate === 0 && handleClick}>
      {range(nr_colors).map((idx) => {
        return (
          <mesh key={idx} {...props}>
            <circleGeometry
              args={[5, 8, idx * segmentInRadians, segmentInRadians]}
            />
            <meshStandardMaterial color={colors[idx % 5]} />
            <TextObject idx={idx} segmentInRadians={segmentInRadians} />
          </mesh>
        );
      })}
    </group>
  );
}

function TextObject(props) {
  return (
    <text
      position-z={2}
      fontSize={0.3}
      anchorY="middle"
      rotation={[0, 0, (props.idx + 0.5) * props.segmentInRadians, 0]}
      text={"                                 SPIN  " + props.idx}
    >
      <meshPhongMaterial attach="material" color={"#000000"} />
    </text>
  );
}
export default App;
