// import React from "react";
// // import "./index.css";
// import { CanvasProvider } from "./CanvasContext";
// import { Canvas } from "./Canvas";

// export default function CustomCanvas() {
//   return (
//     <CanvasProvider>
//       <Canvas>
//         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni ex nulla
//         possimus corrupti harum nobis laudantium, nesciunt placeat! Quae quasi
//         non quas eum! Dolor non assumenda, voluptatum quaerat quo reprehenderit.
//       </Canvas>
//     </CanvasProvider>
//   );
// }

import React from "react";
import { CanvasProvider } from "./CanvasContext";
import { Canvas } from "./Canvas";
import ClearCanvasButton from "./ClearCanvasButton";

export default function CustomCanvas() {
  const imageUrl =
    "https://cdn.pixabay.com/photo/2024/07/26/01/58/bird-8922501_1280.jpg"; // This URL can be dynamic

  return (
    <CanvasProvider imageUrl={imageUrl}>
      <Canvas />
      {/* <ClearCanvasButton /> */}
    </CanvasProvider>
  );
}
