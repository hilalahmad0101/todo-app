import React, { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { styled, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useScreenshot } from "use-react-screenshot";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditImage({
  open,
  setOpen,
  EditImage,
  setEditedImage,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [image, takeScreenshot] = useScreenshot();
  const drawingRef = useRef(null);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleSaveImage = async () => {
    const dataURL = await takeScreenshot(drawingRef.current);
    console.log("image", dataURL);
    setEditedImage(dataURL);
    setOpen(false);
    setLines([]);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            ref={drawingRef}
            sx={{
              backgroundImage: `url(${EditImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: window.innerWidth / 2.5,
              height: window.innerHeight / 2,
            }}
          >
            <Stage
              ref={stageRef}
              width={window.innerWidth / 2.5}
              height={window.innerHeight / 2}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </Box>
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            style={{ marginTop: 20, padding: 10, width: "50%" }}
          >
            <option value="pen">Pen</option>
            <option value="eraser">Eraser</option>
          </select>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color="success"
            onClick={handleSaveImage}
          >
            Save changes
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setLines([])}
          >
            Clear
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
