import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
} from "@mui/material";
// import { apiBase, userToken } from "../config";
import axios from "axios";
import moment from "moment";
import { useTheme } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { userToken, apiBase } from "../../../config";
import { tokens } from "../../../theme/theme";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Comments = () => {
  const location = useLocation();
  const [projectDetails, setProjectDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyOpen, setReplyOpen] = useState({});
  const [repText, setRepText] = useState({});
  const [expandedComment, setExpandedComment] = useState({});
  const [isExpanded, setIsExpanded] = useState({});
  const { userId, modelUrn } = location.state || {};
  console.log("userId", modelUrn);
  const theme = useTheme();
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const token = user.token;
  console.log("uid", token);
  const colors = tokens(theme.palette.mode);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     let headersList = {
  //       Accept: "*/*",
  //       "x-access-token": token,
  //     };
  //     let bodyContent = JSON.stringify({
  //       userId: userId,
  //       modelId: modelUrn,
  //     });
  //     let reqOptions = {
  //       url: `${apiBase}/admin/comment/`,
  //       method: "post",
  //       headers: headersList,
  //       data: bodyContent,
  //     };
  //     try {
  //       let response = await axios.request(reqOptions);
  //       console.log("comment", response.data);
  //       setProjectDetails(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [modelUrn, userId, token]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "x-access-token": token,
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        userId: userId,
        modelId: modelUrn,
      });

      let reqOptions = {
        url: apiBase + "/admin/comment",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      try {
        let response = await axios.request(reqOptions);
        setProjectDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [modelUrn, userId, userToken]);

  const handleExpandClick = (id) => {
    setExpandedComment((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleHideShow = (id) => {
    setIsExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleReply = async (reply, commentId) => {
    let headersList = {
      Accept: "*/*",
      "x-access-token": userToken,
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      content: reply,
      commentId: commentId,
    });
    let reqOptions = {
      url: `${apiBase}/admin/comment/reply`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    try {
      let response = await axios.request(reqOptions);
      const newReply = response.data.data;
      console.log(newReply);
      setProjectDetails((prevDetails) =>
        prevDetails.map(
          (comment) =>
            comment.id === commentId
              ? { ...comment, replies: [...comment.replies, newReply] }
              : comment
          // console.log(comment.replies, newReply)
        )
      );
      console.log("after reply");
      setReplyOpen((prev) => ({
        ...prev,
        [commentId]: false,
      }));
      setRepText((prev) => ({
        ...prev,
        [commentId]: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  console.log("isExpanded", isExpanded);
  return (
    <Box m="20px">
      <Header title="Project Comments" subtitle="Comments and Replies" />
      <Box
        display="flex"
        sx={{ overflow: "auto", height: "80vh", flexDirection: "column" }}
      >
        <Grid container spacing={0}>
          {loading ? (
            <Typography>loading...</Typography>
          ) : (
            projectDetails.map((item, index) => (
              <Grid md={3} sx={{ mt: 2 }} key={index}>
                <Card sx={{ maxWidth: 345, backgroundColor: colors.grey[500] }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={apiBase + item.image}
                    alt="Paella dish"
                  />
                  <CardContent sx={{ paddingBottom: "0px" }}>
                    <Typography variant="h4" sx={{ marginTop: "10px" }}>
                      {isExpanded[item.id]
                        ? item.content
                        : `${item.content.substring(0, 30)}`}

                      {item.content.length > 30 ? (
                        <>
                          <Link
                            underline="none"
                            onClick={() => handleHideShow(item.id)}
                            sx={{ ml: 1, cursor: "pointer" }}
                          >
                            {isExpanded[item.id] ? "hide" : "...."}
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </Typography>

                    <Typography color="text.secondary">
                      {item.author.name}
                      <span style={{ marginLeft: "10px" }}>
                        {moment(item.createdAt).fromNow()}
                      </span>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    Reply and Feedback
                    <ExpandMore
                      expand={expandedComment[item.id]}
                      onClick={() => handleExpandClick(item.id)}
                      aria-expanded={expandedComment[item.id]}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expandedComment[item.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent sx={{ paddingTop: "0px" }}>
                      {replyOpen[item.id] ? (
                        <>
                          <Stack direction={"row"}>
                            <Avatar
                              alt="Admin"
                              src="/static/images/avatar/1.jpg"
                            />
                            <CustomInput
                              multiline
                              value={repText[item.id] || ""}
                              onChange={(e) =>
                                setRepText((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                              sx={{ ml: 1, flex: 1, color: "white" }}
                              placeholder="Type your reply..."
                              inputProps={{ "aria-label": "type your reply" }}
                            />
                          </Stack>
                          <BoxEnd
                            sx={{
                              gap: 1,
                              marginTop: "8px",
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="warning"
                              onClick={() =>
                                setReplyOpen((prev) => ({
                                  ...prev,
                                  [item.id]: false,
                                }))
                              }
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() =>
                                handleReply(repText[item.id], item.id)
                              }
                            >
                              Reply
                            </Button>
                          </BoxEnd>
                        </>
                      ) : (
                        <>
                          <Button
                            sx={{ mt: 1, mb: 5 }}
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              setReplyOpen((prev) => ({
                                ...prev,
                                [item.id]: true,
                              }))
                            }
                          >
                            Reply
                          </Button>
                        </>
                      )}
                      <Box
                        sx={{
                          maxHeight: 150,
                          overflow: "auto",
                          backgroundColor: "#1e1e1e",

                          paddingTop: 1,
                        }}
                      >
                        {item.replies.map((rep, index) => (
                          <Box
                            key={index}
                            sx={{
                              padding: 2,
                              marginBottom: 2,
                              backgroundColor: "#1e1e1e",
                              borderRadius: 1,
                              borderBottom: "1px solid #333",
                            }}
                          >
                            <Typography variant="h6" color="white">
                              {rep.content}
                            </Typography>
                            {/* <Divider sx={{ borderColor: "#444", my: 1 }} /> */}
                            <Stack direction={"row"}>
                              <Typography variant="body2" color="gray">
                                {moment(rep.createdAt).fromNow()} |{" "}
                                {rep.author?.name}
                              </Typography>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

const BoxEnd = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
}));

const CustomInput = styled(({ secondaryColor, ...other }) => (
  <TextField {...other} />
))`
  & label.Mui-focused {
    color: ${(props) => props.secondaryColor};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${(props) => props.secondaryColor};
    }
    fieldset {
      border-color: ${(props) => props.secondaryColor};
    }
    &:hover fieldset {
      border-color: ${(props) => props.secondaryColor};
    }
  }
`;

export default Comments;
