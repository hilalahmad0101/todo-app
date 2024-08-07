// import React from "react";
// import { useCanvas } from "./CanvasContext";

// export const ClearCanvasButton = () => {
//   const { clearCanvas } = useCanvas();

//   return <button onClick={clearCanvas}>Clear</button>;
// };

// ClearCanvasButton.jsx
import React from "react";
import { useCanvas } from "./CanvasContext";
import Button from "@mui/material/Button";

const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas();

  return (
    <Button variant="contained" color="warning" onClick={clearCanvas}>
      Clear
    </Button>
  );
};

export default ClearCanvasButton;
