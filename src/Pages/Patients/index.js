import { Button, IconButton } from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchBar from "../../shared-compnents/SearchBar";
import CustomTable from "../../shared-compnents/CustomTable";
import AddPatientDialog from "./AddPatientDialog";
import SingelPatientDialog from "./SinglePatientDialog";
import { useQuery } from "react-query";
import axios from "axios";

const dummyData = [
  {
    id: 1,
    first_name: "Bilal",
    last_name: "Ashraf",
    gender: 1,
    phone: "+9234349759745",
    isDisabled: false,
  },
  {
    id: 2,
    first_name: "Zain",
    last_name: "Abbas",
    gender: 1,
    phone: "+926475754799",
    isDisabled: true,
  },
  {
    id: 3,
    first_name: "Waseem",
    last_name: "Talib",
    gender: 2,
    phone: "+9275947554759",
    isDisabled: false,
  },
];

export default function Patients() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openDetailView, setOpenDetailView] = useState(false);
  const [patientId, setPatientId] = useState(null)
  const [list, setList] = useState(dummyData)

  // useEffect(()=>{
  //   const filterList = list.filter(patient => patient.first_name.includes(search))
  //   setList(filterList)
  // }, [search])

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "first_name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Cell: (cell) => (
          <div> {cell.value === 1 ? <MaleIcon /> : <FemaleIcon />} </div>
        ),
      },
      {
        Header: "Disable",
        accessor: "isDisabled",
        Cell: (cell) => (
          <div>
            {" "}
            {cell.value ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon color="error" />
            )}{" "}
          </div>
        ),
      },
      {
        Header: "View",
        accessor: "id",
        Cell: (cell) => (
          <IconButton onClick={()=> {
            setOpenDetailView(true);
            setPatientId(cell.value)
          }}>
            <RemoveRedEyeIcon />
          </IconButton>
        ),
      },
    ],
    [dummyData]
  );


  const {data: allPatients} = useQuery('get/patients', ()=> axios({
    url: '/api/patients/',
    method: 'GET'
  }), {
    onSuccess: (res)=>{
      debugger
    }
  })

  return (
    <div className="">
      <div style={{ background: "#1976D2" }} className='h-12 w-full px-12 py-2 mb-10'>
        <h1 className="text-white text-2xl ml-12"> All Patients </h1>
      </div>
      <AddPatientDialog open={open} handleClose={() => setOpen(false)} />
      <SingelPatientDialog open={openDetailView} handleClose={()=> setOpenDetailView(false)} patientId={patientId} />

      <div className="flex w-full justify-end space-x-4 px-10">
        <SearchBar search={search} setSearch={setSearch} />
        <Button
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
          color="primary"
          variant="contained"
        >
          {" "}
          Add Patient{" "}
        </Button>
      </div>

      <div className="mt-6 px-6">
        <CustomTable data={list} columns={columns} />
      </div>
    </div>
  );
}
