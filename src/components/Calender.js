import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Select,
  Text,
  Input,
  ButtonGroup,
  FocusLock,
  PopoverCloseButton,
  Stack,
  useToast,
  Heading,
  Center,
  Checkbox,
  VStack,
  InputLeftAddon,
  TableContainer,
  TableCaption,
  Tfoot,
  InputGroup,
  Spinner,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  IconButton,
  Flex,
  Tooltip,
  Avatar,
  Icon,
  Card,
  CardBody,
  Stat,
  StatNumber,
  StatHelpText, // Add Input component
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

  // Center,
  // VStack,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Link, Route, Link as RouteLink } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
// The default icon size is 1em (16px)

// import {

//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from '@chakra-ui/react';
// import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import {
  BsPersonFillAdd,
  BsScissors,
  BsCalendarDateFill,
  BsFillCaretUpFill,
  BsCaretDownFill,
  BsCaretUpFill,
} from "react-icons/bs";
import { IoIosAdd, IoMdClock } from "react-icons/io";
import { RiUserLocationFill } from "react-icons/ri";
import { GrNext, GrPrevious } from "react-icons/gr";
import { GiAlarmClock, GiCardRandom, GiMoneyStack } from "react-icons/gi";
import {
  BiSolidUser,
  BiSolidUserCheck,
  BiSolidAddToQueue,
  BiAddToQueue,
} from "react-icons/bi";
import { IoCalendar } from "react-icons/io5";
import { MdDeleteOutline, MdPunchClock } from "react-icons/md";
// import DropdownWithCheckboxes from "./util/Services";
// import Data2 from "./util/Employee";
import { FaPhoneAlt, FaSearch, FaUser } from "react-icons/fa";
import AddClient from "./AddClient";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useAppContext } from "./context/AppContext";

// import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'










function DailyTimetable() {
  const [isLoading, setIsLoading] = useState(true);
  // Example data for employees and hours
  const [data, setData] = useState([]);
  const [bookedStylist, setBookedStylist] = useState([])
  const [match, setMatch] = useState({})
  
  const [Edata, setEData] = useState([]);


  const hours = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];
const newDate = new Date()
console.log(newDate)
  const [currentDate, setCurrentDate] = useState(new Date());

  // const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  // const [isAppointmentSubmitted, setIsAppointmentSubmitted] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  // const [newEmployeeName, setNewEmployeeName] = useState("");
  // New employee's name
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  const goToNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
    // setIsAppointmentSubmitted(false);
  };

  const goToPreviousDate = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDate);
    // setIsAppointmentSubmitted(false);
  };

  // const handleCellClick = (time, employee,index) => {
    
  //   setSelectedHour(time);
  //   setSelectedTime(time);
  //   setSelectedEmployee(employee);
  //   // setIsPopoverOpen(true);
  //   setSelectAptoption((prevOptions) => {
  //     const newOptions = [...prevOptions];
  //     newOptions[index].stylistN = employee;
  //     return newOptions;
  //   });
  //   openModal();
  //   // console.log("opened");
  //   //   //
  //   //   setClient("");
  //   // setSelectedOption("");
  // };
  
  
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSpecifClick = (stime, semployee) => {
    setSelectedHour(stime);
    setSelectedEmployee(semployee);
    onOpen();
    console.log('Left Clicked Pressed')
  };

  // const closePopover = () => {
  //   setIsPopoverOpen(false);
  // };

  const toast = useToast();

  const successToast = {
    title: "Appointment Saved",
    description: "The appointment has been saved successfully.",
    status: "warning",
    position: "top",
    duration: 5000, // Display duration in milliseconds
    isClosable: true,
    // variant : 'left-accent'
  };
  const submitAppointment = () => {
    const appointmentData = {
      // selectedData2, // stylist
      // selectedItems, //services
      selectAptoption,
      client, //clientname
      selectedDate: formattedDate, //date
      startTime: selectedTime, // Assuming you have selectedTime in your state
      endTime: formattedEndTime, // You need to calculate or fetch end time based on service duration
      price: totalPrice, //price
      status: "scheduled", // Assuming you have totalPrice in your state
    };

    axios
      .post("http://localhost/backend/create-app.php", appointmentData)
      .then((response) => {
        console.log("Data created:", response.data);
        toast(successToast);
        setIsModalOpen(false);
        EditTest();
        setClient("");
        setSelectedItems([]);
        setSelectedData2("");
        setSelectedTime("");
        loadData();

        // You might want to do something after a successful submission
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  };
  const dbpath1 = "http://localhost/backend/";

  const loadData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getDataapt.php");
      const data = response.data.phpresult;
      console.log("appoinment", data)
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(true);
    }
  };
  // console.log(data[0].appointment_option[0].service[0]);

  useEffect(() => {
    loadData(); // Call the loadData function when the component mounts
  }, []);
// 
// invoice data
const [invoiceD , setInvoiceD] = useState([]);
const loadInvoiceData = async () => {
  try {
    const response = await axios.get(dbpath1 + 'getInvoicedata.php');
    const data = response.data;
      setInvoiceD(data);
      setIsLoading(false);
    
  } catch (error) {
    console.error('Error loading data:', error);
    setIsLoading(true);
  }
};
// console.log(invoiceD);
useEffect(()=>{
 loadInvoiceData()
},[])


  // get Employee Data

  const loadEmployeeData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getEmployeedata.php");
      const Employeedata = response.data.phpresult;
      console.log("Employeedata",Employeedata);
      setEData(Employeedata);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadEmployeeData(); // Call the loadData function when the component mounts
  }, []);

  // console.log(Edata);

  // fetch service data
  const [servicedata, setServiceData] = useState([]);

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

  const [selectedStylist, setSelectedStylist] = useState({});

  const handleStylistChange = (e) => {
    const selectedStylistName = e.target.value;
    // Find the stylist object in your data that matches the selected name
    const selectedStylist = Edata.find(
      (stylist) => stylist.name === selectedStylistName
    );
    setSelectedStylist(selectedStylist);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHour('');
    setSelectedTime('');
    // setClient("")
    setSelectedEmployee('');
    setSelectAptoption((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[0] = {
        ...newOptions[0],
        stylistN: '',
      };
      return newOptions;
    });
  };
  // const TimeSlots = {'9:00AM'}
  const [displayS, setdisplays] = useState("none");
  const [displayS2, setdisplays2] = useState("block");

  const [pointertest, setPointertest] = useState("");
  const [bgTest, setbgtest] = useState("transparent");

  function clicktest() {
    // setdisable(true);

    let a = "block";
    setdisplays(a);
    setPointertest("none");
    setbgtest("teal");
    setdisplays2("none");
    //   setselectAptoption([{
    //     stylistN : {selectedData2} , service : [selectedItems]
    //  }])
  }
  function EditTest() {
    setdisplays("none");
    // setdisable(false);
    setPointertest(" ");
    setbgtest("transparent");
    setdisplays2("block");
  }

  // Add a state to manage the "Next" button's disabled status
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [client, setClient] = useState("");

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  // Define a function to update the "Next" button's disabled status based on input field values

  const [filteredData, setFilteredData] = useState([]);

  const loadFilteredData = () => {
    // Filter the data based on the selected service name
    const filteredData = servicedata.filter(
      (item) => item.name_service === selectedItems.name_service
    );
    setFilteredData(filteredData);
  };
  // console.log(selectedService)

  useEffect(() => {
    loadFilteredData();
  }, [selectedService]);

  const [selectedData2, setSelectedData2] = useState("");
  const [selectAptoption, setSelectAptoption] = useState([
    {
      id: 1,
      stylistN: "",
      service: [],
      Initial_T: "",
      End_T: "",
      status: "scheduled",
    },
  ]);
  //
  const handleCellClick = (time, employee) => {
    // console.log('Before State Update:', selectAptoption);
  if(employee && time ) {
    setSelectedHour(time);
    setSelectedTime(time);
    setSelectedEmployee(employee);
  
    setSelectAptoption((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[0] = {
        ...newOptions[0],
        stylistN: employee,
      };
      return newOptions;
    });
  
  
    openModal();
  }else{
    openModal();
    
  }
    // )
  };
 
    console.log('State Update:', selectAptoption[0].Initial_T);

useEffect(()=> {
const final = bookedStylist.find((item)=> selectAptoption[0].Initial_T == item.init_T )
console.log("final", final)
setMatch(final)

if(final){
  let filterEmployeeData =  Edata?.filter((item) => item?.name != final.stylist_Name)
  // Edata?.filter((item) =>{
    //   if()
    //   console.log(item.name)
    // })
    // console.log("final priya Sharma",final.stylist_Name)
 setEData(filterEmployeeData)
}



},[selectAptoption])

  //
  const TimeSlots = [
    "9:00 AM",
    "9:15 AM",
    "9:30 AM",
    "9:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "1:00 PM",
    "1:15 PM",
    "1:30 PM",
    "1:45 PM",
    "2:00 PM",
    "2:15 PM",
    "2:30 PM",
    "2:45 PM",
    "3:00 PM",
    "3:15 PM",
    "3:30 PM",
    "3:45 PM",
    "4:00 PM",
    "4:15 PM",
    "4:30 PM",
    "4:45 PM",
    "5:00 PM",
    "5:15 PM",
    "5:30 PM",
    "5:45 PM",
    "6:00 PM",
    "6:15 PM",
    "6:30 PM",
    "6:45 PM",
    "7:00 PM",
    "7:15 PM",
    "7:30 PM",
    "7:45 PM",
    "8:00 PM",
    "8:15 PM",
    "8:30 PM",
    "8:45 PM",
    "9:00 PM",
    "9:15 PM",
    "9:30 PM",
    "9:45 PM",
    "10:00 PM",
  ];
 
  const handleTimeChange = (e) => {
    const newSelectedTime = e.target.value;
    setSelectedTime(newSelectedTime);
    setSelectAptoption((prevOptions) => {
      const updatedOptions = prevOptions.map((option, index) => {
        if (index === 0) {
          const { totalTime } = fetchTimeAndPrice(option.service);
          return {
            ...option,
            Initial_T:
              index > 0 ? prevOptions[index - 1].End_T : newSelectedTime,
            End_T: calculateEndTime(newSelectedTime, totalTime),
          };
        }
        return option;
      });

      // Update Initial_T and End_T for subsequent elements
      for (let i = 1; i < updatedOptions.length; i++) {
        const { totalTime } = fetchTimeAndPrice(updatedOptions[i].service);
        updatedOptions[i].Initial_T = updatedOptions[i - 1].End_T;
        updatedOptions[i].End_T = calculateEndTime(
          updatedOptions[i].Initial_T,
          totalTime
        );
      }

      return updatedOptions;
    });
    console.log("Seee",selectAptoption);
  };

  //  console.log(data);
  const handleServiceChange = (e) => {
    const selectedServiceName = e.target.value; // Get the selected service name from the event

    // Check if the selected service name is not empty
    if (selectedServiceName) {
      const service = servicedata.find(
        (item) => item.name_service === selectedServiceName
      );

      setSelectedOption(selectedServiceName);
      setSelectedService(service);
    } else {
      // Handle the case when no service is selected (optional)
      setSelectedOption("");
      setSelectedService({});
      // setEndTime("");
    }
  };
  //

  const [Clientdata, setClinetData] = useState([]);

  const loadCData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getClientData.php"
      );
      const data = response.data.phpresult;
      setClinetData(data);
       console.log("data",data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadCData();
  }, []);

  // console.log('Input Value: ' + client);
  const [suggestions, setSuggestions] = useState([]);
  const filterClient = (e) => {
    // Check if the event object is provided
    if (e && e.target) {
      const inputValue = e.target.value;
      setClient(inputValue);
      // console.log("Input Value: " + inputValue);
    }
    //   const filteredSuggestions = Clientdata.filter((data) =>
    //   data.mobile_number.toLowerCase().includes(client.toLowerCase())
    // );
    const filteredSuggestions = Clientdata.filter(
      (data) =>
        data.mobile_number.toLowerCase().includes(client.toLowerCase()) ||
        data.name.toLowerCase().includes(client.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  const handleSuggestionClick = (name, number) => {
    // Handle suggestion click, set the selected client, and clear suggestions
    setSuggestions([]);
    setClient(name + " | " + number);

    // let m = true;
  };
  useEffect(() => {
    // Your logic inside the useEffect hook (if needed)

    // Example: Make an API call, update other state variables, etc.
    // handleSuggestionClick();
    // Call the filterClient function when the client state changes
    filterClient();
  }, [client]);

  const [disabled, setDisabled] = useState(false); // Start with the button disabled

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      setDisabled(false);
      setIsNextButtonDisabled(true);

      // setServices2(selectedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
      setIsNextButtonDisabled(false);

      setDisabled(true);
    }
  };
  // staff selection

  const toggleItem2 = (stylistName, index) => {
    setSelectAptoption((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index].stylistN = stylistName;
      return newOptions;
    });
  };


  const addSpecificService = () => {
    setSelectAptoption((prevOptions) => {
      const lastOption = prevOptions[prevOptions.length - 1];
      const newInitialTime = lastOption ? lastOption.End_T : "";
      const calculatedEndTime = newInitialTime
        ? calculateEndTime(newInitialTime, totalTime)
        : "";

      return [
        ...prevOptions,
        {
          id: lastOption ? lastOption.id + 1 : 1,
          stylistN: "",
          service: [],
          Initial_T: newInitialTime,
          End_T: calculatedEndTime,
          status: "scheduled",
        },
      ];
    });
  };
  // console.log(data[0]);
  const toggleService = (serviceName, index) => {
    setSelectAptoption((prevOptions) => {
      const newOptions = [...prevOptions];
      const selectedServices = newOptions[index].service;

      if (selectedServices.includes(serviceName)) {
        // Deselect the service
        newOptions[index].service = selectedServices.filter(
          (service) => service !== serviceName
        );
      } else {
        // Select the service
        newOptions[index].service = [...selectedServices, serviceName];
      }

      // Use fetchTimeAndPrice to calculate the total time
      const { totalTime } = fetchTimeAndPrice(newOptions[index].service);

      // Update Initial_T and End_T for the current element
      newOptions[index].Initial_T =
        index > 0 ? newOptions[index - 1].End_T : selectedTime;
      newOptions[index].End_T = calculateEndTime(
        newOptions[index].Initial_T,
        totalTime
      );

      // Update Initial_T and End_T for subsequent elements
      for (let i = index + 1; i < newOptions.length; i++) {
        newOptions[i].Initial_T = newOptions[i - 1].End_T;
        newOptions[i].End_T = calculateEndTime(
          newOptions[i].Initial_T,
          totalTime
        );
      }

      return newOptions;
    });
  };

  //xxx

  useEffect(() => {
    updateNextButtonDisabled();
  }, [selectAptoption]);

  // console.log(selectedItems);
  const updateNextButtonDisabled = () => {
    if (
      client === "" ||
      // selectedService.name_service == "" ||
      selectedTime === "" ||
      selectAptoption[0].service.length === 0 ||
      selectAptoption[0].stylistN == ""
      // suggestions.length > 0
    ) {
      setIsNextButtonDisabled(true);
    }
    // else if (selectedItems > 0){
    //  setIsNextButtonDisabled(false);
    // }
    else {
      setIsNextButtonDisabled(false);
    }
    // setIsNextButtonDisabled(!client || !selectedService.name_service || !selectedTime);
  };
  // console.log(selectedTime);
  // Selction condition from data2 checkboxes
  const handleStylistSelect = (stylistSelected) => {
    setIsNextButtonDisabled(!stylistSelected);
  };

  // Call the updateNextButtonDisabled function whenever input fields change
  useEffect(() => {
    updateNextButtonDisabled();
  }, [client, selectedItems, selectedTime]);
  // Function to update the 'disabled' state in this component
  const updateDisabled = (value) => {
    setDisabled(value);
  };
  
  function fetchTimeAndPrice(selectedServices) {
    // Initialize total time and total price
    let totalTime = 0;
    let totalPrice = 0;
    if (selectedServices && selectedServices.length > 0) {
    // Iterate over selected services and accumulate total time and total price
    selectedServices.forEach((serviceName) => {
      const serviceData = servicedata.find(
        (data) => data.name_service === serviceName
      );
      if (serviceData) {
        // Extract the price from the selected service data and convert it to a number
        const servicePrice = Number(serviceData.price.replace("₹", ""));
        totalPrice += servicePrice;

        // Accumulate total time
        totalTime += Number(serviceData.time);
      }
    });
  }
    // Convert total time to hours and minutes
    const h = Math.floor(totalTime / 60);
    const m = totalTime % 60;

    return { totalTime, totalPrice, h, m };
  
}

function fetchTimeAndPrice2(selectedServices) {
  // Initialize total time and total price
  let totalTime = 0;
  let totalPrice = 0;

  // Check if selectedServices is defined and has the necessary structure
  if (selectedServices && selectedServices.length > 0) {
    selectedServices.forEach((option) => {
      // Check if the 'service' property exists and is an array
      if (option.service && Array.isArray(option.service)) {
        option.service.forEach((serviceName) => {
          const serviceData = servicedata.find(
            (data) => data.name_service === serviceName
          );
          if (serviceData) {
            // Extract the price from the selected service data and convert it to a number
            const servicePrice = Number(serviceData.price.replace("₹", ""));
            totalPrice += servicePrice;

            // Accumulate total time
            totalTime += Number(serviceData.time);
          }
        });
      }
    });
  }

  // Convert total time to hours and minutes
  const h = Math.floor(totalTime / 60);
  const m = totalTime % 60;

  return { totalTime, totalPrice, h, m };
}

  // Example usage
  const { totalTime, totalPrice, h, m } = fetchTimeAndPrice2(selectAptoption);
  // console.log(h + ':' + m);
  // console.log(selectAptoption);

  // Other code...

  function calculateEndTime(startTime, serviceDuration) {
    // Extract hours, minutes, and period (AM/PM) from the start time
    const match = startTime.match(/^(\d+):(\d+)\s?([APMapm]{2})$/);

    if (!match) {
      // console.error('Invalid start time format');
      return;
    }

    const [, startHour, startMinute, period] = match.map((matchPart) =>
      isNaN(Number(matchPart)) ? matchPart : Number(matchPart).toString()
    );

    // Adjust hours based on the period (AM/PM)
    const adjustedStartHour =
      period.toUpperCase() === "PM" && startHour !== "12"
        ? Number(startHour) + 12
        : Number(startHour);

    // Calculate total minutes from the adjusted start time
    const totalStartMinutes = adjustedStartHour * 60 + Number(startMinute);

    // Calculate the end time in total minutes
    const totalEndMinutes = totalStartMinutes + serviceDuration;

    // Calculate the hours and minutes for the end time
    const endHour = Math.floor(totalEndMinutes / 60) % 12 || 12; // Ensure it's in 12-hour format
    const endMinute = totalEndMinutes % 60;

    // Determine the period (AM/PM) for the end time
    const endPeriod = Math.floor(totalEndMinutes / 60) < 12 ? "AM" : "PM";

    // Format the end time
    const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")} ${endPeriod}`;

    // console.log(formattedEndTime);
    return formattedEndTime;
  }

  const formattedEndTime = calculateEndTime(selectedTime, totalTime);
  // const intervalMinutes = 15;
  function compareStartTime(selected_slot, start_time) {
    if (!start_time || !selected_slot) {
      // console.error("Invalid start time or selected slot");
      return false;
    }

    // Extract hours, minutes, and period (AM/PM) from the start time
    const startMatch = start_time.match(/^(\d+):(\d+)\s?([APMapm]{2})$/);

    if (!startMatch) {
      console.error("Invalid start time format");
      return;
    }

    const [ ,startHour, , startPeriod] = startMatch.map((matchPart) =>
      isNaN(Number(matchPart)) ? matchPart : Number(matchPart).toString()
    );

    // Extract hours, minutes, and period (AM/PM) from the selected slot
    const slotMatch = selected_slot.match(/^(\d+):(\d+)\s?([APMapm]{2})$/);

    if (!slotMatch) {
      console.error("Invalid selected slot format");
      return;
    }

    const [, slotHour, , slotPeriod] = slotMatch.map((matchPart) =>
      isNaN(Number(matchPart)) ? matchPart : Number(matchPart).toString()
    );

    // Compare hours and AM/PM
    const startHourInt = parseInt(startHour, 10);
    const slotHourInt = parseInt(slotHour, 10);

    if (
      startHourInt === slotHourInt &&
      startPeriod.toUpperCase() === slotPeriod.toUpperCase()
    ) {
      // console.log("Selected slot is equal to the start time.");
      return true;
    } else {
      // console.log("Selected slot is not equal to the start time.");
    }
  }

  // Example usage
  // compareStartTime('9:00 AM', '9:00 AM'); // This should log 'Selected slot is equal to the start time.'
  // compareStartTime('10:30 AM', '9:00 AM'); // This should log 'Selected slot is not equal to the start time.'
  function timeDifferenceInMinutes(startTime, endTime) {
    // Define the time format
    const timeFormat = "h:mm A";

    // Parse the time strings into Date objects
    const startDate = new Date("2023-01-01 " + startTime);
    const endDate = new Date("2023-01-01 " + endTime);

    // Calculate the time difference in minutes
    const timeDifference = (endDate - startDate) / (60 * 1000);

    return Math.floor(timeDifference);
  }
  // console.log(stylistServicesArray);
  // status manupuation
  // console.log(data)
  const updateAppointmentStatus = async (
    appointmentId,
    newStatus,
    serviceId
  ) => {
    try {
      const response = await axios.post(
        "http://localhost/backend/updateS.php",
        {
          appointmentId: appointmentId,
          newStatus: newStatus,
          serviceId: serviceId,
        }
      );
      loadData();
      if (response.data.success) {
        // console.log("Status updated successfully",response.data.success);
        // Optionally, you can update the UI or take other actions here
      }
      //   console.error('Error updating status:', response.data.error);
      //   // Handle errors gracefully, e.g., display an error message to the user
      // }
    } catch (error) {
      console.error("Error updating status:", error.message);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };
  const { updateClientData, updateServiceData, updateSelectedDate , updateSelectedid ,  updateStylist } =
    useAppContext();
const [align , setalign] = useState(false);
const [open3 , setOpen3] = useState(false);
function rightClickUpdate(e){
 e.preventDefault();
//  console.log('Right Click Pressed')
setOpen3(true);
}
function closeOpen3(){
  setOpen3(false);
}

// const [filterData,setFilterData] = useState([]);

// // const callOnModalOpen =()=>{
//   const last = "11:30 AM";
//   const lastIndex = TimeSlots.indexOf(last); // Find the index of "11:30 AM"
//   const nextTimeSlots = TimeSlots.slice(lastIndex + 1); // Create a new array starting from the next index
//   setFilterData(nextTimeSlots);
//   // Now, nextTimeSlots contains the time slots after "11:30 AM"
//   console.log(nextTimeSlots);
// // }

// const checkForOverlap = (appointments, start, end, currentItemId) => {
//   for (const appointment of appointments) {
//     if (appointment.id !== currentItemId) { // Skip checking against the current appointment
//       const appointmentStart = appointment.Initial_T;
//       const appointmentEnd = appointment.End_T;

//       if (
//         (start >= appointmentStart && start < appointmentEnd) || // Check if start time is within existing appointment
//         (end > appointmentStart && end <= appointmentEnd) || // Check if end time is within existing appointment
//         (start <= appointmentStart && end >= appointmentEnd) // Check if existing appointment is within the current appointment
//       ) {
//         return true; // Overlap found
//       }
//     }
//   }
//   return false; // No overlap
// };
// const checkForOverlap = (appointments, start, end, currentItemId) => {
//   for (const appointment of appointments) {
//     if (appointment.id !== currentItemId) { // Skip checking against the current appointment
//       const appointmentStart = appointment.Initial_T;
//       const appointmentEnd = appointment.End_T;

//       if (
//         (start >= appointmentStart && start < appointmentEnd) || // Check if start time is within existing appointment
//         (end > appointmentStart && end <= appointmentEnd) || // Check if end time is within existing appointment
//         (start <= appointmentStart && end >= appointmentEnd) // Check if existing appointment is within the current appointment
//       ) {
//         return true; // Overlap found
//       }
//     }
//   }
//   return false; // No overlap
// };

// const handleCellClick = (time, employee) => {
//   if (employee && time) {
//     setSelectedHour(time);
//     setSelectedTime(time);
//     setSelectedEmployee(employee);

//     const start = time; // Assuming 'time' is the start time
//     const end = calculateEndTime(time, totalTime); // Calculate end time based on service duration

//     const isOverlap = checkForOverlap(selectAptoption, start, end, null); // Check for overlap

//     if (!isOverlap) {
//       // No overlap, proceed to open the modal
//       openModal();
//     } else {
//       // Overlap found, handle accordingly (e.g., show a message to the user)
//       console.log('Overlap found, cannot schedule appointment at this time.');
//     }
//   } else {
//     openModal();
//   }
// };



 // Output: "2024-04-25" (for example)


   

useEffect(()=>{
  const calenderData = data?.filter((item)=> item.date_option == formattedDate)
  // console.log("filterData",calenderData.appointment_option)
  // console.log("filterDataAll",calenderData)

  calenderData.map((item)=> {
    let newStylist = {init_T:item.appointment_option[0].Initial_T,final_T:item.appointment_option[0].End_T,stylist_Name:item.appointment_option[0].stylistN, date:item.date_option, status:item.status,id:item.id}
   setBookedStylist([...bookedStylist, newStylist])
  })
}, [data])

// console.log("mukesh",bookedStylist)


  return (
    <Box p={4}>
      <Heading
        color={"black"}
        fontFamily={"sans-serif"}
        fontSize={"25px"}
        mb={4}
      >
        <Center> Appointment Scheduler </Center></Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={4} p={4} fontSize={'sm'}>
        <Box
          bg="teal.200"
          p={4}
          borderRadius="md"
          boxShadow="md"
          height="100%"
          textAlign="center"
        >
          Analysis
        </Box>
        <Box
          bg="orange.200"
          p={4}
          borderRadius="md"
          boxShadow="md"
          height="100%"
          textAlign="center"
        >
          Analysis
        </Box>
        <Box
          bg="green.200"
          p={4}
          borderRadius="md"
          boxShadow="md"
          height="100%"
          textAlign="center"
        >
          Analysis
        </Box>
        <Box
          bg="purple.200"
          p={4}
          borderRadius="md"
          boxShadow="md"
          height="100%"
          textAlign="center"
        >
          Analysis
        </Box>
      </Grid>
      
      <div>
        <Button
          onClick={goToPreviousDate}
          colorScheme="linkedin"
          isLoading={isLoading}
          // zIndex={'-1'}
        >
          <GrPrevious />
        </Button>
        <Button
          onClick={goToNextDate}
          colorScheme="linkedin"
          ml={4}
          isLoading={isLoading}
        >
          <GrNext />
        </Button>

        <Button
          onClick={() => handleCellClick()}
          colorScheme="teal"
          float={"right"}
          isLoading={isLoading}
          // isDisabled
        >

          <BiSolidAddToQueue />
          &nbsp;Add New
        </Button>

        <Text color="black" display={"flex"} p={2}>
          {" "}
          <IoCalendar />
          &nbsp;{formattedDate}
        </Text>

        {/* calendar table box */}
        <Box display={"flex"} mb={4}>
          <Text color={"black"} mr={6} fontSize={"small"}>
            {" "}
            <Box w={"10px"} h={"10px"} bg={"yellow"}></Box> Appointment Ongoing
          </Text>
          <Text color={"black"} mr={6} fontSize={"small"}>
            {" "}
            <Box w={"10px"} h={"10px"} bg={"pink"}></Box>Appointment scheduled
          </Text>
          <Text color={"black"} fontSize={"small"}>
            <Box w={"10px"} h={"10px"} bg={"teal.100"}></Box>Appointment Done
          </Text>
        </Box>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color={"black"} border={"1px solid black"}>
              <Center>Stylist</Center>
            </Th>
            {hours.map((hour, index) => (
              <Th key={index} border="1px solid black" color={"black"}>
                {hour}
              </Th>
            ))}
          </Tr>
        </Thead>
        {isLoading ? (
          // Display a loader while data is being loaded
          <Center>
            <Spinner
              size={"xl"}
              m={20}
              color="black"
              thickness="2px"
              emptyColor="gray.200"
            />
          </Center>
        ) : (
          <Tbody>
            {Edata.map((iteem, index) => (
              <Tr key={index}>
                <Td border="1px solid black" color={"black"}>
                  <Text p={2} borderRadius={"8px"} border={"2px solid gray"}>
                    <Center>{iteem.name}</Center>{" "}
                  </Text>
                </Td>
                {hours.map((hour, hourIndex) => (
                  <Td
                    w={"auto"}
                    h={"10vh"}
                    key={hourIndex}
                    border={"1px solid gray"}
                    cursor={"pointer"}
                    color={"orange"}
                    id={hour + iteem.name + formattedDate}
                    position={"relative"}
                    bg={"transparent"}
                    zIndex={1}
                    // onClick={() => handleSpecifClick()}
                    // onClick={
                    //   data.some((item) => {
                    //     const matchingStylist =
                    //       item.appointment_option.find(
                    //         (option) => option.stylistN === iteem.name
                    //       );

                    //     return (
                    //       matchingStylist &&
                    //       compareStartTime(
                    //         matchingStylist.Initial_T,
                    //         hour
                    //       ) &&
                    //       item.date_option === formattedDate
                    //     );
                    //   })
                    //     ? null
                    //     : ()=>{handleCellClick(hour , iteem.name )}
                    // }
                    onClick={() => {
                      const isOverlaying = data.some((item) => {
                        const matchingStylist = item.appointment_option.find(
                          (option) => option.stylistN === iteem.name
                        );
                    
                        return (
                          matchingStylist &&
                          compareStartTime(matchingStylist.Initial_T, hour) &&
                          item.date_option === formattedDate
                        );
                      });
                    
                      if (!isOverlaying) {
                        handleCellClick(hour, iteem.name );
                      } else {
                        // Handle the case when the appointment block is overlaying the <Td>
                        // For example, you can display a message or perform a different action.
                        console.log("Appointment block is overlaying!");
                      }
                    }}
                    
                    
              
                  >
                   {/* updated  */}
                    {data.map((item, itemIndex) => {
                      const matchingStylist = item.appointment_option.find(
                        (option) => option.stylistN === iteem.name
                      );

                      if (
                        matchingStylist &&
                        compareStartTime(matchingStylist.Initial_T, hour) &&
                        item.date_option === formattedDate
                      ) {
                        // console.log(matchingStylist.Initial_T);
                        const startMinute = parseInt(
                          matchingStylist.Initial_T.split(":")[1]
                        );
                        const totalStartMinutes = (startMinute / 60) * 100;

                        const endMinute = timeDifferenceInMinutes(
                          matchingStylist.Initial_T,
                          matchingStylist.End_T
                        );
                        const totalEndMinutes = (endMinute / 60) * 100;

                        const blockWidthPercentage = totalEndMinutes;
                        const leftPositionPercentage = totalStartMinutes;
                        const services = matchingStylist.service || [];

                        const details = (
                          <>
                            <RiUserLocationFill />{" "}
                            <Text
                              fontSize={"large"}
                              fontFamily={"monospace"}
                              color={"black"}
                              borderBottom={"2px solid teal"}
                            >
                              Appointment Details
                            </Text>
                            <div>{`TokenID: ${item.id}`}</div>
                            <div>
                              {" "}
                              Client name : {item.client.split(" ")[0]}
                            </div>
                            <div>Stylist : {matchingStylist.stylistN}</div>
                            <div>Services: {services.join(", ")}</div>
                            <div>Status : {matchingStylist.status}</div>
                          </>
                        );

                        return (
                          <Tooltip
                            hasArrow
                            label={details}
                            bg="gray.200"
                            p={4}
                            borderRadius={"8px"}
                            key={itemIndex}
                          >
                            <Box
                            // draggable
                            onDrag={()=>{console.log('dragged')}}
                              color={"black"}
                              textAlign={"center"}
                              zIndex={999}
                              width={blockWidthPercentage + "%"}
                              bg={
                                matchingStylist.status === "done"
                                  ? "teal.200"
                                  : matchingStylist.status === "scheduled"
                                  ? "pink"
                                  : matchingStylist.status === "ongoing"
                                  ? "yellow"
                                  : ""
                              }
                              position="absolute"
                              height={"full"}
                              top={0}
                              right={0}
                              bottom={0}
                              left={leftPositionPercentage + "%"}
                              overflow={"hidden"}
                              opacity={0.9}
                              onClick={
                                data.some((item) => {
                                  const matchingStylist =
                                    item.appointment_option.find(
                                      (option) => option.stylistN === iteem.name
                                    );

                                  return (
                                    matchingStylist &&
                                    compareStartTime(
                                      matchingStylist.Initial_T,
                                      hour
                                    ) &&
                                    item.date_option === formattedDate
                                  );
                                })
                                  ? () => handleSpecifClick(hour, iteem.name )
                                  : null
                              }
                              onContextMenu={(e)=>{rightClickUpdate(e)}}
                            >
                              {matchingStylist.status == "scheduled" ? (
                                <RiUserLocationFill />
                              ) : matchingStylist.status == "done" ? (
                                <CheckIcon />
                              ) : matchingStylist.status == "ongoing" ? (
                                <MdOutlineRestartAlt />
                              ) : (
                                ""
                              )}
                              {/* Content of the box */}
                              {item.client.split(" ")[0]}
                              <br />
                              <Text
                                fontSize={"small"}
                                fontWeight={"semibold"}
                                color={"gray"}
                                opacity={"1 !important"}
                              >
                                {" "}
                                {matchingStylist.Initial_T +
                                  "-" +
                                  matchingStylist.End_T}{" "}
                              </Text>
                            </Box>
                          </Tooltip>
                        );
                      }

                      return null;
                    })}
                  </Td>
                  // ))}
                ))}
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
      
      {/* Appointment Form */}

      <Modal isOpen={isModalOpen} size={"2xl"} onClose={closeModal} isCentered>
        <ModalOverlay
          bg={"transparent"}
          backdropFilter={"blur(10px) hue-rotate(90deg)"}
        />
        <ModalContent>
          <ModalHeader fontWeight={"hairline"}>Appointment Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}>
              <Text
                color={"teal.400"}
                width={"fit-content"}
                height={"fit-content"}
                p={2}
                borderLeftRadius={"8px"}
                display={displayS}
                // display={clientExists ? "block" : "none"}
              >
                <CheckIcon />
              </Text>
              <Box display={"flex"} flexDirection={"column"}>
                <Flex>
                  <Input
                    mb={0}
                    placeholder="Enter Name/Number"
                    value={client}
                    onChange={filterClient}
                    required
                    bg={bgTest}
                    color={"white"}
                    pointerEvents={pointertest}
                    type="text"
                    w={"full"}
                    borderRightRadius={0}
                  />
                  <AddClient
                    disable={
                      suggestions.length == 0 && client.length > 0
                        ? false
                        : true
                    }
                    display={displayS2}
                  />
                </Flex>
                {suggestions.length > 0 && (
                  <VStack
                    align="start"
                    spacing={0}
                    w="100%"
                    // zIndex={999999}
                    // mt={10}
                    transition={"ease-in 2s"}
                    maxH={"90%"}
                    overflowY={"scroll"}
                    display={displayS2}
                    // border={'1px solid red'}
                    // pos='fixed'
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
                        display={client == "" ? "none" : "block"}
                        w={"full"}
                        _hover={{ bg: "teal" }}
                        p={2}
                      >
                        {data.name + " " + data.mobile_number}
                      </Tag>
                    ))}
                  </VStack>
                )}
              </Box>
            </Box>
            {/* time slot */}
            <Box display={"flex"}>
              <Text
                color={"teal.400"}
                width={"fit-content"}
                height={"fit-content"}
                p={2}
                borderLeftRadius={"8px"}
                display={displayS}
              >
                <CheckIcon />
              </Text>
              <InputGroup size="sm" pointerEvents={pointertest} mt={4}>
                <InputLeftAddon
                  children="Time Slot"
                  bg={bgTest}
                  borderLeftRadius={"8px"}
                  border={"1px solid teal"}
                />
                <Select
                  w={"fit-content"}
                  placeholder="Select Time Slot"
                  mb={2}
                  fontWeight={"medium"}
                  borderRightRadius={"8px"}
                  border={"1px solid teal"}
                  onChange={handleTimeChange}
                  value={selectedTime}
                >
                  
                  {TimeSlots.map((time) => (
                    <option value={time}>{time}</option>
                  ))}
                </Select>
              </InputGroup>
            </Box> 
            {/* select Staff */}

            {selectAptoption.map((options, index) => (
              <Box key={index}>
                <Box display={"flex"}>
                  <Text
                    color={"teal.400"}
                    width={"fit-content"}
                    height={"fit-content"}
                    p={2}
                    borderLeftRadius={"8px"}
                    display={displayS}
                  >
                    <CheckIcon />
                  </Text>
                  <Center>
                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={
                              isOpen ? <BsCaretUpFill /> : <BsCaretDownFill />
                            }
                            color={"gray.300"}
                            bg={bgTest}
                            pointerEvents={pointertest}
                            border={"1px solid #464F5E"}
                            display={displayS2}
                            mt={4}
                          >
                            {isOpen ? "Close List" : "Select Stylist"}
                          </MenuButton>
                          <MenuList maxH={"250px"} overflowY={"scroll"}>

                            {Edata.map((item, i) => (
                              <MenuItem key={i}>
                                <RadioGroup
                                  value={options.stylistN}
                                  onChange={(e) => toggleItem2(e, index)}
                                >
                           {/* {console.log(item.name)} */}
                                <Radio value={item.name}>{item.name}</Radio>
                                </RadioGroup>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </>
                      )}
                    </Menu>

                    {options.stylistN && (
                      <Box ml={pointertest === "none" ? 0 : 2} mt={4}>
                        <Tag color="teal.400" size={"lg"}>
                          {options.stylistN}
                          <TagCloseButton
                            onClick={() => toggleItem2("", index)}
                            display={displayS2}
                          ></TagCloseButton>
                        </Tag>
                      </Box>
                    )}
                  </Center>
                </Box>
                <Box display={"flex"}>
                  <Text
                    color={"teal.400"}
                    width={"fit-content"}
                    height={"fit-content"}
                    p={2}
                    borderLeftRadius={"8px"}
                    display={displayS}
                  >
                    <CheckIcon />
                  </Text>
                  <Center>
                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            isActive={isOpen}
                            as={Button}
                            // isDisabled={disabled}
                            rightIcon={
                              isOpen ? <BsCaretUpFill /> : <BsCaretDownFill />
                            }
                            // mb={4}
                            color={"gray.300"}
                            bg={bgTest}
                            pointerEvents={pointertest}
                            border={"1px solid #464F5E"}
                            display={displayS2}
                            mt={4}
                          >
                            {isOpen ? "Close Services" : "Select Services"}
                          </MenuButton>
                          <MenuList maxH={"250px"} overflowY={"scroll"}>
                            {servicedata.map((item, i) => (
                              <MenuItem key={i}>
                                <Checkbox
                                  isChecked={options.service.includes(
                                    item.name_service
                                  )}
                                  onChange={() =>
                                    toggleService(item.name_service, index)
                                  }
                                  value={item.name_service}
                                >
                                  {item.name_service}
                                </Checkbox>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </>
                      )}
                    </Menu>

                    <Grid
                      gap={1}
                      mt={0}
                      templateColumns="repeat(3, 1fr)"
                      ml={pointertest == "none" ? 0 : 2}
                    >
                      {options.service.map((item) => (
                        <GridItem key={item}>
                          <Tag
                            size={"lg"}
                            // borderRadius="full"
                            variant="subtle"
                            // bg={bgTest}
                            colorScheme={bgTest}
                            pointerEvents={pointertest}
                            // ml={}
                            // mb={4}
                          >
                            <TagLabel mr={2}>{item}</TagLabel>

                            <TagCloseButton
                              onClick={() => toggleService(item, index)}
                              display={displayS2}
                            />
                          </Tag>
                        </GridItem>
                      ))}
                    </Grid>
                  </Center>
                </Box>
                {/* <Button mt={3} onClick={addSpecificService} isDisabled={selectAptoption[0].stylistN.trim() ==- " " && selectAptoption[0].service.length == 0 } > <IoIosAdd/></Button> */}
                <Button
                  mt={3}
                  display={displayS2}
                  onClick={addSpecificService}
                  isDisabled={
                    selectAptoption[0].stylistN.trim() === "" ||
                    selectAptoption[0].service.length === 0 ||
                    selectedTime == ""
                  }
                >
                  <IoIosAdd />
                </Button>
              </Box>
            ))}
            {/*  */}

            <Button
              // onClick={submitAppointment}
              colorScheme="whatsapp"
              mr={6}
              isDisabled={isNextButtonDisabled}
              // isLoading={disabled}
              display={displayS2}
              onClick={clicktest}
              mt={2}
            >
              Next
            </Button>
          </ModalBody>

          <ModalFooter display={"flex"} flexDirection={"column"}>
            <Text
              display={displayS}
              fontSize={"md"}
              mb={5}
              color={"gray.500"}
              fontWeight={"medium"}
            >
              Review Appointment Details{" "}
            </Text>

            <TableContainer display={displayS}>
              <Table
                variant="simple"
                display={displayS}
                border={"2px dashed white"}
              >
                <TableCaption
                  bg={"teal.700"}
                  m={4}
                  borderRadius={"8px"}
                  width={"fit-content"}
                >
                  Appointment Time : {selectedTime} To {formattedEndTime}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th borderBottom="2px dashed white">Services</Th>
                    <Th borderBottom="2px dashed white">Employee</Th>
                    <Th borderBottom="2px dashed white" isNumeric>
                      Time
                    </Th>
                    <Th borderBottom="2px dashed white" isNumeric>
                      Price
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectAptoption
                    .filter(
                      (options) =>
                        options.stylistN && options.service.length > 0
                    )
                    .map((options, index) => (
                      <React.Fragment key={index}>
                        {options.service.map((service, serviceIndex) => {
                          const serviceData = servicedata.find(
                            (data) =>
                              data.name_service &&
                              data.name_service.includes(service)
                          );

                          if (serviceData) {
                            return (
                              <Tr key={serviceIndex}>
                                <Td
                                  bg={"#121212"}
                                  borderRight={"1px dashed white"}
                                  borderBottom={"1px dashed white"}
                                >
                                  {options.stylistN}
                                </Td>
                                <Td
                                  bg={"#121212"}
                                  borderRight={"1px dashed white"}
                                  borderBottom={"1px dashed white"}
                                >
                                  {service}
                                </Td>
                                <Td>{serviceData.time + " 𝑚"}</Td>
                                <Td>{serviceData.price}</Td>
                              </Tr>
                            );
                          }

                          return null;
                        })}
                      </React.Fragment>
                    ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th borderTop="2px dashed white"></Th>
                    {/* <Th borderTop="2px dashed white"></Th> */}

                    <Th borderTop="2px dashed white" fontStyle={"italic"}>
                      Total
                    </Th>
                    <Th borderTop="2px dashed white" isNumeric fontSize={"xl"}>
                      {h + ":" + m + " 𝑚"}
                    </Th>

                    <Th borderTop="2px dashed white" isNumeric fontSize={"xl"}>
                      {"₹" + totalPrice}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            <Center>
              <Box display={"flex"} flexDirection={"row"} mt={6}>
                <Button
                  display={displayS}
                  onClick={submitAppointment}
                  colorScheme="yellow"
                  mr={6}
                  ml={2}
                >
                  Schedule
                </Button>
                <Button
                  display={displayS}
                  onClick={EditTest}
                  colorScheme="purple"
                >
                  Edit
                </Button>
              </Box>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* appointmenty form finished */}

      {/* ------------------------------------------------------------------*************------------------------------------------------------------------------------- */}
{/* Update apppointment form */}
<Modal isOpen={open3} onClose={closeOpen3} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
          </ModalBody>
           <Center> 
            <label><IoMdClock/></label>&nbsp;<Select
                  w={"fit-content"}
                  placeholder='Update Time Slot ' 
                  // mb={2}
                  fontWeight={"medium"}
                  borderRightRadius={"8px"}
                  // onChange={handleTimeChange}
                  // value={selectedTime}
                  // maxH={'100px'}
                > 
                  {TimeSlots.map((time) => (
                    <option value={time}>{time}</option>
                  ))}
                </Select></Center>
          <ModalFooter>
            <Button colorScheme='purple' mr={3} onClick={closeOpen3}>
              Update
            </Button>
            <Button variant='ghost' colorScheme='red'><MdDeleteOutline/></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* appointment details */}

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom={"1px solid gray"}>
            Customer Details
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex>
              {/* Sidebar */}
              <Box
                w="25%"
                p={0}
                h={"auto"}
                borderRight="1px solid gray"
                textAlign={"center"}
              >
                {/*  sidebar content goes here */}
                {data.map((item) => {
                  const matchingStylist = item.appointment_option.find(
                    (option) => option.stylistN === selectedEmployee
                  );
                  const isAppointmentDone = item.appointment_option.every(
                    (option) => option.status === "done"
                  );
                  const isAppointmentOngoing = item.appointment_option.find(
                    (option) => option.status === "ongoing"
                  );
                  let hasUpdatedStatus = false;
                  const updateAppointmentStatusA = async (newStatus) => {
                    try {
                      const response = await axios.post(
                        "http://localhost/backend/updateAptS.php",
                        {
                          appointmentId: item.id,
                          newStatus: newStatus,
                        }
                      );
                      // loadData();
                      hasUpdatedStatus = true; // Assuming loadData is a function to refresh data
                    } catch (error) {
                      console.error("Error updating status:", error.message);
                      // Handle errors gracefully, e.g., display an error message to the user
                    }
                  };

                  // Check if any service is ongoing and update the appointment status
                  if (isAppointmentOngoing && !hasUpdatedStatus) {
                    updateAppointmentStatusA("ongoing");
                  }
                  if (isAppointmentDone && !hasUpdatedStatus) {
                    updateAppointmentStatusA("done");
                  }
                  return matchingStylist &&
                    compareStartTime(matchingStylist.Initial_T, selectedHour) &&
                    item.date_option === formattedDate ? (
                    <VStack
                      key={item.id}
                      spacing={4}
                      mt={4}
                      justifyItems={"center"}
                      ml={-1}
                    >
                      {/* <Text>{matchingStylist.status}</Text> */}
                      <Avatar size={"lg"} />
                      <Text
                        fontFamily={"monospace"}
                        fontSize={"sm"}
                        display={"flex"}
                      >
                        <FaUser color="teal" /> &nbsp;
                        {item.client.split("|")[0]}
                      </Text>
                      <Text display={"flex"} fontFamily="mono">
                        <FaPhoneAlt color="orange" />
                        &nbsp;{item.client.split("|")[1]}
                      </Text>
                      <Text bg={"gray.800"} p={3} borderTopRadius={"9px"}>
                        Status
                      </Text>
                      <VStack
                        w={"100%"}
                        h={"auto"}
                        mr={3}
                        p={6}
                        borderRadius={"9px"}
                        textAlign={"center"}
                        bg={"gray.800"}
                        mt={-4}
                      >
                        <Text
                          display={"flex"}
                          // bg={item.status == "scheduled" ? "pink.700" : ""}
                          bg={
                            !isAppointmentDone && !isAppointmentOngoing
                              ? "pink.700"
                              : ""
                          }
                          p={2.5}
                          transition={"ease-in 0.7s"}
                          borderRadius={"8px"}
                        >
                          <RiUserLocationFill color="pink" /> &nbsp;Scheduled
                        </Text>
                        <Text
                          display={"flex"}
                          // bg={item.status == "ongoing" ? "yellow.700" : ""}
                          bg={isAppointmentOngoing ? "yellow.700" : ""}
                          p={2.5}
                          transition={"ease-in 0.7s"}
                          borderRadius={"8px"}
                        >
                          <MdOutlineRestartAlt color="yellow" /> &nbsp;Ongoing
                        </Text>
                        <Text
                          display={"flex"}
                          // bg={item.status == "done" ? "teal.700" : ""}
                          bg={isAppointmentDone ? "teal.700" : ""}
                          p={2.5}
                          transition={"ease-in 0.7s"}
                          borderRadius={"8px"}
                        >
                          {" "}
                          <CheckIcon color="teal.100" /> &nbsp;Done
                        </Text>
                      </VStack>
                    </VStack>
                  ) : null;
                })}
              </Box>
              {/* Table */}
              <Box flex="1">
                <Heading
                  textAlign={"center"}
                  fontSize={"md"}
                  borderBottom={"1px solid gray"}
                  p={4}
                >
                  Customer Details for This Token
                </Heading>

                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Token_ID</Th>
                      <Th>Booked By</Th>
                      <Th>Stylist</Th>
                      <Th>Services</Th>
                      <Th>Time</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  {/* <Tbody> */}
                  {/* Your table rows go here */}
                  <Tbody>
                    {data.map((item) => {
                      const matchingStylist = item.appointment_option.find(
                        (option) => option.stylistN === selectedEmployee
                      );
                      // const services = matchingStylist ? matchingStylist.service : [];

                      return matchingStylist &&
                        compareStartTime(
                          matchingStylist.Initial_T,
                          selectedHour
                        ) &&
                        item.date_option === formattedDate ? (
                        <React.Fragment key={item.id}>
                          {item.appointment_option.map((option) => (
                            <Tr fontSize={"small"} key={option.id}>
                              <Td
                                fontFamily={"monospace"}
                                fontSize={"md"}
                                letterSpacing={2}
                              >
                                {item.id}
                              </Td>
                              <Td>Admin</Td>
                              <Td>{option.stylistN}</Td>
                              <Td>{option.service.join(", ")}</Td>
                              <Td>{option.Initial_T + "-" + option.End_T}</Td>
                              <Td display={"flex"}>
                                <Icon
                                  fontSize={"xx-large"}
                                  overflow={"inherit"}
                                  display={
                                    option.status === "done" ? "none" : "block"
                                  }
                                  mr={6}
                                  transition={"ease-in 0.7s"}
                                >
                                  {/* {console.log(option.status)} */}
                                  {option.status === "scheduled" ? (
                                    <RiUserLocationFill color="pink" />
                                  ) : option.status === "done" ? (
                                    " "
                                  ) : option.status === "ongoing" ? (
                                    <MdOutlineRestartAlt
                                      color="yellow"
                                      css={{
                                        animation: "rotate 2s linear infinite",
                                      }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Icon>
                                <Button
                                  colorScheme={
                                    option.status === "done" ? "teal" : "yellow"
                                  }
                                  mr={0}
                                  onClick={() => {
                                    if (option.status === "scheduled") {
                                      updateAppointmentStatus(
                                        item.id,
                                        "ongoing",
                                        option.id
                                      );
                                    } else if (option.status === "ongoing") {
                                      updateAppointmentStatus(
                                        item.id,
                                        "done",
                                        option.id
                                      );
                                    }
                                  }}
                                  variant={
                                    option.status === "done"
                                      ? "solid"
                                      : "outline"
                                  }
                                >
                                  {option.status === "scheduled" ? (
                                    "Start"
                                  ) : option.status === "done" ? (
                                    <CheckIcon />
                                  ) : option.status === "ongoing" ? (
                                    "Mark Done"
                                  ) : (
                                    ""
                                  )}
                                </Button>
                              </Td>
                            </Tr>
                          ))}
                        </React.Fragment>
                      ) : null;
                    })}
                  </Tbody>
                </Table>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter overflow={"hidden"}>
            {data.map((item) => {
              const matchingStylist = item.appointment_option.find(
                (option) => option.stylistN === selectedEmployee
              );
              // const servicesData = item.appointment_option.map(obj => Object.values(obj)[0].service).flat();
              const servicesData = item.appointment_option.map((option) => {
                // Assuming each option has a property named 'service'
                return   option.stylistN +" | " + option.service ; 
              
              }).flat()
              const stylist = item.appointment_option.map((i) => {
                return  i.stylistN;
              })
              // console.log(servicesData);
              // const services = matchingStylist ? matchingStylist.service : [];
              const isAppointmentDone = item.appointment_option.every(
                (option) => option.status === "done"
              );
              // const invId = invoiceD != null ? invoiceD.map((i) => i.Apt_ID) : '';
              const invId = Array.isArray(invoiceD) ? invoiceD.map((i) => i.apt_id) : '';

              const APTidArray = [...invId];
              const isInvoiceDone = APTidArray.includes(item.id);
              
              // Now, isInvoiceDone will be a boolean indicating whether item.id exists in the array IAPt_ID
             { 
              return matchingStylist &&
                compareStartTime(matchingStylist.Initial_T, selectedHour) &&
                item.date_option === formattedDate 
                ? (<>
                  <Text display={isInvoiceDone ? 'flex' : 'none'} color={'gray'} mr={10}>Invoice Genrated&nbsp;|&nbsp;<Text as={Link} to='/invoice-view' cursor={'pointer'} display={'flex'} fontSize={'sm'} color={'yellow.500'}>View <HiOutlineExternalLink /></Text> </Text>
                <Button
                  colorScheme="orange"
                  position={"relative"}
                  transition={"ease 0.4s"}
                  left={isAppointmentDone ? "0%" : "50%"}
                  as={RouteLink}
                  to={`/invoice/`}
                  textDecoration={isInvoiceDone ? 'line-through' : ''}
                  isDisabled={isInvoiceDone ? true : false}
                  pointerEvents={isInvoiceDone ? 'none' : ''}
                  onClick={() => {
                    updateServiceData(servicesData);
                    updateClientData(item.client.split("|")[1]);
                    updateSelectedDate(formattedDate);
                    updateSelectedid(item.id);
                    // updateStylist(stylist); 
                  }}
                >
                  Generate Bill
                </Button>
                </>
                
              ) : null
                }
            })}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* {console.log(formattedDate)} */}

      
    </Box>
  );
}

export default DailyTimetable;
