import {
  Box,
  Button,
  Center,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Table,
  Tag,
  TagCloseButton,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Toast,
  Tr,
  VStack,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { FaSort } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "./context/AppContext";
import { switchTheme } from "./switchTheme";
import Consumption from "./Inventory/Cosupmtion";
export default function Invoice() {
  const [displatS, setdisplayS] = useState("none");
  const [display2, setdisplay2] = useState("none");
  const [display3, setdisplay3] = useState("none");

  const location = useLocation();
  const [service, setService] = useState(null);
  const [search, setSearch] = useState("");
  const [Cname, setCname] = useState("client_name");
  // console.log(location.pathname);
  const dbpath1 = "http://localhost/backend/";
  const [servicedata, setServiceData] = useState([]);

  const [selectedType, setSelectedType] = useState("perc");
  const [percentageValue, setPercentageValue] = useState("");
  const [flatValue, setFlatValue] = useState("");

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setFlatValue("");
    setPercentageValue("");
  };

  const loadServiceData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getServicedata.php");
      const Servicedata = response.data.phpresult;
      setServiceData(Servicedata);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadServiceData(); // Call the loadData function when the component mounts
  }, []);
  const [Clientdata, setClinetData] = useState([]);

  const loadCData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getClientData.php"
      );
      const data = response.data.phpresult;
      setClinetData(data);
      // console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadCData();
  }, []);
  // console.log(Clientdata);
  const [suggestions, setSuggestions] = useState([]);
  const filterClient = (e) => {
    // Check if the event object is provided
    if (e && e.target) {
      const inputValue = e.target.value;
      setSearch(inputValue);
      // console.log("Input Value: " + inputValue);
      setdisplay3("block");
    }
    //   const filteredSuggestions = Clientdata.filter((data) =>
    //   data.mobile_number.toLowerCase().includes(client.toLowerCase())
    // );
    const filteredSuggestions = Clientdata.filter(
      (data) =>
        data.mobile_number.includes(search) ||
        data.name.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  useEffect(() => {
    filterClient();
    // console.log(search)
  }, [search]);
  // console.log(search)

  const handleSuggestionClick = (name, number) => {
    // Handle suggestion click, set the selected client, and clear suggestions
    setSuggestions([]);
    setSearch(number);
    setCname(name);
    setdisplay3("none");

    // let m = true;
  };

  const PaymentMode = [
    "CASH",
    "CARD",
    "ONLINE",
    "G Pay",
    "PhonePe",
    "UPI",
    "Cheque",
  ];
  // const [totalPrice , settotalPrice] = useState(0);
  // const [totalPrice2 , settotalPrice2] = useState(0);
  const handleItemClick = (item) => {
    setService(item);
    // setpaid(totalFinal2);
    setbalance(totalFinal2 - paid);
    
    // settotalPrice(totalFinal);
    // settotalPrice2(totalFinal2);
  };
  let totalFinal = 0;
  let totalFinal2 = 0;
  

  // let gst = (totalFinal2*9)/100;
  const [paid , setpaid] = useState(0);
  const [balance , setbalance] = useState(0);
  const {
    clientData,
    serviceDatas,
    selectedDate,
    updateSelectedData,
    selectdId,
    stylist
  } = useAppContext();
  // console.log(serviceDatas);
  // let stylist1 = [serviceDatas.split('|')[0] , serviceDatas.split('|')[1]];
  // console.log(stylist1);
  // serviceDatas.split()
  // let stylistx  = serviceDatas.split('|')[0];
  // let stylisty  = serviceDatas.split('|')[1];
  // console.log(stylistx);
  // console.log(stylisty);

  useEffect(() => {
    // Fetch data or perform any other actions based on clientData and serviceData
    // console.log("Client Data in Invoice:", clientData);
    // console.log("Service Data in Invoice:", serviceDatas);
    // console.log(serviceDatas.length);
    // console.log(selectdId);
  }, [clientData, serviceDatas]);
  useEffect(() => {
    // Assuming the condition for updating selectedServices is met
    if (serviceDatas.length > 0) {
      const updatedServices = [...selectedServices, ...serviceDatas];
      setSelectedServices(updatedServices);
    }
  }, [serviceDatas]);
  const Fclientname = Clientdata.find(
    (data) => Number(data.mobile_number) === Number(clientData)
  );

  const Datapost =
    clientData === ""
      ? Cname
      : (Fclientname && Fclientname.name) || "Client Not Found"; // You can set this value based on your logic

  //  {console.log(Datapost)}
  {
    // console.log(selectData);
  }
  const [selectedMenuItem, setSelectedMenuItem] = useState('Services');

  const handleMenuItemClick = (value) => {
    setSelectedMenuItem(value);
  };
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  const curdate = getCurrentDate() 
  // console.log('cuDate' , curdate); 
  console.log('selectedMenu' , selectedMenuItem)
  console.log('selecteddate' , selectedDate)

  const insertData = async () => {
    


    const invoice_data = {
      aptId: selectdId,
      invoiceID:
      selectedMenuItem === 'Services'
        ? `INV|${selectedDate}|KRUB|${selectdId}`
        : selectedMenuItem === 'Products'
        ? `INV|${curdate}|KRUB|PROD|${idPInvoice}` // Fixed this line
        : '',
      clientName:
        clientData === ""
          ? Cname
          : (Fclientname && Fclientname.name) || "Client Not Found",
      clientNumber: clientData !== "" ? clientData : search,
      date: selectedDate === null ? curdate : selectedDate,
      // stylistName: "your_stylist_name", // Replace with actual stylist name
      services: JSON.stringify(arrayOfObjects),
      priceD: arrayOfObjects,
      type: selectedType,
      totalPrice: totalFinal2,
      discountPrice: totalFinal - totalFinal2,
      paymentType: service,
      paid : paid,
      balance : balance,
      i_type : selectedMenuItem
    };
    axios
      .post("http://localhost/backend/addInvoice.php", invoice_data)
      .then((response) => {
        console.log("Data created:", response.data);
         toast({
          position:'top-right',
          title:'Invoice Genrated',
          status:'success'
         })
        // You might want to do something after a successful submission
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  };
  // const dbpath1 = "http://localhost/backend/";
  const [Edata, setEData] = useState([]);
  // const [filterData , setFilteredData] = useState([]);
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
  // console.log(Edata);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(0);
  const [editedService, setEditedService] = useState("");

  // const handleDoubleClick = (serviceName) => {
  //   setIsEditing(true);
  //   setEditedService(serviceName);
  //   const existingObject = arrayOfObjects.find(obj => obj.checkboxValue === serviceName);
  //   const existingValue = existingObject ? existingObject.editedValue : '';
  //   setEditedValue(existingValue || '');
  //   setSelectedType('flat'); // You can customize this value based on your needs
  // };

  // const handleInputChange = (event) => {
  //   setEditedValue(event.target.value);
  // };

  // const handleInputBlur = () => {
  //   setIsEditing(false);
  //   // setEditedService('');
  //   setEditedValue(editedValue);
  // };
  // //
  const [editedValues, setEditedValues] = useState({});

  const handleDoubleClick = (serviceName) => {
    setIsEditing(true);
    setEditedValues((prev) => ({
      ...prev,
      [serviceName]: {
        service: serviceName,
        value: prev[serviceName] ? prev[serviceName].value : 0,
      },
    }));
    setSelectedType("flat");
  };

  const handleInputChange = (serviceName, event) => {
    const { value } = event.target;
    setEditedValues((prev) => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        value,
      },
    }));
  };

  const handleInputBlur = (serviceName) => {
    setIsEditing(false);
    setEditedValues((prev) => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        value: Number(prev[serviceName].value),
      },
    }));
  };
  const [value, setValue] = useState({ radioValue: "", checkboxesValue: [] });
  const [alert, setalert] = useState("1px solid gray");
  const [btnAlert, setbtnAlert] = useState("");
  const [arrayOfObjects, setArrayOfObjects] = useState([]);
  const [stylistArray ,  setStylistArray] = useState([]);
  console.log(arrayOfObjects);
  const [dataP , setDataP] = useState([]);
  const PloadData = async () => {
    try {
      const response = await axios.get("http://localhost/backend/getProducts.php");
      const data = response.data.phpresult;
      setDataP(data);
      console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    PloadData();
  }, []);
  const [invoiceD, setInvoiceD] = useState([]);
  const loadInvoiceData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getInvoicedata.php");
      const data = response.data;
      setInvoiceD(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  // console.log(invoiceD);
  useEffect(() => {
    loadInvoiceData();
  }, []);
  const getServicePrice = (serviceName) => {
    const service = servicedata.find(
      (service) =>  (service.name_service === serviceName)
    );
 // Return the price or 0 if not found
    return service ? Number(service.price) : 0;
  };
  const getProductPrice = (serviceName) => {
    const p = dataP.find(
      (p) =>  (p.name === serviceName)
    );
 // Return the price or 0 if not found
    return p ? Number(p.price) : 0;
  };
  // const handleTagCloseClick = () => {
  //   setValue({ radioValue: '', checkboxesValue: [] });
  //   setalert('1px solid gray');
  // };
  // lenght products invoce
  const idPInvoice = invoiceD.filter((i) => i.invoice_type === 'Products').length;
  console.log('LengthPInvoice' , idPInvoice)
  const handleRadioChange = (value) => {
    // let arr = [];
    setValue({ radioValue: value, checkboxesValue: [] });
    setalert("1px solid gray");
    // arr.push(value);
    setStylistArray((prev)=> [...prev , value])
  };
  const toast = useToast();
  const [selectedServices, setSelectedServices] = useState([]);

  if (arrayOfObjects.length === 0 && servicedata.length > 0) {
    // If arrayOfObjects is empty, add new objects
    serviceDatas.forEach((element) => {
      const [stylistName, serviceNames] = element.split(" | ");
      const servicesArray = serviceNames.split(',').map(service => service.trim());

      // Create a new object for each service
      servicesArray.forEach((serviceName) => {
        loadServiceData();

        const selectedObject = {
          radioValue: stylistName,
          checkboxValue: serviceName,
          price: selectedMenuItem === 'Services' ? getServicePrice(serviceName) : getProductPrice(serviceName)
        };
  
        // Update arrayOfObjects with the new object
        setArrayOfObjects((prevArray) => [...prevArray, selectedObject]);
      });
  
      // Add the stylistName to the stylistArray
      setStylistArray((prev) => [...prev, stylistName]);
    });
  }
  
  // console.log(value);
  
  // console.log('selected' , selectedMenuItem)// const toast = useToast();
  
  const handleCheckboxChange = (checkboxValue) => {
    setbtnAlert("");
    if (!value.radioValue) {
      setalert("2px solid red");
      toast({
        position: "top",
        status: "warning",
        title: "Please Select stylist first",
        isClosable: true,
      });
      return;
    }
    else {
    // Check if the checkbox is already checked
    if (value.checkboxesValue.includes(checkboxValue)) {
      // If checked, remove the checkbox value from the state
      setValue((prevValue) => ({
        ...prevValue,
        radioValue: "",
        checkboxesValue: prevValue.checkboxesValue.filter(
          (value) => value !== checkboxValue
        ),
      }));

      // Also remove the corresponding object from the array
      setArrayOfObjects((prevArray) =>
        prevArray.filter(
          (obj) =>
            !(
              obj.radioValue === value.radioValue &&
              obj.checkboxValue === checkboxValue
            )
        )
      );
    } else {
      // If not checked, add the checkbox value to the state
      setValue((prevValue) => ({
        ...prevValue,
        checkboxesValue: [...prevValue.checkboxesValue, checkboxValue],
      }));

      // Create a new object for the selected radio value and checkbox value
      const selectedObject = {
        radioValue: value.radioValue,
        checkboxValue: checkboxValue,
        price: selectedMenuItem === 'Services' ?  getServicePrice(checkboxValue) : getProductPrice(checkboxValue)
      };

      // Add the new object to the array
      setArrayOfObjects((prevArray) => [...prevArray, selectedObject]);
    }
  };
}

  const handleRemoveService = (serviceName, name) => {
    setArrayOfObjects((prevSelected) =>
      prevSelected.filter((service) => service.checkboxValue !== serviceName)
    );
    setValue((prevValue) => ({
      radioValue: prevValue.radioValue === name ? "" : prevValue.radioValue,
      checkboxesValue: prevValue.checkboxesValue.filter(
        (value) => value !== serviceName
      ),
    }));
    // setValue({radioValue : ''})
    setEditedValues((prev) => ({
      ...prev,
      [serviceName]: {
        service: serviceName,
        value: 0,
      },
    }));

    // Optionally, you can reset the editedValue state for the removed service
    setEditedValue("");

    // Clear any alert or message related to the removed service
    setbtnAlert("");
  };

  //  console.log(arrayOfObjects);
 
  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "";
    });
  }, []);
  // search logic services 
  
  const handleChangeAmount = (e) => {
    setpaid(e.target.value)
//  setbalance(totalFinal2 - (e.target.value == '' ? paid : e.target.value))
  }
  useEffect(()=>{
    setbalance(totalFinal2 - paid);
    // settotalPrice(totalFinal);
    // settotalPrice2(totalFinal2);
    // setpaid(totalFinal2);
    // setbalance(totalFinal2 - paid);
  },[totalFinal , totalFinal2, paid ])
  
  
  const [filterData , setFilteredData] = useState([]);
  const [searchService , setsearchService] = useState('');
  useEffect(()=>{
    if(selectedMenuItem === 'Services'){
    setFilteredData(
      servicedata.filter((user)=>
      user.name_service.toLowerCase().includes(searchService.toLowerCase())
      )
    );
    }else if(selectedMenuItem === 'Products'){
      setFilteredData(
        dataP.filter((user)=>
      user.name.toLowerCase().includes(searchService.toLowerCase())))
    }
  },[searchService , servicedata , dataP , selectedMenuItem]);
  const [pData, setPData] = useState([]);
  // const dbpath1 = "http://localhost/backend/";

  const loadPData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getSPermision.php");
      const employeedata = response.data.phpresult;
      
      setPData(employeedata);

      // Set the initial state based on the fetched data
  
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadPData();
  }, []);
 const isGstOn = pData.some((i)=> i.status === '1');

 console.log('permissionData' , pData)
 console.log('isGstOn' , isGstOn);
  return (
    <>
    <Spinner display={servicedata.length > 0 ? 'none': 'block'} color="red"/>
      <Box
        color={"black"}
        // border={"1px solid green"}
        w={"full"}
        height={"fit-content"}
        p={2}
      >
        <Button
          color={"black"}
          borderBottom={
            location.pathname === "/Invoice" || "/invoice"
              ? "1px solid black"
              : ""
          }
          borderRadius={"none"}
        >
          INVOICE
        </Button>
        <Button color={"black"} as={Link} to={"/invoice-view"} opacity={0.5}>
          PREVIOUS INVOICES
        </Button>
        {selectdId ? (
          <Text
            border={"1px solid #131313"}
            mt={2}
            borderRadius="8px"
            color={"gray.900"}
            width={"fit-content"}
            p={2}
            fontFamily={"monospace"}
          >
            Appointment_ID : {selectdId}
          </Text>
        ) : (
          ""
        )}
      </Box>
      <Box display={"flex"} gap={4}>
        <Box
          h={"fit-content"}
          border={"1px solid gray"}
          // borderTop={'none'}
          flex={"60%"}
          // display={"flex"}
          gap={8}
          p={4}
          overflow={"hidden"}
        >
          <Box display={"flex"} borderBottom={"2px solid #dddd"} pb={4}>
            <InputGroup>
              <FormLabel color={"gray"} fontSize={"md"} mt={-4}>
                Customer
              </FormLabel>

              <InputLeftAddon
                children="+ 91"
                border={"1px solid gray"}
                color={"gray"}
                bg={"gray.100"}
                ml={-20}
                mt={4}
              />
              <Input
                type="text"
                _placeholder={{ color: "gray" }}
                _hover={{ border: "1px solid gray" }}
                border={"1px solid gray"}
                color="black"
                placeholder="Enter Number"
                ml={0}
                mt={4}
                value={clientData !== "" ? clientData : search}
                // value={clientData !== null ? setSearch(clientData) : search}
                onChange={filterClient}
              ></Input>
            </InputGroup>
            {suggestions.length > 0 && (
              <VStack
                align="start"
                spacing={0}
                w="20%"
                bg={"#121212"}
                top={"25%"}
                zIndex={9}
                transition={"ease-in 2s"}
                maxH={"25vh"}
                pos={"absolute"}
                overflowY={"scroll"}
                display={search == "" ? "none" : display3}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'teal',
                    borderRadius: '24px',
                  },
                }}
              >
                {suggestions.map((data) => (
                  <Tag
                    key={data.id}
                    color={"gray.300"}
                    // mb={0}
                    borderRadius={"none"}
                    onClick={() =>
                      handleSuggestionClick(data.name, data.mobile_number)
                    }
                    cursor="pointer"
                    display={service == "" ? "none" : "block"}
                    w={"full"}
                    _hover={{ bg: "teal" }}
                    p={2}
                  >
                    {data.name + " | " + data.mobile_number}
                  </Tag>
                ))}
              </VStack>
            )}
            <InputGroup>
              <FormLabel color={"gray"} mt={-4} position={"relative"} left={12}>
                Date
              </FormLabel>

              <Input
                type="date"
                _placeholder={{ color: "gray" }}
                color="black"
                placeholder="YYYY-MM-DD"
                border={"1px solid gray"}
                _hover={{ border: "1px solid gray" }}
                w={"fit-content"}
                mt={4}
                value={selectedDate}
              ></Input>
              <InputRightAddon
                children={
                  <>
                    <SlCalender />
                    &nbsp;Date{" "}
                  </>
                }
                border={" 1px solid gray"}
                color={"gray"}
                bg={"gray.100"}
                ml={0}
                mt={4}
              />
            </InputGroup>
          </Box>
          <Box h={"fit-content"} pb={4} mt={4}>
            <Text
              color="gray"
              borderBottom={"2px solid #dddd"}
              fontWeight={"medium"}
              pb={3}
            >
              Services
            </Text>
            <Table>
              <Thead>
                <Tr>
                  <Th>Stylist</Th>
                  <Th>Service</Th>
                  <Th>Qty.</Th>
                  <Th>Price</Th>
                  <Th>Disc</Th>
                  <Th>Total</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody border={"2px dashed gray"} textAlign={"center"}>
                <React.Fragment>
                  {/* {arrayOfObjects.map((obj, index) => {
                        const serviceData = servicedata.find(
                          (data) => data.name_service === obj.checkboxValue
                        );
      
                        if (serviceData) {
                          const InitialTotal = editedService == obj.checkboxValue ? serviceData.price - editedValue : serviceData.price;
                          console.log("Initial total" + " :" + InitialTotal);
                          totalFinal2 = InitialTotal + totalFinal2;
                          const prevInitialTotal = Number(serviceData.price);
                          totalFinal = prevInitialTotal + totalFinal; */}
                  {arrayOfObjects.map((obj, index) => {
                    const serviceData = servicedata.find(
                      (data) => data.name_service === obj.checkboxValue
                    );
                    const pData = dataP.find(
                      (data) => data.name === obj.checkboxValue
                    );

                    if (serviceData || pData) {
                      // const editedService = editedValues[obj.checkboxValue];
                      // // console.log(editedService);
                      // const InitialTotal =
                      //   editedService && selectedType === "flat"
                      //     ? "₹" +
                      //       (serviceData.price - Number(editedService.value))
                      //     : "₹" + Number(serviceData.price);
                      const editedService = editedValues[obj.checkboxValue];
                      const InitialTotal = editedService
                        ? serviceData ? serviceData.price : pData.price - editedService.value
                        : Number(serviceData ? serviceData.price : pData.price);

                      totalFinal2 = InitialTotal + totalFinal2;
                      const prevInitialTotal = Number(serviceData ? serviceData.price : pData.price);
                      totalFinal = prevInitialTotal + totalFinal;
                      

                      return (
                        <Tr
                          fontSize={"small"}
                          color={"black"}
                          textAlign={"center"}
                          key={index}
                        >
                          <Td>{obj.radioValue}</Td>
                          <Td>{obj.checkboxValue}</Td>
                          <Td textAlign={"center"}><Editable defaultValue='1'>
  <EditablePreview />
  <EditableInput />
</Editable></Td>
                          <Td>{"₹" + prevInitialTotal}</Td>

                          <Td
                            onDoubleClick={() =>
                               handleDoubleClick(obj.checkboxValue) 
                            }
                            cursor={"pointer"}
                          >
                            {isEditing && editedService ? (
                              <Input
                                type="number"
                                value={editedService.value}
                                onChange={(e) =>
                                  handleInputChange(obj.checkboxValue, e)
                                }
                                onBlur={() =>
                                  handleInputBlur(obj.checkboxValue)
                                }
                                borderRadius={"none"}
                                padding={"none"}
                                _hover={{
                                  border: "1px solid #121212",
                                }}
                                focusBorderColor="black"
                                border={"1px solid #121212"}
                              />
                            ) : (
                              <>
                                {selectedType === "flat" && editedService ? (
                                  <>{editedService.value + " | F"}</>
                                ) : (
                                  <> 0 | F </>
                                )}
                              </>
                            )}
                          </Td>
                          {/* <Td>{ editedService && obj.checkboxValue == editedService ? "₹" + InitialTotal : "₹" + Number(serviceData.price)}</Td> */}
                          <Td>{"₹" + InitialTotal}</Td>
                          <Td>
                            <IconButton
                              variant={"outline"}
                              isRound
                              boxShadow={btnAlert}
                              colorScheme="red"
                              icon={<IoClose />}
                              onClick={() =>
                                handleRemoveService(
                                  obj.checkboxValue,
                                  obj.radioValue
                                )
                              }
                              transition={"ease 0.3s"}
                            />
                          </Td>
                        </Tr>
                      );
                    }
                  })}
                </React.Fragment>
                {/* );
                  }

                  return null; // If serviceData is undefined, skip rendering this fragment
                })} */}
              </Tbody>
            </Table>
          </Box>
          <Box border={"2px dashed black"} display={"flex"}>
            <Box flex={"70%"}>
              <Menu>
                <MenuButton
                  as={Button}
                  color={"black"}
                  variant={"outline"}
                  border={"1px solid gray"}
                  rightIcon={<FaSort />}
                  m={3}
                >
                  {selectedMenuItem}
                </MenuButton>
                <MenuList>
        <MenuItem onClick={() => handleMenuItemClick('Services')} >Services</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Products')}>Products</MenuItem>
      </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  color={"black"}
                  variant={"outline"}
                  border={alert}
                  rightIcon={<FaSort />}
                  ml={4}
                  m={3}
                  display={'felx'}
                  transition={"ease-in 0.3s"}
                  _after={{
                    position: "absolute",
                    left: "100%",
                    bottom: "75%",
                    content: '"*"',
                    fontSize: "15px",
                    color: "red",
                    fontWeight: "bold",
                    
                  }}
                >
                  {value.radioValue == '' ? 'Stylist' : value.radioValue}
                </MenuButton>
                <MenuList maxH={"30dvh"} overflow={"auto"}  css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c4c4c4',
                  // borderRadius: '24px',
                },
                
              }}>
                  <RadioGroup
                    value={value.radioValue}
                    onChange={(value) => handleRadioChange(value)}
                  >
                    {Edata.map((i, key) => (
                      <MenuItem
                        index={key}
                        // onClick={() => {
                        //   handleRadioClick(i.name);
                        // }}
                        // value={i.name}
                      >
                        <Radio value={i.name}>{i.name}</Radio>
                      </MenuItem>
                    ))}
                  </RadioGroup>
                </MenuList>
              </Menu>
              <Input
                h={"40px"}
                w={value.radioValue == '' ? '40%' : "30%"}
                pos={"relative"}
                top={"3px"}
                ml={4}
                border={"1px solid #121214"}
                placeholder="Search..."
                value={searchService}
                onChange={(e)=>{setsearchService(e.target.value)}}
                _placeholder={{ color: "gray" }}
                _hover={{ border: "1px solid black" }}
                cursor={"pointer"}
                color={"#121212"}
              />
              {/* <Box
                // border={"1px solid red"}
                w={"fit-content"}
                // ml={3}
                display={arrayOfObjects.radioValue == "" ? "none" : "block"}
              >
                {arrayOfObjects.map((i) => (
                  <Tag color={"teal"} p={3} bg={"gray.200"} >
                    {i.radioValue}
                  </Tag>
                ))}
              </Box> */}
              <Box textAlign={"left"} display={"felx"} maxH={"28dvh"}  overflowY={'scroll'}
              //  boxShadow={'0px 0px 5px gray'}
              // border={'3px solid green'}
              p={3}
               css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c4c4c4',
                  borderRadius: '24px',
                },
                
              }}
              >
                <VStack
                  color={"black"}
                  alignItems={"flex-start"}
                  // m={3}
                  w={"100%"}
                  // border={'1px solid green'}
                >
                  {filterData.map((item, index) => {
                    const matchObject = arrayOfObjects
                      .map((i) => i.checkboxValue)
                      .includes(selectedMenuItem === 'Services' ? item.name_service : item.name);
                    //  const mo2 = matchObject.includes(item.name_service);
                    // console.log("mathcObject" + ":" + matchObject);

                    return (
                      <Box key={index} display={"flex"}  p={'1px 10px'} width={'100%'} 
                       justifyContent={'space-between'}
                       >
                        <Text
                          display={"felx"}
                          textDecoration={matchObject ? "line-through" : ""}
                          transition={"ease 0.3s"}
                          // pos={'absolute'}
                          textTransform={'uppercase'}
                        >
                          {selectedMenuItem === 'Services' ? item.name_service : item.name }
                        </Text>
                        {/* <Box pos={'relative'} left={"40%"}> */}
                          <Checkbox
                            value={selectedMenuItem === 'Services' ? item.name_service : item.name}
                            border={"#121212"}
                            colorScheme={matchObject ? "red" : "teal"}
                            opacity={matchObject ? 0.8 : ""}
                            isChecked={
                              matchObject
                                ? true
                                : value.checkboxesValue.includes(
                                    selectedMenuItem === 'Services' ? item.name_service : item.name
                                  )
                            }
                            onChange={
                              matchObject
                                ? () => {
                                    toast({
                                      position: "top",
                                      status: "error",
                                      title: "Note",
                                      description:
                                        "Click Action Button to Remove the Service !",
                                      isClosable: true,
                                    });
                                    //  s
                                    setbtnAlert(
                                      "0px 0px 11px 4px rgba(235,26,116,1)"
                                    );
                                    setTimeout(() => {
                                      setbtnAlert("");
                                    }, 1200);
                                  }
                                : () => handleCheckboxChange(selectedMenuItem === 'Services' ? item.name_service : item.name)
                            }
                            // pos={'abs'} left={'40%'}
                            // pointerEvents={matchObject ? 'none' : ''}
                            // onClick={matchObject ? ()=>{alert('Click The close button adjecent ot service')} : ''}
                          >
                            {" "}
                          </Checkbox>
                        {/* </Box> */}
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            </Box>
            <Box flex={"30%"} borderLeft={"1px dashed gray"}>
              <Center>
                <Text
                  color={"orange"}
                  borderBottom={"2px solid orange"}
                  fontSize={"large"}
                  fontWeight={"semibold"}
                >
                  Total
                </Text>
              </Center>
              <VStack
                color={"black"}
                alignItems={"flex-start"}
                ml={2}
                mt={2}
                fontSize={"sm"}
              >
                <Text>Subtotal : {"₹" + Number(totalFinal)}</Text>
                <Text>Discount : {"₹" + (totalFinal - totalFinal2)} </Text>
                <Text>Net: {"₹" + totalFinal2}</Text>
               {isGstOn ? ( <><Text>SGST(9%) : {"₹" + (totalFinal2 * 9) / 100}</Text>
                <Text>CGST(9%) : {"₹" + (totalFinal2 * 9) / 100} </Text> </>
               ) : (
                 <><Text>SGST(9%) : {"₹" + 0}</Text>
                <Text>CGST(9%) : {"₹" + 0} </Text> </> )}
                <Text display={"flex"}>
                  Tip : &nbsp;
                  <Input
                    type="number"
                    border={"1px solid gray"}
                    _hover={{ border: "1px solid gray" }}
                    w={"80%"}
                    size={"sm"}
                  />{" "}
                </Text>
                <Text display={display2}>
                  Payment:{" "}
                  {"₹" + Number(totalFinal2)}{" "}
                  <Tag color={"teal"} bg={"gray.200"}>
                    {service}{" "}
                    <TagCloseButton
                      onClick={() => {
                        setService("");
                        setdisplay2("none");
                      }}
                    />
                  </Tag>{" "}
                </Text>
                <Text fontWeight={"semibold"}>
                  Total :{" "}
                  {isGstOn ?  "₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2) : "₹" + Number(totalFinal2 )}{" "}

                </Text>
                <Text display={"flex"}>
                  {" "}
                  Paid :
                  <Text color={"teal"} display={display2}>
                    {"₹" + Number(paid)}{" "}
                  </Text>{" "}
                </Text>
                <Text display={"flex"}>
                  Balance : 
                  <Text color={"red"} display={display2}>
                    {"₹" + Number(balance)}
                  </Text>{" "}
                </Text>
              </VStack>
            </Box>
          </Box>
        </Box>
        {/* Right Component */}
        <Box
          flex={"40%"}
          border={"1px solid gray"}
          h={"fit-content"}
          textAlign={"left"}
          pb={4}
          // borderTop={'none'}
        >
          <VStack
            color={"black"}
            textAlign={"left"}
            alignItems="start"
            ml={3}
            mt={2}
            borderBottom={"3px solid #dddd"}
            pb={2}
          >
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Name : </Text>&nbsp;{" "}
              <Text bg={"gray.300"} p={2}>
                {clientData === ""
                  ? Cname
                  : (Fclientname && Fclientname.name) || "Client Not Found"}
              </Text>
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Membership :</Text>
              &nbsp;membership_expire
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Total Visit : </Text>
              &nbsp;YYYY/MM/DD
            </Text>
            <Text display={"flex"}>
              <Text fontWeight={"semibold"}>Last Visit :</Text>&nbsp; YYYY/MM/DD
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Points :</Text>&nbsp; user_points
            </Text>
          </VStack>
          <VStack
            color={"black"}
            h={"fit-content"}
            alignItems="start"
            ml={3}
            mt={2}
          >
            <Text display={"flex"}>
              {" "}
              {/* <Text fontWeight={"semibold"}>
                Service Total : {"₹" + Number(totalFinal2)}{" "}
              </Text> */}
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Discount: </Text>
              <RadioGroup
                defaultValue="perc"
                onChange={(e) => handleTypeChange(e)}
                isDisabled={true}
              >
                <Stack spacing={5} direction="row" ml={4} mt={-1}>
                  <Radio
                    colorScheme="orange"
                    value="perc"
                    border={"2px solid gray"}
                  >
                    Percentage
                  </Radio>
                  <Radio
                    colorScheme="orange"
                    value="flat"
                    border={"2px solid gray"}
                  >
                    Flat
                  </Radio>
                  <Input
                    type="number"
                    color={"black"}
                    border={"1px solid gray"}
                    w={"fit-content"}
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid gray" }}
                    placeholder="Enter price/percentage"
                    mr={2}
                    h={"fit-content"}
                    borderRadius={"none"}
                    p={1}
                    value={selectedType == "perc" ? percentageValue : flatValue}
                    onChange={(e) => handleInputChange(e)}
                    isDisabled={true}
                  />
                </Stack>
              </RadioGroup>
            </Text>
          </VStack>
          <HStack mt={6} ml={2}>
            <Button colorScheme="blackAlpha" isDisabled>
              Continue without payment
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                setdisplayS("block");
              }}
            >
              Add Payment
            </Button>
            <Button
              colorScheme="blackAlpha"
              color={"black"}
              display={displatS}
              onClick={() => {
                setService("");
                setdisplayS("none");
                setdisplay2("none");
              }}
            >
              {" "}
              <IoClose />{" "}
            </Button>
          </HStack>
          <HStack
            mt={2}
            color={"gray.800"}
            fontWeight={"semibold"}
            ml={2}
            overflow={"hidden"}
            p={1}
            display={displatS}
          >
            <Grid
              templateColumns="repeat(4, 1fr)"
              gap={2}
              pt={2}
              pos={"relative"}
              transition={"ease 0.3s"}
              textAlign={"center"}
              alignItems={"center"}
            >
              <Text color="black" w={"fit-content"} mr={0} fontWeight={"thin"}>
                {" "}
                Payment Mode
              </Text>
              {PaymentMode.map((item) => (
                <GridItem
                  w="100%"
                  h="fit-content"
                  p={2}
                  bg={item === service ? "yellow.200" : "gray.200"}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  cursor={"pointer"}
                  // pointerEvents={item === "CASH" ? "pointer" : "none"}
                >
                  {item}
                </GridItem>
              ))}
            </Grid>
            {/* Cash Payment From  */}
            <Box mt={3} display={service === " " ? "none" : "block"}>
              <Text fontWeight={"thin"}>
                Amount :{" "}
                {/* <span style={{ fontWeight: "bold" }}>
                  {"₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2)}{" "}
                </span> */}
                <span style={{ fontWeight: "bold" }}>
                  {"₹" + Number(totalFinal2)}{" "}
                </span>
                <Tag colorScheme='green'>{service}</Tag>
              </Text>
              <Text display={"felx"} mt={2} fontWeight={"thin"}>
                Paid Amount : 
                <Input
                  type="number"
                  w={'fit-content'}
                  m={2}
                  border={"1px solid gray"}
                  _hover={{ border: "1px solid gray" }}
                  value={paid}
                  onChange={(e) => {handleChangeAmount(e)}}
                />
                <Tag
                mt={2}
                p={3}  
                 colorScheme={balance == 0 ?'teal':'red'} color={  balance == 0 ?'teal':'red'}>Balance : {balance}</Tag>
              </Text>
              <Button
                variant={"outline"}
                colorScheme="orange"
                mt={3}
                onClick={() => {
                  setdisplay2("block");
                }}
              >
                Add
              </Button>
            </Box>
            <Box display={display2}>
              {/* <Text mt={4} fontWeight={"thin"}>
                Description :{" "}
                <Textarea
                  border={"1px solid gray"}
                  _hover={{ border: "1px solid gray" }}
                ></Textarea>
              </Text> */}
              <hr style={{background:'black' , margin:'10px'}}/>
              <Text display={"flex"} mt={3}>
                Send Invoice on :{" "}
                <RadioGroup defaultValue="2">
                  <Stack spacing={5} direction="row" ml={4} mt={0}>
                    <Radio
                      colorScheme="orange"
                      value="1"
                      border={"2px solid gray"}
                    >
                      SMS
                    </Radio>
                    <Radio
                      colorScheme="orange"
                      value="2"
                      border={"2px solid gray"}
                    >
                      Email
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Text>
              <Box mt={2}>
                <Center>
                  <Button
                    variant={"solid"}
                    colorScheme='blackAlpha'
                    onClick={() => {
                      setService("");
                      setdisplayS("none");
                      setdisplay2("none");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"solid"}
                    colorScheme="orange"
                    as={Link}
                    ml={2}
                    // selectedMenuItem === 'Services'
                    // ? `INV|${selectedDate}|KRUB|${selectdId}`
                    // : selectedMenuItem === 'Products'
                    // ? `INV|${curdate}|KRUB|PROD` // Fixed this line
                    // : '', 
                    
                    //  
                    to={ selectedMenuItem === 'Services' ? `/invoicegernrate/INV|${selectedDate}|KRUB|${selectdId}` : selectedMenuItem === 'Products' ? `/invoicegernrate/INV|${curdate}|KRUB|PROD|${idPInvoice}`: ''}
                    // onClick={() => {
                    //   updateSelectedData(Datapost , selectedServices, selectedDate , "₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2));
                    // }}
                    onClick={insertData}
                  >
                    Generate
                  </Button>
                </Center>
              </Box>
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
