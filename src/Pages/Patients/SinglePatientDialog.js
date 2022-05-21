import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function SingelPatientDialog({
  open,
  handleClose,
  patientId,
  setPatientId,
}) {
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();

  const { data: singlePatient } = useQuery(
    ["getSinglePatient", patientId],
    () =>
      axios({
        url: `/api/patients/${patientId}`,
        method: "GET",
      }),
    {
      select: (res) => res?.data,
      enabled: patientId !== null,
    }
  );

  const { mutate: postNote, isLoading } = useMutation(
    (payload) =>
      axios({
        url: "/api/notes/",
        method: "post",
        data: payload,
      }),
    {
      onSuccess: () => {
        setNote("");
        queryClient.invalidateQueries("getSinglePatient");
      },
    }
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && note !== "") {
      postNote({ text: note, patient: patientId });
    }
  };

  const closeModel = () => {
    setNote("");
    setPatientId(null);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModel}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Patient Detail</DialogTitle>
        <DialogContent>
          <div className="w-full flex items-center space-x-4 my-4 px-4 border-b border-gray-200 pb-6">
            <Avatar style={{ width: "70px", height: "70px" }}> B </Avatar>
            <div className="flex flex-col space-y-1">
              <h3>
                {" "}
                {singlePatient?.first_name} {singlePatient?.last_name}{" "}
              </h3>
              <p className="text-xs text-gray-500">
                Phone: {singlePatient?.phone}{" "}
              </p>
              <p className="text-xs text-gray-500">
                {" "}
                Gender: {singlePatient?.gender}{" "}
              </p>
              <p className="text-xs text-gray-500">
                {" "}
                Disabled: {singlePatient?.is_disabled ? "Yes" : "No"}{" "}
              </p>
            </div>
          </div>

          <div className="">
            <h2 className="pb-2 border-b border-gray-200">Notes</h2>
            <div className="text-xs font-bold text-red-600 mt-2">
              {" "}
              Hit "Enter" to add notes{" "}
            </div>
            <input
              className="h-8 w-full border border-gray-300 mt-2 pl-2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isLoading}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="notes-list">
            {singlePatient?.notes.map((note) => (
              <div className="flex flex-col space-y-1">
                <span className="text-sm"> {note.text} </span>
                <p className="text-xs text-gray-400 ">
                  {" "}
                  {/* {moment(note.created).format("DD-MM-YYYY")}{" "} */}
                  {note.created}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModel} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
