import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios"
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "24rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    minHeight: "30rem",
    maxHeight: "auto",
    borderRadius: " 0.9rem",
    boxShadow: `0px 0px 10px black`,
    p: 4,
};

export default function StudentForm({ setOpen, open, RefreshPage }) {
   
    const [payload, setPayload] = useState({
        name: "",
        age: "",
        gender: "Male",
        city: ""

    });


    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload({
            ...payload,
            [name]: value,
        });

    };
    useEffect(() => {
        console.log(payload);
    }, [payload])
    const handleSave = () => {
        axios.post("http://localhost:8000/students", payload).then((res) => {
            console.log(res)
        })
        handleClose()
        RefreshPage()
    }
    return (
        <div style={{ position: "absolute" }}>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <StudentFormStyled>
                        <div className="heading">
                            <h1>Details</h1>
                        </div>
                        <div className="inputField">
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                defaultValue={payload.name}
                                value={payload.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputField">
                            <TextField
                                id="outlined-basic"
                                label="Age"
                                variant="outlined"
                                type="Number"
                                fullWidth
                                name="age"
                                defaultValue={payload.age}
                                value={payload.age}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputField">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={payload.gender}
                                    defaultValue={payload.gender}
                                    onChange={handleChange}
                                    variant="outlined"

                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="inputField">
                            <TextField
                                id="outlined-basic"
                                label="City"
                                variant="outlined"
                                name="city"
                                value={payload.city}
                                defaultValue={payload.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <Button onClick={handleSave} color="secondary" variant="contained">
                            Save
                        </Button>
                    </StudentFormStyled>
                </Box>
            </Modal>
        </div>
    );
}

const StudentFormStyled = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  .heading {
    text-align: center;
    h1 {
      font-size: 1.5rem;
    }
  }
  .inputField {
    width: 100%;
  }
`;
