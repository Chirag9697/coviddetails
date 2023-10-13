import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./display.css";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import BarChart from "../charts/BarChart";
import ClusterMap from "../maps/Clustermap";
import { useDispatch } from "react-redux";
import { updateformcompleted } from "../../features/stepperhandling/Stepperhandledata";
import { format } from "date-fns";
import { current } from "immer";
import { useToast } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
const Display = () => {
  const navigate = useNavigate();
  const [currentpage, setCurrentpage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast()
  const [details1, setDetails1] = useState([]);
  const [time, setTime] = useState(false);
  const [date, setDate] = useState("");
  // Function to open the modal
  const dispatch = useDispatch();
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getAllDetails = async () => {
    const email = localStorage.getItem("email");
    try {
      const details = await axios.get(
        `http://localhost:5000/families/${email}`
      );
      if (details) {
        // console.log("hello",details.data.allFamilyDetails);
        // console.log(details.data.allfamily1);
        setDetails1(details.data.allFamilyDetails);
        // console.log("details", details1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    try {
      const deleteAll = await axios.delete(
        `http://localhost:5000/deleteRoute/${id}`
      );
      if (deleteAll) {
        console.log("deleted");
        toast({
          position: 'bottom',
          render: () => (
            <Box color='white' p={2} bg='red' style={{textAlign:"center"}}>
              Invited successfully check yor mail
            </Box>
          ),
        })
      }
      getAllDetails();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (time === false) {
      getAllDetails();
    } else {
      // if(date===''){
      // getAllDetails()
      //
      // }
      // else{
      fetchData();
      // }
    }
  }, []);
  //get the data based on time

  const fetchData = async () => {
    const email = localStorage.getItem("email");
    try {
      if (!date) {
        // Handle the case where date is empty or undefined
        console.error("Date is empty or undefined.");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/count-data/${email}/${
          date === "" ? "120" : date
        }`
      );

      if (response.data) {
        console.log("Data fetched successfully:", response.data);
        setDetails1(response.data);
      } else {
        console.error("No data returned from the server.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const sendInvite = () => {
    const sendInvite1 = axios.post("http://localhost:5000/send-mail", {
      sender: localStorage.getItem("email"),
      receiver: email,
    });
    if (sendInvite1) {
      closeModal();
      toast({
        position: 'bottom',
        render: () => (
          <Box color='white' p={2} bg='blue.500' style={{textAlign:"center"}}>
            Invited successfully check yor mail
          </Box>
        ),
      })
      console.log("email sent");
    }
  };

  //Update Query
  const updateDetails = async (email, id) => {
    const details = await axios.get(`http://localhost:5000/families1/${id}`);
    if (details) {
      console.log(details);
      const newdata = details.data.allfamily1;
      // const memberdata={...newdata.members[0]};
      dispatch(updateformcompleted({ ...newdata, ...newdata.members[0] }));
      // console.log("data",details.data.allfamily1);
    }
    navigate(`/update/${id}`);
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "30px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <h1>Welcome to Covid App</h1>
      </div>
      <br />
      <br />

      <ClusterMap/>
      {/* <div> */}
      {/* </div> */}
      <BarChart />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <form > */}
        <div style={{ display: "flex" }}>
          <select onChange={handleChange}>
            <option value="1">month before</option>
            <option value="2">2 month before</option>
            <option value="12">year before</option>
            <option value="24">2 year before</option>
            <option value="1000">show all data</option>
          </select>
          <Button colorScheme="green" onClick={fetchData} className="invButton">
            search
          </Button>
        </div>
        {/* </form> */}
        <Button colorScheme="green" onClick={openModal} className="invButton">
          Invite
        </Button>
      </div>
      <div className="main">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={{ textAlign: "center" }}>Full Name</Th>
                <Th style={{ textAlign: "center" }} isNumeric>
                  Group
                </Th>
                <Th style={{ textAlign: "center" }}>Address</Th>
                <Th style={{ textAlign: "center" }}>Gender</Th>
                <Th style={{ textAlign: "center" }}>Covid Status</Th>
                <Th style={{ textAlign: "center" }}>Date</Th>
                <Th style={{ textAlign: "center" }}>Edit</Th>
                <Th style={{ textAlign: "center" }}>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {details1.slice(currentpage*5,(currentpage+1)*5).map((item, id) => {
                if (item && item.members && item.members[0]) {
                  // return(<>'
                  return (
                    <Tr>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].fullName}
                      </Td>
                      <Td style={{ textAlign: "center" }}>{item.groupName}</Td>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].address}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].gender}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].covidStatus}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        {format(
                          new Date(item.members[0].infectedDays),
                          "dd/MM/yyyy"
                        )}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        <Button
                          colorScheme="yellow"
                          onClick={() => updateDetails(email, item._id)}
                        >
                          Edit
                        </Button>
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteData(item._id)}
                        >
                          Delete
                        </Button>
                      </Td>
                      {/* <Td style={{ textAlign: 'center'  }}>{item.fullName}</Td> */}
                    </Tr>
                  );
                }
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          display: "flex",
          width: "90vw",
          justifyContent: "space-between",
          marginLeft:"60px"
        }}
      >
        <Button colorScheme="green" isDisabled={currentpage==0?true:false} onClick={()=>setCurrentpage(currentpage-1)}>Prev</Button>
        <Button colorScheme="green" isDisabled={details1.length-6<currentpage*5?true:false} onClick={()=>setCurrentpage(currentpage+1)}>Next</Button>
      </div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite other users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>sendInvite()}>
              send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Display;
