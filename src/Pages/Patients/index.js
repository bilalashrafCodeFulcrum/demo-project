/* eslint-disable react-hooks/exhaustive-deps */
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
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../Services";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openDetailView, setOpenDetailView] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const { data: allPatients = [] } = useQuery(
    "get/patients",
    () =>
      axios({
        url: "/api/patients/",
        method: "GET",
      }),
    {
      select: (res) => res.data,
      onSuccess: (res) => {
        setList(res);
      },
    }
  );

  useEffect(() => {
    const nList = allPatients.filter((patiet) =>
      `${patiet.first_name} ${patiet.last_name}`
        .toLocaleUpperCase()
        .includes(search.toUpperCase())
    );
    setList(nList);
  }, [search]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "first_name",
        Cell: (cell) => (
          <div>
            {cell.row.original.first_name} {cell.row.original.last_name}
          </div>
        ),
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Cell: (cell) => (
          <div> {cell.value === "MALE" ? <MaleIcon /> : <FemaleIcon />} </div>
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
          <IconButton
            onClick={() => {
              setOpenDetailView(true);
              setPatientId(cell.value);
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        ),
      },
    ],
    [list]
  );

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="">
      <div
        style={{ background: "#1976D2" }}
        className="h-12 w-full px-12 py-2 mb-10 flex justify-between"
      >
        <h1 className="text-white text-2xl ml-12"> All Patients </h1>
        <h1
          onClick={handleLogout}
          className="text-white text-2xl ml-12 cursor-pointer"
        >
          {" "}
          Logout{" "}
        </h1>
      </div>
      <AddPatientDialog open={open} handleClose={() => setOpen(false)} />
      {patientId !== null && (
        <SingelPatientDialog
          open={openDetailView}
          handleClose={() => setOpenDetailView(false)}
          patientId={patientId}
        />
      )}

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
        <CustomTable data={list || []} columns={columns} />
      </div>
    </div>
  );
}
