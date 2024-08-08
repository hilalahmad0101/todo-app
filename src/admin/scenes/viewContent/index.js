// import React, { useEffect, useRef, useState } from "react";
// import Header from "../../components/Header";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   useTheme,
//   Typography,
//   CircularProgress, IconButton,
//   Modal,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import StatBox from "../../components/StatBox";
// import { tokens } from "../../../theme/theme";
// import logo from "../../../assets/autoDisk.jpg";
// import { apiBase } from "../../config";
// import ShareSharpIcon from '@mui/icons-material/ShareSharp';
// import axios from "axios";
// function ViewContent() {

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const viewerRef = useRef(null);
//   const [viewer, setViewer] = useState(null);
//   const [models, setModels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false)
//   const [optionData, setOptionData] = useState([])
//   const [modelData, setModelData] = useState({
//     name:'',
//     urn:''
//   })

//   const getData = async () => {
//     await axios.get(apiBase + "/user").then((res) => {
//       console.log("users=", res.data.users);
//       setOptionData(res.data.users)
//     }).catch((error) => {
//       console.log(error);
//     })

//   }
//   useEffect(() => {
//     const fetchModels = async () => {

//       try {
//         setLoading(true);
//         const response = await fetch(apiBase + "/api/models");
//         if (!response.ok) {
//           throw new Error(await response.text());
//           setLoading(false);
//         }
//         const data = await response.json();
//         setModels(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch models:", error);
//         setLoading(false);
//       }

//     };
//     getData()
//     fetchModels();
//   }, []);

//   const handleClose = () => {
//     setOpenModal(false)
//   }

//   const handeleAssin = async (item, modelData) => {
//     console.log("assignin ",item,modelData);
//   }

//   console.log("modelData",modelData);
//   return (
//     <Box m="20px">
//       <Header
//         title="YOUR UPLOADED CONTENT"
//         subtitle="The image formate must be"
//       />
//       <Box
//         display="flex"
//         sx={{
//           overflow: "auto",
//           flexDirection: "column",
//           height: "100vh",
//         }}
//       >
//         <Grid container spacing={1}>
//           {loading ? (
//             <Box sx={{ display: "flex", m: "20px" }}>
//               <CircularProgress color="secondary" />
//               <Typography variant="body1" color="secondary">
//                 loading...
//               </Typography>
//             </Box>
//           ) : (
//             <>
//               {models.map((model, index) => (
//                 <Grid item md={4} sm={12} key={index}>
//                   <Box
//                     backgroundColor={colors.primary[400]}
//                     display="flex"

//                   >
//                     <Box sx={{ width: '100%', padding: 1, display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

//                       <Box sx={{ m: 2 }}>
//                         <Typography variant="body1" color="secondary">
//                           {model.name}
//                         </Typography>
//                       </Box>

//                       <IconButton aria-label="" onClick={() => {
//                         setOpenModal(!openModal)
//                         setModelData({
//                           name:model.name,
//                           urn:model.urn
//                         })
//                       }} >
//                         <ShareSharpIcon />

//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </Grid>
//               ))}
//             </>
//           )}
//         </Grid>
//       </Box>
//       <Modal
//         open={openModal}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Assign Modal to user
//           </Typography>

//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             fullWidth
//           >
//             {
//               optionData.map((item, index) => (
//                 <MenuItem value={item.id}>{item.email}</MenuItem>
//               ))
//             }
//           </Select>
//           <Button
//             type="submit"
//             color="secondary"
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={()=>handeleAssin(modelData)}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>

//     </Box>
//   );
// }

// export default ViewContent;

// import React, { useEffect, useRef, useState } from "react";
// import Header from "../../components/Header";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   useTheme,
//   Typography,
//   CircularProgress, IconButton,
//   Modal,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import StatBox from "../../components/StatBox";
// import { tokens } from "../../../theme/theme";
// import logo from "../../../assets/autoDisk.jpg";
// import { apiBase } from "../../config";
// import ShareSharpIcon from '@mui/icons-material/ShareSharp';
// import axios from "axios";

// function ViewContent() {

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const viewerRef = useRef(null);
//   const [viewer, setViewer] = useState(null);
//   const [models, setModels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [optionData, setOptionData] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState('');
//   const [selectedUserEmail, setSelectedUserEmail] = useState('');

//   const [modelData, setModelData] = useState({
//     name: '',
//     urn: ''
//   });

//   const getData = async () => {
//     await axios.get(apiBase + "/user").then((res) => {
//       console.log("users=", res.data.users);
//       setOptionData(res.data.users);
//     }).catch((error) => {
//       console.log(error);
//     });
//   };

//   useEffect(() => {
//     const fetchModels = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(apiBase + "/api/models");
//         if (!response.ok) {
//           throw new Error(await response.text());
//         }
//         const data = await response.json();
//         setModels(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch models:", error);
//         setLoading(false);
//       }
//     };
//     getData();
//     fetchModels();
//   }, []);

//   const handleClose = () => {
//     setOpenModal(false);
//   };

//   const handleAssign = async (selectedUserId,selectedUserEmail ,modelData) => {
//     console.log("assigning ", selectedUserId, selectedUserEmail,modelData.name,modelData.urn);
//     // Perform the assignment logic here
//   };

//   console.log("modelData", modelData);

//   return (
//     <Box m="20px">
//       <Header
//         title="YOUR UPLOADED CONTENT"
//         subtitle="The image format must be"
//       />
//       <Box
//         display="flex"
//         sx={{
//           overflow: "auto",
//           flexDirection: "column",
//           height: "100vh",
//         }}
//       >
//         <Grid container spacing={1}>
//           {loading ? (
//             <Box sx={{ display: "flex", m: "20px" }}>
//               <CircularProgress color="secondary" />
//               <Typography variant="body1" color="secondary">
//                 loading...
//               </Typography>
//             </Box>
//           ) : (
//             <>
//               {models.map((model, index) => (
//                 <Grid item md={4} sm={12} key={index}>
//                   <Box
//                     backgroundColor={colors.primary[400]}
//                     display="flex"
//                   >
//                     <Box sx={{ width: '100%', padding: 1, display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Box sx={{ m: 2 }}>
//                         <Typography variant="body1" color="secondary">
//                           {model.name}
//                         </Typography>
//                       </Box>

//                       <IconButton aria-label="" onClick={() => {
//                         setOpenModal(true);
//                         setModelData({
//                           name: model.name,
//                           urn: model.urn
//                         });
//                       }} >
//                         <ShareSharpIcon />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </Grid>
//               ))}
//             </>
//           )}
//         </Grid>
//       </Box>
//       <Modal
//         open={openModal}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Assign Model to User
//           </Typography>

//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             fullWidth
//             value={selectedUserId}
//             onChange={(e) => {
//               setSelectedUserEmail(e.target.value.email)
//               setSelectedUserId(e.target.value.id)
//             }}
//           >
//             {optionData.map((item) => (
//               <MenuItem key={item.id} value={item}>{item.email}</MenuItem>
//             ))}
//           </Select>
//           <Button
//             type="submit"
//             color="secondary"
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={() => handleAssign(selectedUserId,selectedUserEmail, modelData)}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default ViewContent;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Grid,
  Button,
  useTheme,
  Typography,
  CircularProgress,
  IconButton,
  Modal,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { tokens } from "../../../theme/theme";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import axios from "axios";
import { apiBase } from "../../../config";
import Virtualize from "../../components/AutoComplete";

function ViewContent() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [optionData, setOptionData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [modelData, setModelData] = useState({
    name: "",
    urn: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" }); // State for alert

  const getData = async () => {
    try {
      const response = await axios.get(apiBase + "/user");
      console.log("users=", response.data.users);
      setOptionData(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiBase + "/api/models");
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        setModels(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch models:", error);
        setLoading(false);
      }
    };
    getData();
    fetchModels();
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAssign = async () => {
    console.log(
      "assigning ",
      selectedUserId,
      selectedUserEmail,
      modelData.name,
      modelData.urn
    );
    // Perform the assignment logic here
    try {
      const response = await axios.post(apiBase + "/user/create", {
        userId: selectedUserId,
        name: modelData.name,
        urn: modelData.urn,
      });
      console.log("Assignment response:", response.data);
      setAlert({ type: "success", message: "Assignment Model successful!" });
      setOpenModal(false);
      setSelectedUserId("");
      setSelectedUserEmail("");
      setModelData({
        name: "",
        urn: "",
      });
    } catch (error) {
      console.error("Failed to assign model:", error);
      setAlert({ type: "error", message: "Assignment Model unsuccessful!" });
      setOpenModal(false);
    }
  };

  console.log("modelData", modelData);

  return (
    <Box m="20px">
      <Header
        title="YOUR UPLOADED CONTENT"
        subtitle="The image format must be"
      />
      {alert.message && ( // Render Alert if message exists
        <Alert severity={alert.type} sx={{ width: "100%", mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      <Box
        display="flex"
        sx={{
          overflow: "auto",
          height: "calc(100vh - 84px)", // Adjust 64px based on your header height
          flexDirection: "column",
        }}
      >
        <Grid container spacing={1}>
          {loading ? (
            <Box sx={{ display: "flex", m: "20px" }}>
              <CircularProgress color="secondary" />
              <Typography variant="body1" color="secondary">
                loading...
              </Typography>
            </Box>
          ) : (
            <>
              {models.length === 0 ? (
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{ ml: 1, mt: 1 }}
                >
                  No models available
                </Typography>
              ) : (
                <>
                  {models.map((model, index) => (
                    <Grid item md={4} sm={12} key={index}>
                      <Box backgroundColor={colors.primary[400]} display="flex">
                        <Box
                          sx={{
                            width: "100%",
                            padding: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ m: 2 }}>
                            <Typography variant="body1" color="secondary">
                              {model.name}
                            </Typography>
                          </Box>

                          <IconButton
                            aria-label=""
                            onClick={() => {
                              setOpenModal(true);
                              setModelData({
                                name: model.name,
                                urn: model.urn,
                              });
                            }}
                          >
                            <ShareSharpIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assign Model to User
            </Typography>
            <Virtualize
              data={optionData}
              setSelectedUserEmail={setSelectedUserEmail}
              setSelectedUserId={setSelectedUserId}

              // onChange={(event, newValue) => setSelectedUserId(newValue)}
            />
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={selectedUserId}
              onChange={(e) => {
                const selectedUser = optionData.find(
                  (user) => user.id === e.target.value
                );
                setSelectedUserEmail(selectedUser.email);
                setSelectedUserId(selectedUser.id);
              }}
            >
              {optionData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.email}
                </MenuItem>
              ))}
            </Select> */}
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleAssign}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default ViewContent;
