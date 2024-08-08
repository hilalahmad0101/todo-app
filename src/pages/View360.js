import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useScreenshot } from "use-react-screenshot";
import CommentBox from "../common/Comment";
import EditImage from "../common/EditImage";
import axios from "axios";
import { apiBase, userToken } from "../../config";
import DisplayComment from "../common/DisplayComment";
import Model360Selector from "../components/Model360Selector";
import { useQuery } from "@tanstack/react-query";
import LogoutBtn from "../common/LogoutBtn";
export default function View360() {
  const [doComment, setDoComment] = useState(false);
  const [commentArray, setCommentArray] = useState([]);
  const [image, takeScreenshot] = useScreenshot();
  const [editedImage, setEditedImage] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const viewerRef = useRef(null);
  const canvasRef = useRef(null);

  const [open, setOpen] = useState(false);
  const handleModelSelect = (url) => {
    console.log(url);
    setUrl(url);
  };

  const getImage = () => {
    setDoComment((prev) => !prev);
    // takeScreenshot();
    takeScreenshot(viewerRef.current);
    setOpen(true);
  };

  const handleNewComment = (newComment) => {
    setCommentArray((prevComments) => [newComment, ...prevComments]);
    setDoComment(false); // Optionally reset the comment box after adding
  };

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .post(
  //       apiBase + "/comment/",

  //       {
  //         modelId: url,
  //       },
  //       {
  //         headers: {
  //           "x-access-token": `${userToken}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setCommentArray(res.data);
  //       console.log("this is comment on the url", res.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // }, [url]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", url],
    queryFn: () =>
      axios
        .post(
          `${apiBase}/comment/`,
          { modelId: url },
          { headers: { "x-access-token": userToken } }
        )
        .then((res) => res.data),
    enabled: !!url, // Only run query if url is not empty
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCommentArray(data);
    }
  }, [data]);

  console.log("isError", data);

  return (
    <>
      <Box
        display={"flex"}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
          borderBottom: 1,
        }}
      >
        <Box>
          <LogoutBtn />
        </Box>
        <Box>
          <Model360Selector onSelect={handleModelSelect} />
        </Box>
      </Box>
      <Box sx={{ height: "100vh" }}>
        <div style={{ display: "flex", height: "100vh", position: "relative" }}>
          <EditImage
            open={open}
            setOpen={setOpen}
            EditImage={image}
            canvasRef={canvasRef}
            setEditedImage={setEditedImage} // Pass the callback to set edited image
          />
          <div
            style={{
              width: "20%",
              height: "95vh",
              position: "relative",
              overflow: "auto",
            }}
          >
            <Box
              display="flex"
              mx=""
              my=""
              sx={{ m: 1, flexDirection: "column", overflow: "auto" }}
            >
              {doComment ? (
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setEditedImage(image);
                    setDoComment(false);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={getImage}
                >
                  Add Comment
                </Button>
              )}
              {doComment && (
                <CommentBox
                  imgCard={editedImage || image} // Use edited image if available, else use original screenshot
                  urn={url}
                  onSubmit={handleNewComment}
                />
              )}
              {isLoading ? (
                <Box
                  display={"flex"}
                  sx={{ alignItems: "center", justifyContent: "center", mt: 2 }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {commentArray.map((comment, index) => (
                    <Box key={index}>
                      <DisplayComment
                        imgCard={comment.image}
                        content={comment.content}
                        userName={comment.name}
                        replyComment={comment}
                        commentId={comment.id}
                        author={comment.author?.name}
                      />
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </div>
          <div style={{ width: "80%", height: "95vh", position: "relative" }}>
            <iframe
              ref={viewerRef}
              src={url}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="360 Model Viewer"
            />
          </div>
        </div>
      </Box>
    </>
  );
}
