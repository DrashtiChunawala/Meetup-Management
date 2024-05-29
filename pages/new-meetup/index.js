import Checking from "../../components/meetups/Checking"
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
// import {useRouter} from 'next/router'
import { useRouter } from 'next/router'
const NewMeetupPage=() => {
    const router=useRouter()
    Checking();
    const addMeetupHandler= async (enteredMeetupData)=>{
        const response=await fetch('/api/new-meetup',{
            method:'POST',
            body:JSON.stringify(enteredMeetupData),
            headers:{
                'Content-Type':'application/json'
            }
        });
        router.replace('/');
        // const data=await response.json();
// console.log(data)

    }
    return(
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    )
}
export default NewMeetupPage