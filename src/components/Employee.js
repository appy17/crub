import {
  Center,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link as RouteLink} from 'react-router-dom'

export default function Employee() {
  const dbpath1 = "http://localhost/backend/";
  const [Edata, setEData] = useState([]);
  const [filterData , setFilteredData] = useState([]);
  const loadEmployeeData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getEmployeedata.php");
      const Employeedata = response.data.phpresult;
      setEData(Employeedata);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadEmployeeData(); // Call the loadData function when the component mounts
  }, []);
//   console.log(Edata);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  setFilteredData(
    Edata.filter((user)=>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.ph_number.includes(searchTerm)
    )
  )
}, [searchTerm , Edata]);
console.log(Edata);
  return (
    <Box>
      <Center>
        <Input
          placeholder="Search Employee name / Number "
          _placeholder={{ color: "gray" }}
          maxW={"50%"}
          color={'#121212'}
          border={"1px solid gray"}
          _hover={{ border: "1px solid gray" }}
          m={10}
          value={searchTerm}
          onChange={(e)=>{setSearchTerm(e.target.value)}}
        />
        <Button as={RouteLink} to={'/AddEmployee'} color={'black'} variant={'solid'} colorScheme='facebook'>Add Employee</Button>
      </Center>

      <Center>
        <Table
          variant="simple"
          size="lg"
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="md"
          maxW={"80%"}
        >
          <Thead>
            <Tr>
              <Th>Employee_ID</Th>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Type</Th>
              <Th>Experience</Th>
              <Th>DOB</Th>
              <Th>Salary</Th>
              <Th>Sales</Th>

            </Tr>
          </Thead>
          <Tbody>
            {filterData.map((item) => (
              <Tr p={10}>
                <Td color={"black"}>{item.id}</Td>
                <Td color={"black"}>{item.name}</Td>
                <Td color={"black"}>{item.ph_number}</Td>
                <Td color={"black"}>{item.category}</Td>
                <Td color={"black"}>{item.experience + " yrs"} </Td>
                <Td color={"black"} fontSize={"small"} fontFamily={"monospace"}>
                  {item.date_of_birth}
                </Td>
                <Td color={"black"}>{"₹ " + Number(item.salary).toFixed(0)}</Td>
                <Td color={"black"}>{"₹ " + Number(item.sales == '' ? 0 : item.sales)}</Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
    </Box>
  );
}
