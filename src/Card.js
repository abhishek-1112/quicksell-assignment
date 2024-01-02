import React from "react";
import { CgProfile } from "react-icons/cg";
import "./Card.css"
import { BsThreeDots } from "react-icons/bs";

const  Card = ({rowHeaders,users,ticketData})=>{
return  (<div className = "card">
<div className="card-header">
<div>{ticketData.id}</div>
<div><CgProfile></CgProfile> <div className={`availability ${users[ticketData.userId].available ? "available":""}`} ></div></div>

</div>
<div className = "card-title-row">
    <div>
{rowHeaders.status[ticketData.status]?.src ? rowHeaders.status[ticketData.status]?.src : null } 
</div>
<div title = {ticketData.title}>
{ ticketData.title.slice(0,60)}{ticketData.title.length>60 && "..."}
</div>
</div>
<div className="tags-container">
{rowHeaders.status[ticketData.priority]?.src ? rowHeaders.status[ticketData.priority]?.src : <BsThreeDots></BsThreeDots> } 
{ticketData.tag.map(m=><div className="tags">
{m}
</div>)}
</div>
</div>)
}
export default  Card