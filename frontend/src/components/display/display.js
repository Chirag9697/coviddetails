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

const Display = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [details1, setDetails1] = useState([]);
  
  // Function to open the modal
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
        console.log(details.data);
        setDetails1(details.data.allfamily1);
        console.log("details", details1);
      }
    } catch (err) {
      console.log(err);
    }
  };
useEffect(()=>{
  getAllDetails()
},[details1])
 
 const deleteData = async (id) => {
    try {
      const deleteAll = await axios.delete(
        `http://localhost:5000/deleteRoute/${id}`
      );
      if (deleteAll) {
        console.log("deleted");
      }
      getAllDetails();
      
    } catch (err) {
      console.log(err);
    }
  };

  //Delete the data
 

  const sendInvite = () => {
    const sendInvite1 = axios.post("http://localhost:5000/send-mail", {
      sender: localStorage.getItem("email"),
      receiver: email,
    });
    if (sendInvite1) {
      console.log("email sent");
    }
  };

  //Update Query
  const updateDetails = async(email,id)=>{
    navigate(`/update/${id}`)
  }

 



  return (
    <>
      <Button colorScheme="green" onClick={openModal} className="invButton">
        Invite
      </Button>
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
                <Th style={{ textAlign: "center" }}>Edit</Th>
                <Th style={{ textAlign: "center" }}>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {details1.map((item, id) => {
                if(item && item.members && item.members[0]){
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
                      <Button colorScheme="yellow" onClick={()=>updateDetails(email,item._id)}>Edit</Button>
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
            <Button colorScheme="blue" mr={3} onClick={sendInvite}>
              send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Display;