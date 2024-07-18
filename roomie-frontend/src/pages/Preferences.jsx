import React from 'react'
import { axiosInstance } from '../service/axios'
import { useLocation,useNavigate } from 'react-router'
import smoking from '../icons/ban-smoking-solid.svg'
import sports from '../icons/basketball-solid.svg'
import gym from '../icons/dumbbell-solid.svg'
import gamer from '../icons/gamepad-solid.svg'
import pets from '../icons/paw-solid.svg'
import travel from '../icons/plane-departure-solid.svg'
import vegan from '../icons/seedling-solid.svg'
import drinking from '../icons/wine-bottle-solid.svg'


const Preferences = () => {
    const location = useLocation()
    const navigate=useNavigate()
    const [preferences, setPreferences] = React.useState({
        gamer: false,
        travel: false,
        gym: false,
        smoker: false,
        drinker: false,
        vegan: false,
        pets: false,
        sports: false,
    })

    const handleClick = (id) => {
        // console.log([id])
        setPreferences((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    // const options= [{name:'Sporty',field:'sports'},'Gamer',"Fitness Freak",'Non-Smoker','Non-Alcoholic','Vegan','Pet Lover','Wanderer']
    const options = [{ name: 'Sporty', field: 'sports', icon: sports },
    { name: 'Gamer', field: 'gamer', icon: gamer },
    { name: 'Wanderer', field: 'travel', icon: travel },
    { name: 'Fitness Freak', field: 'gym', icon: gym },
    { name: 'Non-Smoker', field: 'smoker', icon: smoking },
    { name: 'Non-Alcoholic', field: 'drinker', icon: drinking },
    { name: 'Vegan', field: 'vegan', icon: vegan },
    { name: 'Pet Lover', field: 'pets', icon: pets }
    ].map((item) => {
        return (
            <div key={item.field} className={`flex cursor-pointer flex-col gap-5 items-center min-w-32 hover:opacity-70 justify-center p-3 rounded-md ${preferences[item.field] && 'bg-orange-400'}`} onClick={() => handleClick(item.field)}>
                <img alt='icon' src={item.icon} className='rounded-full h-12 w-12 bg-cover ' />
                <p>{item.name}</p>
            </div>
        )
    })
    // console.log(location.state)

    const registerUser = async () => {
        try {
            const user = {
                name: location.state.name,
                college_name: location.state.college,
                email: location.state.email,
                age: location.state.age,
                password: location.state.password,
                gender: location.state.gender,
                preferences:preferences
            }
            console.log(user)
            const result = await axiosInstance.post('api/v1/auth/register', user)
            console.log(result, 'result')
                // setStatus('Registration Successful!')
                // resetForm()
                navigate('/')
            
        } catch (error) {
            console.log(error)
            // if(error.response.location.state.msg){
            //     // setStatus(error.response.location.state.msg)
            // }
            // else{
            //     // setStatus('Could not register,please try again')
            // }
        }
    }

    return (
        <div className='flex flex-col gap-32 min-h-screen bg-orange-200 justify-center'>
            <p className='text-3xl font-semibold text-center'>How would you like your roomate to be?</p>
            <div className='flex items-center justify-center'>
                <div className='flex gap-5 items-center justify-center'>
                    {options}
                </div>
            </div>
            <button className='w-fit mx-auto' onClick={()=>registerUser()}>Sign Up</button>
        </div>

    )
}

export default Preferences