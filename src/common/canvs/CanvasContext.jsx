// import React, { useContext, useRef, useState } from "react";

// // enabling drawing on the blank canvas
// const CanvasContext = React.createContext();

// export const CanvasProvider = ({ children }) => {
//   const [isDrawing, setIsDrawing] = useState(false);
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);

//   //defining width & height of the canvas
//   const prepareCanvas = () => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 2;
//     canvas.height = window.innerHeight * 2;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;

//     // defining the thickness and colour of our brush
//     const context = canvas.getContext("2d");
//     context.scale(2, 2);
//     context.lineCap = "round";
//     context.strokeStyle = "black";
//     context.lineWidth = 5;
//     contextRef.current = context;
//   };

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const finishDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) {
//       return;
//     }
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   //once the canvas is cleared it return to the default colour
//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.fillStyle = "white";
//     context.fillRect(0, 0, canvas.width, canvas.height);
//   };

//   return (
//     <CanvasContext.Provider
//       value={{
//         canvasRef,
//         contextRef,
//         prepareCanvas,
//         startDrawing,
//         finishDrawing,
//         clearCanvas,
//         draw,
//       }}
//     >
//       {children}
//     </CanvasContext.Provider>
//   );
// };

// export const useCanvas = () => useContext(CanvasContext);

// import React, { useContext, useRef, useState, useEffect } from "react";

// const CanvasContext = React.createContext();

// export const CanvasProvider = ({ children, imageUrl }) => {
//   const [isDrawing, setIsDrawing] = useState(false);
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);

//   const prepareCanvas = () => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 2;
//     canvas.height = window.innerHeight * 2;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;

//     const context = canvas.getContext("2d");
//     context.scale(2, 2);
//     context.lineCap = "round";
//     context.strokeStyle = "black";
//     context.lineWidth = 5;
//     contextRef.current = context;

//     if (imageUrl) {
//       const image = new Image();
//       image.src = imageUrl;
//       image.onload = () => {
//         const imgWidth = 300;
//         const imgHeight = 300;
//         const canvasWidth = 300;
//         const canvasHeight = 300;

//         // Calculate the aspect ratio
//         const imgAspectRatio = imgWidth / imgHeight;
//         const canvasAspectRatio = canvasWidth / canvasHeight;

//         let drawWidth, drawHeight, offsetX, offsetY;

//         if (imgAspectRatio > canvasAspectRatio) {
//           // Image is wider than canvas
//           drawWidth = canvasWidth;
//           drawHeight = canvasWidth / imgAspectRatio;
//           offsetX = 0;
//           offsetY = (canvasHeight - drawHeight) / 2;
//         } else {
//           // Image is taller than canvas
//           drawWidth = canvasHeight * imgAspectRatio;
//           drawHeight = canvasHeight;
//           offsetX = (canvasWidth - drawWidth) / 2;
//           offsetY = 0;
//         }

//         context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
//       };
//     }
//   };

//   useEffect(() => {
//     prepareCanvas();
//   }, [imageUrl]); // Re-run when imageUrl changes

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const finishDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) {
//       return;
//     }
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.fillStyle = "white";
//     context.fillRect(0, 0, canvas.width, canvas.height);
//   };

//   return (
//     <CanvasContext.Provider
//       value={{
//         canvasRef,
//         contextRef,
//         prepareCanvas,
//         startDrawing,
//         finishDrawing,
//         clearCanvas,
//         draw,
//       }}
//     >
//       {children}
//     </CanvasContext.Provider>
//   );
// };

// export const useCanvas = () => useContext(CanvasContext);

// import React, { useContext, useRef, useState, useEffect } from "react";

// const CanvasContext = React.createContext();

// export const CanvasProvider = ({ children, imageUrl }) => {
//   const [isDrawing, setIsDrawing] = useState(false);
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);

//   const prepareCanvas = () => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 2;
//     canvas.height = window.innerHeight * 2;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;

//     const context = canvas.getContext("2d");
//     context.scale(2, 2);
//     context.lineCap = "round";
//     context.strokeStyle = "black";
//     context.lineWidth = 5;
//     contextRef.current = context;

//     if (imageUrl) {
//       const image = new Image();
//       image.src = imageUrl;
//       image.onload = () => {
//         const imgWidth = image.width;
//         const imgHeight = image.height;
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;

//         // Calculate the aspect ratio
//         const imgAspectRatio = imgWidth / imgHeight;
//         const canvasAspectRatio = canvasWidth / canvasHeight;

//         let drawWidth, drawHeight, offsetX, offsetY;

//         if (imgAspectRatio > canvasAspectRatio) {
//           // Image is wider than canvas
//           drawWidth = canvasWidth;
//           drawHeight = canvasWidth / imgAspectRatio;
//           offsetX = 0;
//           offsetY = (canvasHeight - drawHeight) / 2;
//         } else {
//           // Image is taller than canvas
//           drawWidth = canvasHeight * imgAspectRatio;
//           drawHeight = canvasHeight;
//           offsetX = (canvasWidth - drawWidth) / 2;
//           offsetY = 0;
//         }

//         context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
//       };
//     }
//   };

//   useEffect(() => {
//     prepareCanvas();
//   }, [imageUrl]); // Re-run when imageUrl changes

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const finishDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) {
//       return;
//     }
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.fillStyle = "white";
//     context.fillRect(0, 0, canvas.width, canvas.height);
//   };

//   return (
//     <CanvasContext.Provider
//       value={{
//         canvasRef,
//         contextRef,
//         prepareCanvas,
//         startDrawing,
//         finishDrawing,
//         clearCanvas,
//         draw,
//       }}
//     >
//       {children}
//     </CanvasContext.Provider>
//   );
// };

// export const useCanvas = () => useContext(CanvasContext);

import React, { useContext, useRef, useState, useEffect } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children, imageUrl }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    const fixedSize = 500;
    canvas.width = fixedSize * 2;
    canvas.height = fixedSize * 2;
    canvas.style.width = `${fixedSize}px`;
    canvas.style.height = `${fixedSize}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 5;
    contextRef.current = context;

    if (imageUrl) {
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const aspectRatio = image.width / image.height;
        let drawWidth = fixedSize * aspectRatio;
        let drawHeight = fixedSize;
        if (aspectRatio > 1) {
          drawWidth = fixedSize;
          drawHeight = fixedSize / aspectRatio;
        }
        const offsetX = (fixedSize - drawWidth) / 2;
        const offsetY = (fixedSize - drawHeight) / 2;
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        setImageLoaded(true); // Set image loaded to true
      };
    }
  };

  useEffect(() => {
    prepareCanvas();
  }, [imageUrl]);

  const startDrawing = ({ nativeEvent }) => {
    if (!imageLoaded) return; // Prevent drawing if image not loaded
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !imageLoaded) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <CanvasContext.Provider
      value={{
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        clearCanvas,
        canvasRef,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
