import { useParams } from "react-router-dom";


import {useState} from 'react'

function ResetPassword() {
  const[formData, setFormData] = useState({
    firstPassword: "",
    secondPassword: ""
  })
  const [didEdit,setDidEdit] = useState({
		firstPassword: false,
		secondPassword: false
	})
  const { token } = useParams();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  function handleBlur(identifier){
		setDidEdit(prevEdit => ({
			...prevEdit,
			[identifier]:true
		}))
	}

  
  function hasMinLength(value, minLength) {
  return value.length >= minLength;
}


  function handleChange(event){
    setFormData((prevState)=> {
      return{
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  async function handleFormSubmit(event){
    event.preventDefault()
    try {
      const response = await fetch(`https://backend-smarted.onrender.com/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.firstPassword)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid or expired token');
      }

      setMsg('Password updated successfully!');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  const firstPasswordIsInvalid = !hasMinLength(formData.firstPassword, 6) && didEdit.firstPassword
  const secondPasswordIsInvalid = !hasMinLength(formData.secondPassword, 6) && didEdit.secondPassword

  return (
    <div>
      <h2>Fill the form to change password</h2>
      <form className='form' onSubmit={handleFormSubmit} >
        <div className='form-div'>
          <label>Enter New Password</label>
          <input 
          type='password' 
          name='firstPassword' 
          value={formData.firstPassword} 
          onBlur={()=>handleBlur('firstPassword')}
          onChange={handleChange} required/>
          {firstPasswordIsInvalid && <p className='invalid'>Please enter correct password</p>}
        </div>
        <div className='form-div'>
          <label>Confirm New Password</label>
          <input 
          type='password' 
          name='secondPassword' 
          value={formData.secondPassword}
          onBlur={()=>handleBlur('secondPassword')} 
          onChange={handleChange} required/>
          {secondPasswordIsInvalid && <p className='invalid'>Please enter correct password</p>}
        </div>
       <button>  {loading ? 'Resetting...' : 'Reset'}</button>
      </form>
      <p className="mt-4">{msg}</p>
    </div>
    
  )
}

export default ResetPassword;
