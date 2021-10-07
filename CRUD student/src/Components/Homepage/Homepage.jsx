import React from 'react'
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from 'react';
import axios from "axios"
import { styled as matStyled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Redirect, Link, MemoryRouter, Route } from 'react-router-dom';
import PaginationItem from '@mui/material/PaginationItem';
import { useLocation, useHistory } from 'react-router-dom'
import StudentForm from '../Form/StudentForm';
import StudentEditForm from '../Form/StudentEditForm';
import { setData } from '../../localstorage'
const StyledTableCell = matStyled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = matStyled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
function Homepage() {
    const [studentData, setStudentData] = useState([])
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [defPages, setDefPages] = useState("")
    const [id, setId] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [city, setCity] = useState("")
    const RefreshPage = () => {
        window.location.reload()
    }
    const location = useLocation()
    console.log(location)
    const [url, setUrl] = useState(`http://localhost:8000/students${location.search}`)
    const history = useHistory()
    useEffect(() => {
        setUrl(`http://localhost:8000/students${location.search}`)
        getData()
    }, [location.search])
    function getData() {
        axios.get(url).then(res => {
            const data = res.data.data;
            console.log(data)
            const pages = res.data.pages
            setStudentData(data)
            setDefPages(pages)
            console.log(studentData)
        })
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>

            <HomepageStyled>
                <div className="heading2"><h1>Student Information</h1></div>
                <div className="studentInfo">
                    <StudentShowStyled style={{border:"1px solid black"}}>
                        <div>
                            <div>
                               
                                <MemoryRouter initialEntries={['/students']} initialIndex={0}>

                                    <Route>
                                        {({ location }) => {
                                            const query = new URLSearchParams(location.search);
                                            const page = parseInt(query.get('page') || '1', 10);
                                            return (
                                                <Pagination
                                                    page={page}
                                                    count={defPages}
                                                    renderItem={(item) => (
                                                        <PaginationItem
                                                            component={Link}
                                                            to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                                                            {...item}
                                                            onClick={() => {
                                                                history.push(`/students${item.page === 1 ? '' : `?page=${item.page}`}`)
                                                            }}
                                                        />
                                                    )}
                                                />
                                            );
                                        }}
                                    </Route>
                                </MemoryRouter>
                            </div>
                            <div>
                            <BtnsStyled style={{margin:"auto"}}>
                                <Button color="secondary" variant="contained" onClick={handleOpen}>create user</Button>

                            </BtnsStyled>
                            </div>
                        </div>
                        <StudentForm handleOpen={handleOpen} RefreshPage={RefreshPage} setOpen={setOpen} open={open} />
                        <StudentEditForm setModalOpen={setModalOpen} id={id} RefreshPage={RefreshPage} modalOpen={modalOpen} />
                        <div className="table">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} >
                                    <TableHead style={{backgroundColor:"white"}}>
                                        <TableRow style={{backgroundColor:"white"}}>
                                            <StyledTableCell>Name of Student</StyledTableCell>
                                            <StyledTableCell align="right">Gender</StyledTableCell>
                                            <StyledTableCell align="right">Age</StyledTableCell>
                                            <StyledTableCell align="right">City</StyledTableCell>
                                           
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {studentData.map((el) => (
                                            <StyledTableRow key={el.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {el.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{el.gender}</StyledTableCell>
                                                <StyledTableCell align="right">{el.age}</StyledTableCell>
                                                <StyledTableCell align="right">{el.city}</StyledTableCell>
                                                <StyledTableCell align="right">     <Button color="secondary" variant="contained" onClick={() => {
                                                    setId(el._id)
                                                    setModalOpen(true)



                                                    // history.push(`/students/${el._id}`)
                                                }}>Edit</Button></StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </StudentShowStyled>
                    <FilteringStyled style={{border:"1px solid black"}}>

                        <FilterStyled >
                            <div><h3>filter</h3></div>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="Age"
                                    variant="outlined"
                                    fullWidth
                                    value={age}
                                    defalultValue={age}
                                    name="age"
                                    onChange={(e) => {
                                        setAge(e.target.value)
                                    }}

                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={city}
                                    name="City"
                                    value={city}
                                    onChange={(e) => {
                                        setCity(e.target.value)
                                    }}

                                />

                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        // onChange={handleChange}
                                        variant="outlined"
                                        defaultValue={gender}
                                        onChange={(e) => {
                                            setGender(e.target.value)
                                        }}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button onClick={() => {
                                    history.push(`/students${`?age=${age}`}&${`city=${city}`}&${`gender=${gender}`}`)
                                    RefreshPage()
                                }} variant="contained" color="secondary">Filter</Button>
                            </div>
                        </FilterStyled>
                    </FilteringStyled>
                </div>
            </HomepageStyled>

        </>
    )
}

const HomepageStyled = styled.div`

width: 100%;
padding: 2rem;
display: grid;
grid-template-rows: 1fr 5fr;
height: auto;

.heading2{
    text-align:center;
}

.studentInfo{
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-gap: 2rem;
 
}

`
const StudentShowStyled = styled.div`

display: grid;
grid-template-rows: 1fr 5fr;
border: 2px solid darkblue;
padding: 1rem;
align-items: center;
&>div:nth-child(1){
    display: grid;
    grid-template-columns: 5fr 2fr;
    grid-gap: 1rem;
       border-bottom: 1px solid darkblue;
align-items: center;

    &>div:nth-child(1){
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1rem 0rem;
    }
}


`
const BtnsStyled = styled.div`
display: flex;
justify-content: space-between;


`
const FilterStyled = styled.div`
width: 100%;
height:20rem;
display: grid;
grid-gap:1rem;



`

const FilteringStyled = styled.div`
border: 1px solid tomato;
padding: 1rem;


`
export default Homepage
