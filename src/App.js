import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
import axios from 'axios'
import Column from './Column.js'
import { TbProgressX ,TbProgress,TbProgressCheck,TbProgressAlert,TbProgressBolt} from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdSignalCellular4Bar ,MdSignalCellular3Bar ,MdSignalCellular1Bar } from "react-icons/md";
import { LuAlertCircle } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
const rowMetaData = {
  status: {
    Todo: {  name: 'Todo' , src :<TbProgressBolt className='violet' ></TbProgressBolt> },
    'In progress': {  name: 'In progress' ,src:<TbProgress className='yellow'></TbProgress> },
    Backlog: {  name: 'Backlog' ,src : <TbProgressAlert />},
    Done: {  name: 'Done' ,src : <TbProgressCheck className='purple'></TbProgressCheck>},
    Cancelled: {  name: 'Cancelled' , src :<TbProgressX />},
  },
  userId: [],
  priority: {
    '4': { name: 'Urgent' , src :<LuAlertCircle></LuAlertCircle> },
    '3': { name: 'High', src :<MdSignalCellular4Bar></MdSignalCellular4Bar>  },
    '2': { name: 'Medium', src :<MdSignalCellular3Bar></MdSignalCellular3Bar>},
    '1': { name: 'Low' , src : <MdSignalCellular1Bar></MdSignalCellular1Bar> },
    '0': { name: 'No Priority' , src : <BsThreeDots></BsThreeDots>},
  },
};

function App() {
  const [isPopupOpen,setIsPopupOpen] = useState(false);
  const [tickets , setTickets] = useState({});
  const [users,setUsers] = useState([]);
  const [rowHeaders , setRowHeaders] = useState(rowMetaData);
  const [groupByOption, setGroupByOption] = useState('status');
  const [orderByOption, setOrderByOption] = useState('priority')
  
  useEffect(()=>{
axios.get("https://api.quicksell.co/v1/internal/frontend-assignment").then((res)=>
{
setUsers(obj=>
  {
   let nObj = obj;
  res.data.users.map(m=>{
    m.src = <CgProfile></CgProfile>
    nObj[m.id] = m;

  })
  return nObj;
  }
  )
// console.log(users);
setRowHeaders(m=>{
  let nObj = m;
  nObj[`userId`] = users;
return nObj
})
const comparatorFunction =(a,b)=>{
 console.table(a,b)
if (orderByOption == 'priority')
return  a.status - b.status;
return  a.title.localeCompare(b.title)


}
console.log(rowHeaders)
// console.log(Object.groupBy(res.data.tickets, (obj)=> obj[groupByOption]))
const ticketsDat =Object.fromEntries(
  Object.entries(Object.groupBy(res?.data?.tickets, (obj) => obj[groupByOption]))
    .map(([groupKey, group]) => [groupKey, group.sort((a,b)=>comparatorFunction(a,b))])
);
setTickets(ticketsDat);
// console.log(Object.groupBy(res.data.tickets, (obj)=> obj[groupByOption]))
console.log("tickets!!!")
console.log(groupByOption)
console.log(tickets)
console.log(ticketsDat)
}).catch(err=>{
  // alert("some eror")
  console.log(err)
})

  },[groupByOption,orderByOption])

  


  return (
    <div className="App">
      <header className="App-header">
      <div onClick={()=>setIsPopupOpen(p=>!p)} className = "btn-dropdown" >
      <img className = "header-icon filter" src = "filter.svg"></img>
      
        Display
        <img className = "header-icon" src = "arrow.svg"></img>
      </div>
    { isPopupOpen &&  <div className='popUp'>
  <div className='rows'>Grouping
    <select onChange={(e)=>setGroupByOption(e.target.value)} style={{width :"90px"}}>
    <option value = "status">Status</option>
        <option value = "userId">User</option>
            <option value = "priority">Priority</option>

    </select>

  </div>
  <div className='rows'>Ordering
    <select onChange={e=>setOrderByOption(e.target.value)} style={{width :"90px"}}>
    <option value = "priority">Priority</option>
        <option title = "title">Title</option>

    </select>


  </div>

</div>
}
      </header>


<section className='main-area'> 
<div className= "rows-container">
  {Object.keys(rowHeaders[groupByOption]).map((m,id)=>
 <> 
 
 <Column users = {users} orderByOption = {orderByOption} groupByOption= {groupByOption} rowHeaders = {rowHeaders} key = {id} header={m}  ticketsArray={tickets[`${m}`]}></Column>
    </>
  )}
  {/* {Object.keys(tickets).map((m,id)=><>
  </>)} */}
  
</div>
</section>
<center>Made With ❤️ by Abhishek Raj</center>
    </div>
  );
}

export default App;
