import React,{useEffect, useState} from 'react';
import { FaPlus } from "react-icons/fa6";
import { TbProgressX } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import Card from './Card';

const  Column = ({orderByOption ,users , rowHeaders,groupByOption,  header , ticketsArray})=>{
// const ComponentToRender = ;
// console.log(ComponentToRender)
return (<div className='ticket-rows'>
<div className='row-header'>  
    <div >
    {rowHeaders[groupByOption][header].src}
 {rowHeaders[groupByOption][header].name} 
 <div>
 {ticketsArray ? ticketsArray.length : 0 }
 </div>
 </div>
 <div>
 <FaPlus></FaPlus>
<BsThreeDots></BsThreeDots>
</div>
 </div>
 <div className = "cards-container">
 {
    ticketsArray && 
ticketsArray.length && 
    ticketsArray.map((m,id)=>
 <Card rowHeaders = {rowHeaders} users = {users} ticketData = {m}></Card>
    
    )
 }

</div>
</div>);


}

export default Column