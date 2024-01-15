import { createBrowserRouter } from "react-router-dom";
import Calender from "../components/Calender";
import Layout from "../Layout";
// import Membership from ".";

import AddClient from "../components/AddClient";
import AddEmployee from "../components/AddEmployee";
import Client from "../components/Client";
// import Products from "../components/Products";
import SearchSuggestion from "../components/AddProducts";
import Invoice from "../components/Invoice";
import Previousinvoice from "../components/previousinvoice";
import ErrorP from "../components/error/error-page";
import Invoicepdf from "../components/pdf/invoicepdf";

// import TaxInvoice from "../components/Test";
import Employee from "../components/Employee";
import Login from "../components/Login";
import InvoiceBill from "../components/pdf/invoicepdf";
import Test from "../components/RoughWork";
import Products from "../components/Inventory/Products";
import StockLedger from "../components/Inventory/StockLedger";
// import { Children } from "react";
export const ROOT = "/";
export const router = createBrowserRouter([
    {path : ROOT , element : <Login/> },
    { path: ROOT,
        element: <Layout/>, children: [
        {path:'*' , element : <ErrorP/>},
            {path:'calender', element:<Calender/>},
        {path:'inventory/products/' , element :<Products/>},
        {path:'inventory/stock-ledger' , element :<StockLedger/>},
        {path:'Addclient' , element : <AddClient/>},
        {path:'AddEmployee' , element : <AddEmployee/>},
        {path:'AddProduct' , element : <SearchSuggestion/>},
        {path:'client' , element : <Client/>},
        {path:'employee' , element : <Employee/>},
        {path:'test' , element : <Test/>},
        {path:'invoice' , element : <Invoice/>},
        {path:'invoice-view' , element : <Previousinvoice/>},
        {path:'invoicegernrate/:id' , element:<InvoiceBill/>}






        ]

}])