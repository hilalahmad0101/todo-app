import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Avatar,
  Button,
  CircularProgress,
  InputBase,
  Stack,
  styled,
} from "@mui/material";
import axios from "axios";
import { apiBase, userToken } from "../../config";

function CommentBox({ imgCard, urn, onSubmit }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // const userString = localStorage.getItem("user");
  // const user = JSON.parse(userString);
  // const userToken = user?.token;

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const resizeBase64Image = async (base64, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = base64;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };

      img.onerror = reject;
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const resizedImageBlob = await resizeBase64Image(imgCard, 800, 600);
      const formData = new FormData();
      formData.append("content", comment);
      formData.append("modelId", urn);
      formData.append("image", resizedImageBlob, "resizedImage.jpg");
      console.log(userToken);
      const response = await axios.post(`${apiBase}/comment/create`, formData, {
        headers: {
          "x-access-token": userToken,
        },
      });

      // Pass the new comment data to the parent component to update the state
      onSubmit({
        id: response.data.id,
        image: `${imgCard}`, // Construct the image URL if necessary
        content: comment,
        name: "Current User", // Replace with actual user data if available
      });

      setComment("");
      setLoading(false);
    } catch (error) {
      console.error("Error posting comment:", error.message);
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, background: "#fff", mt: 1 }}>
      <CardMedia
        component="img"
        alt="Comment Image"
        height="140"
        image={imgCard}
      />
      <CardContent sx={{ overflow: "auto" }}>
        <Stack direction="row" spacing={1}>
          <Avatar>
            {JSON.parse(localStorage.getItem("user"))
              ?.name.charAt(0)
              .toUpperCase()}
          </Avatar>
          <InputBase
            multiline
            sx={{ ml: 1, flex: 1, color: "#000", marginTop: "16px" }}
            placeholder="Type your comment..."
            inputProps={{ "aria-label": "type your comment" }}
            value={comment}
            onChange={handleCommentChange}
          />
        </Stack>
        <BoxEnd>
          <Button variant="outlined" color="secondary" onClick={handleSubmit}>
            {loading ? <CircularProgress /> : "Comment"}
          </Button>
        </BoxEnd>
      </CardContent>
    </Card>
  );
}

const BoxEnd = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
});

export default CommentBox;
