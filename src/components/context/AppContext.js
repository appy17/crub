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
 const [access , setAccess] = useState('')
 const [authUser , setauthUser] = useState(false);
 const [loading, setLoading] = useState(false);
 const [isAdmin , setAdmin] = useState(false);
 const [userName, setUsername] = useState('');
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
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
    const storedSession = JSON.parse(localStorage.getItem('session'));
    if (storedSession) {
      setauthUser(true);
    }
  }, []);
console.log('access' , access)
  const  login =  (id,key) => {
    const resData = access.filter((item) => item.defined_id === id);
    let id_ =  resData ? resData[0].defined_id : 'undefinde'
    let key_ = resData ? resData[0].key_secret : 'undefinde'
    let type_ = resData ? resData[0].type_access : 'undefinde'
    try {
      // Set loading to true when starting the login request
      setLoading(true);
      if (!access){
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
      
      else if(id == id_ && key == key_){
      setauthUser(true);
      // navigate('/calender')
      type_ == 'Admin' ? setAdmin(true) : setAdmin(false);
      localStorage.setItem('session', JSON.stringify(true));
      localStorage.setItem('name', type_);
      setUsername(type_);
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
    localStorage.setItem('session' , false);
    localStorage.setItem('name' , null)
   
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
        isAdmin,
        userName,
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
