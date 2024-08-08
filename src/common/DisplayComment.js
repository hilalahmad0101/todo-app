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
  Typography,
} from "@mui/material";
import axios from "axios";
import { apiBase, userToken } from "../config";
import moment from "moment";

function DisplayComment({
  imgCard,
  content,
  userName,
  replyComment,
  commentId,
  author,
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(replyComment.replies || []);
  const [loading, setLoading] = useState(false);
  // Ensure there's a slash between apiBase and imgCard for correct URL construction
  const imageUrl = `${apiBase + imgCard}`;
  console.log("imageUrl", imageUrl);
  console.log("replyComment", moment(replyComment.createdAt).fromNow());

  const handleReplySubmit = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        apiBase + "/comment/reply",
        {
          commentId: commentId,
          content: replyText,
        },
        {
          headers: {
            "x-access-token": userToken,
          },
        }
      );
      const newReply = {
        id: result.data.id,
        content: replyText,
        author: {
          name: `${JSON.parse(localStorage.getItem("user"))
            ?.name.charAt(0)
            .toUpperCase()}`,
        },
      };

      setReplies((prevReplies) => [...prevReplies, newReply]);

      console.log("comment submitted", result.data);
      setReplyOpen(false); // Close the reply box after submission
      setReplyText(""); // Clear the reply input
      setLoading(false);
    } catch (error) {
      console.error("Error submitting reply:", error);
      setLoading(false);
    }
  };
  console.log(
    "commen by",
    JSON.parse(localStorage.getItem("user"))?.name.charAt(0).toUpperCase(),
    author
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        background: "#fff",
        mt: 1,
      }}
    >
      <CardMedia
        component="img"
        alt="Comment Image"
        height="140"
        image={imageUrl} // Use the corrected imageUrl here
      />
      <CardContent sx={{ overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {replyOpen ? (
            <>
              <Stack direction="row" spacing={1}>
                <Avatar sx={{ width: 24, height: 24 }}>
                  {author
                    ? author.charAt(0).toUpperCase()
                    : JSON.parse(localStorage.getItem("user"))
                        ?.name.charAt(0)
                        .toUpperCase()}
                </Avatar>
                <InputBase
                  multiline
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  sx={{ ml: 1, flex: 1, color: "#000", marginTop: "16px" }}
                  placeholder="Type your reply..."
                  inputProps={{ "aria-label": "type your reply" }}
                />
              </Stack>
              <BoxEnd sx={{ gap: 1 }}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    setReplyOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReplySubmit}
                >
                  {loading ? <CircularProgress /> : "Reply"}
                </Button>
              </BoxEnd>
            </>
          ) : (
            <>
              <Button
                sx={{ mt: 1 }}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setReplyOpen(true);
                }}
              >
                Reply
              </Button>
            </>
          )}

          <ReplyView mleft={0}>
            <Avatar sx={{ width: 24, height: 24 }}>
              {author
                ? author?.charAt(0).toUpperCase()
                : JSON.parse(localStorage.getItem("user"))
                    ?.name.charAt(0)
                    .toUpperCase()}
            </Avatar>
            <Typography
              variant="h5"
              color="initial"
              sx={{
                width: "80%", // This might need adjustment based on your design needs
                whiteSpace: "normal", // Allow text to wrap
                overflow: "hidden", // Hide any overflowing text
                textOverflow: "ellipsis", // Use ellipsis for overflowed text
              }}
            >
              {content}
            </Typography>
          </ReplyView>
          <BoxEnd>
            <Typography variant="body1" color="secondary">
              {moment(replyComment.createdAt).fromNow()}
            </Typography>
          </BoxEnd>
          {replies.map((reply, index) => (
            <React.Fragment key={index}>
              <ReplyView mleft={20}>
                <Avatar sx={{ width: 24, height: 24 }}>
                  {(reply.author?.name || "U").charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                  variant="h5"
                  color="initial"
                  sx={{
                    width: "80%", // This might need adjustment based on your design needs
                    whiteSpace: "normal", // Allow text to wrap
                    overflow: "hidden", // Hide any overflowing text
                    textOverflow: "ellipsis", // Use ellipsis for overflowed text
                  }}
                >
                  {reply.content}
                </Typography>
              </ReplyView>
              <BoxEnd>
                <Typography variant="body1" color="secondary">
                  {moment(reply.createdAt).fromNow()}
                </Typography>
              </BoxEnd>
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

const BoxEnd = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
}));

const ReplyBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: 20,
  borderBottom: "1px solid #ccc",
  paddingBottom: 10,
}));

const ReplyView = styled(Box)(({ theme, mleft }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  marginTop: 20,
  borderBottom: "1px solid #ccc",
  paddingBottom: 10,
  marginLeft: mleft ? mleft : 0,
  gap: 5,
}));

export default DisplayComment;
