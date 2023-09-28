import React from 'react'
import "./display.css"
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
    Button, ButtonGroup 
  } from '@chakra-ui/react'

const Display = () => {
  return (
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
  )
}

export default Display
