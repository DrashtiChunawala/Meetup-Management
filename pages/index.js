import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Checking from '../components/meetups/Checking';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title:"First Meetup",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCRVAs5kjpdBjFMA05_1FzmUybNrf6DUko3lxnMYeurg&s",
        address:"Some address 5, 12345 Some City",
        description:"First Meetup"

    },
    {
        id: 'm2',
        title:"Second Meetup",
        image:"https://cdn.britannica.com/13/146313-050-DD9AAC27/India-War-Memorial-arch-New-Delhi-Sir.jpg",
        address:"Some address 5, 12345 Some City",
        description:"Second Meetup"

    },
]

const HomePage=(props)=>{ 
    // const[loadedMeetups,setLoadedMeetups]=useState([]);

    // useEffect(()=>{

    //     setLoadedMeetups(DUMMY_MEETUPS)
    // },[])
    Checking();
    return(
        <div>

            <MeetupList meetups={props.meetups}/>

        </div>
    )
}


export const getStaticProps=async ()=>{
    const client = await MongoClient.connect(
        "mongodb+srv://drashtichunawala:o8t435NSK6iWDXWt@cluster0.nwm8xvy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const meetups = await meetupCollection.find().toArray();
console.log("IM RUNNING")
    return{
        props:{
            meetups:meetups.map(meetup=>{
                return{
                    title:meetup.title,
                    address:meetup.address,
                    image:meetup.image,
                    id:meetup._id.toString()
                }
            })
        },
        revalidate:10
    }
    
}

// export const getServerSideProps = async (context) => {
//     //**************Note***************** */
//     // Server-Side Rendering (SSR): It is used when you need to fetch data on every request.
//     // Dynamic Data: If your data changes frequently and you need to fetch it dynamically on each request, getServerSideProps is the way to go.
//     // Authentication: If your page requires user-specific data or authentication, getServerSideProps can be used to fetch data from the server, where you have access to session data, cookies, and other server-side information.
//     // Slow Data Fetching: If data fetching is slow or relies on external APIs that might change frequently, you might prefer getServerSideProps to ensure fresh data on each request.
//     // *************Note*****************
//     //**********USE************ */
//     //fetch data from an API
//     //can also used instead of getStaticProps
//     //can also access session data and cookies from client request
//     // const req = context.req;
//     // const res = context.res;
//     console.log("im runnig...");
//     return {
//       props: {
//         meetups: DUMMY_MEETUPS,
//       },
//       //can not use revalidate here;
//     };
//   };

export default HomePage;