import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { getData, sendMessage,sendMessage401 } from "../utills/api";

const StatusUpdateModel = ({
  open,
  handleClose,
  rowId,
  setData,
  phoneNumber,
  u_name,
  date,
  setAlertOpen,
  setMessage,
  setAlertType,
}) => {
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleUpdate = async () => {
    try {
      if (rowId && status) {
        setLoading(true);
        const response = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/upload/${rowId}`,
          { status }
        );

        if (response.data.status === "451 Offer") {
          console.log("Status updated successfully:", response.data.status);

          await sendMessage(u_name,date,phoneNumber)
            .then((response) => {
              setMessage("Status Updated To 451 Offer Successfully And Message Send");
              setAlertType("success");
              setAlertOpen(true);
            })
            .catch((error) => {
              console.log("error", error.message);
              setMessage(error.message);
              setAlertType("error");
              setAlertOpen(true);
              handleClose();
            });
        }else if(response.data.status === "401 Offer"){
          console.log("Status updated successfully:", response.data.status);

          await sendMessage401(u_name,phoneNumber)
            .then((response) => {
              setMessage("Status Updated To 401 Offer Successfully And Message Send");
              setAlertType("success");
              setAlertOpen(true);
            })
            .catch((error) => {
              console.log("error", error.message);
              setMessage(error.message);
              setAlertType("error");
              setAlertOpen(true);
              handleClose();
            });
        }
        const data = await getData();
        setData(data);
        handleClose();
      } else {
        console.error("Row ID or status is missing.");
        setMessage("Row ID or status is missing.");
        setAlertType("error");
        setAlertOpen(true);
        handleClose();
      }
    } catch (error) {
      console.error("There was an error updating the status!", error);
      setMessage("Error updating the status.");
      setAlertType("error");
      setAlertOpen(true);
      handleClose();
      setTimeout(() => {
        setAlertOpen(false);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  // const sendMessage = async () => {
  //   const payload = {
  //     apiKey: import.meta.env.VITE_API_KEY,
  //     campaignName: "order_fail_451_final",
  //     destination: phoneNumber,
  //     userName: "Karam Kundali",
  //     templateParams: [
  //       `${u_name}`,
  //       `${Math.floor(Math.random() * (999 - 100 + 1)) + 100}`,
  //       `${date}`,
  //     ],
  //     source: "new-landing-page form",
  //     media: {
  //       url: "https://whatsapp-media-library.s3.ap-south-1.amazonaws.com/IMAGE/63a18618e5a9a07a657d2cb9/2455432_1706374030411.jpg",
  //       filename: "1706374030411"
  //     },
  //     buttons: [],
  //     carouselCards: [],
  //     location: {}
  //   };

  //   try {
  //     const response = await axios.post(import.meta.env.VITE_SERVER_URL, payload);
  //     console.log('Message sent successfully:', response.data);
  //     setMessage("Status Updated and Message sent successfully!");
  //     setAlertType("success");
  //     setAlertOpen(true);
  //   } catch (error) {
  //     console.error('Failed to send message:', error.message);
  //     setMessage("Error sending the message.");
  //     setAlertType("error");
  //     setAlertOpen(true);
  //   }
  // };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle>Fill the form</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-dialog-select-label">Status</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={status}
              onChange={handleChange}
              input={<OutlinedInput label="status" />}
              fullWidth
            >
              <MenuItem value={"Paid"}>Paid</MenuItem>
              <MenuItem value={"451 Offer"}>451 Offer</MenuItem>
              <MenuItem value={"401 Offer"}>401 Offer</MenuItem>
              <MenuItem value={"No Reply"}>No Reply</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>
          {loading ? <CircularProgress /> : "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateModel;
