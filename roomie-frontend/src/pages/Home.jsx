import React from 'react'
import { axiosInstance } from '../service/axios'

const Home = () => {

    const [regData, setRegData] = React.useState({
        studentName: '',
        college: ''
    })

    // console.log(regData)

    const handleChange = (event) => {
        setRegData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const getUsers = async () => {
        try {
            const result = await axiosInstance.get('http://localhost:8080/rahul')
            console.log(result)
        } catch (error) {
            console.log(error, 'error')
        }

    }

    React.useEffect(() => {
        getUsers()
    }, [])

    const registerUser = async () => {
        try {
            const user = {
                name: regData.studentName,
                college: regData.college
            }
            const result = await axiosInstance.post('http://localhost:8080/register', user)
            console.log(result, 'result')
            setRegData({
                studentName: '',
                college: ''
            })
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="home">
            <div className="registration">
                <div className="heading">
                    <h1>Register Here!</h1>
                </div>
                <div className="form">
                    <input type="text" name='studentName' value={regData.studentName} onChange={(event) => handleChange(event)} placeholder='Enter Your Name' />
                    {/* <input type="text" name='college' onChange={(event)=>handleChange(event)} placeholder='Enter your college' /> */}
                    <select name="college" id="college" value={regData.college} onChange={(event) => handleChange(event)} >
                        <option value="" selected={true} disabled>SELECT</option>
                        <option value="VIT">VIT</option>
                        <option value="SRM">SRM</option>
                        <option value="BITS">BITS</option>
                    </select>
                </div>
                <div className="submit" onClick={() => registerUser()}>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Home