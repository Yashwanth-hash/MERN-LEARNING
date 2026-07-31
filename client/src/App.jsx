import { useState } from "react";
import axios from "axios";

function App(){
  const handleLogin =async() => {
  try{
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email:email,
        password:password,
      }
    );
    console.log(response.data);
  }
  catch(error) {
    console.log(error.response.data);
  }
};
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  console.log(email);
  return (
<div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value = {email}
        onChange = {(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value = {password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>  );
}


export default App;