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
export default function Login() {
   //Initialization 
   const[users,setUsers]=useState<User[]>([]);
   const [user,setUser]=useState<User>({
    id:Math.floor(Math.random()*10000000000),
    email:'',
    password:'',
   })
   const [active,setActive]=useState<boolean>(false);
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
      setActive(false);
      const {name,value}=e.target;
      setUser({...user,[name]:value})
    }
  // function handleClick
  const handleCLick=(e:React.FormEvent)=>{
    e.preventDefault();
    //case login successful  
     if(users.find(btn=>btn.email===user.email&&btn.password===user.password)){
      console.log('Bạn đã đăng nhập thành công');     
     } else{
      setActive(true);
     }
  }
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'50px'}}>
      <Form style={{width:'400px'}}>
        <h2>Đăng nhập</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={user.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange} />
      </Form.Group>
        {active &&<Form.Text className="text-muted">
          Email or Password is incorrect!
        </Form.Text>}
        <br />
     
      <Button  onClick={handleCLick} variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </div>
  )
}
