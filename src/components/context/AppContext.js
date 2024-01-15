import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const toast = useToast();
  const [clientData, setClientData] = useState('');
  const [serviceDatas, setServiceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
 const [selectdId , setselectedId] = useState('');
 const [stylist , setStylist] = useState([]);
 const [access , setAccess] = useState()
 const [authUser , setauthUser] = useState(false);
 const [loading, setLoading] = useState(false);
//  const navigate = useNavigate();
  const updateClientData = (data) => {
    setClientData(data);
  };
 const updateStylist = (data) => {
  setStylist(data);
 }
  const updateServiceData = (data) => {
    setServiceData(data);
  };

  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };
  const updateSelectedid = (data) => {
     setselectedId(data);
  }
  const loadData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getAccess.php"
      );
      const data = response.data.phpresult;
      setAccess(data);
      //   console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
//  console.log(access ? access[0].type_access : 'undefinde');
  const  login =  (id,key) => {
    let id_ =  access ? access[0].defined_id : 'undefinde'
    let key_ = access ? access[0].key_secret : 'undefinde'
    let type_ = access ? access[0].type_access : 'undefinde'
    try {
      // Set loading to true when starting the login request
      setLoading(true);
    if(id == id_ && key == key_){
      setauthUser(true);
      // navigate('/calender')
      toast({
        position: 'top',
        title: 'Logged In',
        description: `Entered as : ${type_}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);

      
    }
    else if (!access){
      setLoading(true)
      setauthUser(false);
      toast({
        position: 'top',
        title: 'Server Problem',
        description: 'Please Contact Developer !',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    }
    else{
      setauthUser(false);
      toast({
        position: 'top',
        title: 'Invalid ID/Password',
        description: 'Please Try again using, with valid Inputs',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } }
    catch (error){
      console.error("Error during login:", error);
    } finally {
      // Set loading to false when the login process is complete
    }
  }
  const  logout = () => {
    setauthUser(false);
    toast({
      position: 'top',
      title: 'Logout Succesfully',
      // description: '',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  } 

  return (
    <AppContext.Provider
      value={{
        clientData,
        serviceDatas,
        selectedDate,
        selectdId,
        stylist,
        authUser,
        login,
        logout,
        loading,
        updateSelectedid,
        // selectdData,
        // updateSelectedData,
        updateStylist,
        updateClientData,
        updateServiceData,
        updateSelectedDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
