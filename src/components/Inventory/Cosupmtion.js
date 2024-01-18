import {
  Box,
  Divider,
  Flex,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  Button,
  useToast,
  Tag,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
export default function Consumption(props) {
  const dbpath1 = "http://localhost/backend/";
  const { id, unit , size , name  , type} = props.data;
  const toast = useToast();
  const [Edata, setEData] = useState([]);
  const [servicedata, setServiceData] = useState([]);

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
  const loadServiceeData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getServicedata.php");
      const serviceArray = response.data.phpresult;
      setServiceData(serviceArray);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadServiceeData(); // Call the loadData function when the component mounts
  }, []);
  // insert data for operation
  const [usedBy, setUsedBy] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [selectedService, setService] = useState("");

  const insertData = async () => {
    const Consumption_data = {
      product_id: id, // Assuming 'id' is the product ID received as a prop
      measurement: measurement,
      service: selectedService,
      unit_: unit, // You need to manage selectedService in your component state
      date: new Date().toISOString().split("T")[0],
      u_id : usedBy,
    };
    axios
      .post("http://localhost/backend/addConsumption.php", Consumption_data)
      .then((response) => {
        console.log("Data created:", response.data);
        toast({
          position: "top-right",
          title: "Added !",
          status: "success",
        });
        // You might want to do something after a successful submission
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  };
  // fetch_data
  console.log(usedBy);
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost/backend/getConsumptionData.php?id=${id}`
      );
      setdata(response.data.phpresult?.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData1();
    console.log(`Fetching data of ${name}........`)

  }, [id]);
  console.log(data);
  const [data1, setdata1] = useState([]);
  const fetchData1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost/backend/getIssue.php?id=${id}`
      );
      setdata1(response.data.phpresult);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let isValid = data1?.filter((d) => d.isDone == 0) 
  console.log('filter',isValid)

  return (
    <>
 { type == 'c' ?  <Box w={"100%"}>
   { isValid  ?  (
    <>
      <HStack gap={"7px"} color={"black"} alignItems="flex-start">
        {/* <Tag color={'black'}>Available for Consumption : {Number(isValid.original - Number(isValid.consumption))}</Tag> */}
        <Flex flexDirection={"column"} width="50%">
          <FormLabel color={"gray.600"} fontWeight={"light"} fontSize={"sm"}>
            Product Issued to
          </FormLabel>
          <Select
            placeholder="Select"
            border={"1px solid gray"}
            // w="full"
            _hover={{ border: "1px solid black" }}
            value={usedBy}
            onChange={(e) => setUsedBy(e.target.value)}
            fontSize={'small'}
          >
            {isValid.map((i) => (
              <option value={i.unique_id} style={{ color: "white"  , fontSize:'small'}}>
                {i.p_name}@Available : {Number(i.original - Number(i.consumption))}{unit}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex flexDirection={"column"} width="50%">
          <FormLabel color={"gray.600"} fontSize={"sm"} fontWeight={"light"}>
            Services
          </FormLabel>
          <Select
            placeholder="Select"
            _pl
            border={"1px solid gray"}
            value={selectedService}
            onChange={(e) => setService(e.target.value)}
            _hover={{ border: "1px solid black" }}
          >
            {servicedata.map((i) => (
              <option value={i.name_service} style={{ color: "white" }}>
                {i.name_service}
              </option>
            ))}
          </Select>
        </Flex>
      </HStack>
      <HStack gap={"7px"} color={"black"} alignItems="flex-start" mt={3}>
        <Flex flexDirection={"column"} width="50%">
          <FormLabel color={"gray.600"} fontWeight={"light"} fontSize={"sm"}>
            Mesurment
          </FormLabel>
          <Input
            type="number"
            border={"1px solid gray"}
            placeholder=""
            _placeholder={{ color: "gray" }}
            _hover={{ border: "1px solid black" }}
            cursor={"pointer"}
            color={"#121212"}
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
            max={size}
          />
        </Flex>
        <Flex flexDirection={"column"} width="10%">
          <FormLabel color={"gray.600"} fontWeight={"light"} fontSize={"sm"}>
            Unit
          </FormLabel>
          <Input
            type="text"
            border={"1px solid gray"}
            placeholder=""
            _placeholder={{ color: "gray" }}
            _hover={{ border: "1px solid black" }}
            cursor={"pointer"}
            color={"#121212"}
            value={unit}
          />
        </Flex>
        <Flex flexDirection={"column"} width="39%">
          <Button
            colorScheme="green"
            mt={7}
            alignSelf={"flex-end"}
            onClick={insertData}
          >
            {" "}
            Submit
          </Button>
        </Flex>
      </HStack>
      </> ) 
        :  'Please issue the Product ' 
            }
      {/* </VStack> */}

       <HStack mt={5}>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th fontSize={"x-small"}>Used By</Th>
              <Th fontSize={"x-small"}>Mesurment</Th>
              <Th fontSize={"x-small"}>Service</Th>
              <Th fontSize={"x-small"}>Consumption Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((d) => (
              <Tr>
                <Td>{d.used_by}</Td>
                <Td>{d.measurement}</Td>
                <Td>{d.service}</Td>
                <Td>{d.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </HStack> 
      
    </Box> : <Center color={'gray.300'}> <FaBoxOpen />&nbsp;Nothing To Preview </Center>}
    </> 
  );
}
