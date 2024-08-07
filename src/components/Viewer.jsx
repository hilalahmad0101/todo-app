import React, { useEffect, useRef, useState } from "react";
import { apiBase, userToken } from "../../config";
import Box from "@mui/material/Box";
import CommentBox from "../common/Comment";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useScreenshot } from "use-react-screenshot";
import EditImage from "../common/EditImage";
import DisplayComment from "../common/DisplayComment";

const Viewer = ({ urn }) => {
  const viewerRef = useRef(null);
  const [viewer, setViewer] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [doComment, setDoComment] = useState(false);
  const [commentArray, setCommentArray] = useState([]);
  const [image, takeScreenshot] = useScreenshot();
  const [editedImage, setEditedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef(null);
  const [open, setOpen] = useState(false);

  const getImage = () => {
    setDoComment((prev) => !prev);
    takeScreenshot(viewerRef.current);
    setEditedImage("");
    setOpen(true);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const resp = await fetch(apiBase + "/api/auth/token");
        if (!resp.ok) {
          throw new Error(await resp.text());
        }
        const { access_token } = await resp.json();
        setAccessToken(access_token);
      } catch (err) {
        console.error("Error fetching access token:", err);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken && viewerRef.current && !viewer) {
      const options = {
        env: "AutodeskProduction",
        getAccessToken: (onSuccess) => {
          if (accessToken) {
            onSuccess(accessToken, 3600);
          } else {
            console.error("Access token is not available.");
          }
        },
      };

      Autodesk.Viewing.Initializer(options, () => {
        const viewerInstance = new Autodesk.Viewing.GuiViewer3D(
          viewerRef.current
        );
        viewerInstance.start();
        setViewer(viewerInstance);
      });
    }
  }, [accessToken, viewer]);

  useEffect(() => {
    if (viewer && urn) {
      Autodesk.Viewing.Document.load(
        `urn:${urn}`,
        (doc) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, defaultModel);
          fetchComments(urn); // Fetch comments after model is loaded
        },
        console.error
      );
    }
  }, [viewer, urn]);

  const fetchComments = (modelUrn) => {
    setLoading(true);
    axios
      .post(
        `${apiBase}/comment/`,
        {
          modelId: modelUrn,
        },
        {
          headers: {
            "x-access-token": `${userToken}`,
          },
        }
      )
      .then((res) => {
        setCommentArray(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // const handleNewComment = (newComment) => {
  //   setCommentArray((prevComments) => [newComment, ...prevComments]);
  //   setDoComment(false);
  // };

  const handleNewComment = (newComment) => {
    // Ensure new comments are added as top-level comments
    setCommentArray((prevComments) => [...prevComments, newComment]);
    setDoComment(false);
  };

  console.log("commentArray", commentArray);

  return (
    <>
      <div style={{ display: "flex", height: "100vh", position: "relative" }}>
        <EditImage
          open={open}
          setOpen={setOpen}
          EditImage={image}
          canvasRef={canvasRef}
          setEditedImage={setEditedImage}
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
                imgCard={editedImage || image}
                urn={urn}
                onSubmit={handleNewComment}
              />
            )}

            {loading ? (
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
        <div
          ref={viewerRef}
          style={{ width: "80%", height: "95vh", position: "relative" }}
        ></div>
      </div>
    </>
  );
};

export default Viewer;
