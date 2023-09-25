import React,{useState} from 'react'
import "./display.css"
import axios from 'axios'
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
    Button, ButtonGroup,
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
   
  } from '@chakra-ui/react'

  

const Display = () => {
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email,setEmail] = useState('')
  
    // Function to open the modal
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const sendInvite = axios.post("http://localhost:5000/send-mail",{
        sender: localStorage.getItem("email"),
        receiver:email,
    })
    
  return (
    <>
     <Button colorScheme='green' onClick={openModal} className='invButton'>Invite</Button>
    <div className='main'>
     
        <TableContainer>
            <Table variant='simple'>
               
                <Thead>
                <Tr>
                    <Th style={{ textAlign: 'center' }}>Name</Th>
                    <Th style={{ textAlign: 'center' }} isNumeric>Age</Th>
                    <Th style={{ textAlign: 'center'  }}>Address</Th>
                    <Th style={{ textAlign: 'center'  }}>Group</Th>
                    <Th style={{ textAlign: 'center'  }}>Covid Status</Th>
                    <Th style={{ textAlign: 'center'  }}>Edit</Th>
                    <Th style={{ textAlign: 'center'  }}>Delete</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td style={{ textAlign: 'center'  }}>AP</Td>
                    <Td style={{ textAlign: 'center'  }} isNumeric>25</Td>
                    <Td style={{ textAlign: 'center'  }}>Buddhanagar</Td>
                    <Td style={{ textAlign: 'center'  }}>Poudyal</Td>
                    <Td style={{ textAlign: 'center'  }}>Positive</Td>
                    <Td style={{ textAlign: 'center'  }}><Button colorScheme='blue'>Edit</Button></Td>
                    <Td style={{ textAlign: 'center'  }}><Button colorScheme='red'>Delete</Button></Td>
                </Tr>
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
            <Input type='email'name="email" id="email" placeholder='email' value={email} onChange={(e)=>{setEmail
              (e.target.value)}}/>
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={sendInvite}>
              send
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Display
