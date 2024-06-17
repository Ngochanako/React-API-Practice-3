import React, { useEffect, useState } from 'react';
import bcrypt from "bcryptjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
type User={
  id:number,
  email:string,
  password:string,
}
export default function Register() {
   //Initialization 
   const[users,setUsers]=useState<User[]>([]);
   const [user,setUser]=useState<User>({
    id:Math.floor(Math.random()*10000000000),
    email:'',
    password:'',
   })
   const [active,setActive]=useState<boolean>(false);
   const [typeButton,setType]=useState<boolean>(false);
   //get data from API
   useEffect(()=>{
    axios.get('http://localhost:1303/users')
    .then((res)=>setUsers(res.data))
    .catch(err=>console.log(err)
    )
   },[])
   //reset data Input
   const reset=()=>{
      setUser({
        id:Math.floor(Math.random()*10000000000),
        email:'',
        password:''
      });
   }
   // function handleChange when data Input change
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setType(false);
    setActive(false);
    const {name,value}=e.target;
    setUser({...user,[name]:value})
    //case email has registered  
    if(name==='email'){
      let emailUsers=users.map(user=>user.email);
      if(emailUsers.includes(value)){
      setActive(true);
      setType(true)
    }
  }
}
  // submit data
  const handleCLick=()=>{
    axios.post('http://localhost:1303/users',user)
    .then((res)=>setUsers(res.data))
    .catch(err=>console.log(err))
    reset();
  }
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'50px'}}>
      <Form style={{width:'400px'}}>
        <h2>Đăng ký</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={user.email} onChange={handleChange} />
        {active &&<Form.Text className="text-muted">
          Email has already registered!
        </Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange} />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button disabled={typeButton} onClick={handleCLick} variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </div>
  )

}
