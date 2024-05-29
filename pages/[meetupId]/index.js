import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Checking from "../../components/meetups/Checking";

const MeetupDetails = ({ meetupData }) => {
  Checking();
  console.log(".................")
  return (
    <MeetupDetail
      image={meetupData.image}
      alt={meetupData.title}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
     />
  );
};

export const getStaticPaths =async () => {

  const client = await MongoClient.connect(
    "mongodb+srv://drashtichunawala:o8t435NSK6iWDXWt@cluster0.nwm8xvy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const ids=await meetupCollection.find({}, {_id:1}).toArray();
   return{
    fallback:'blocking',
    paths:ids.map(meetup=>({
        params:{meetupId:meetup._id.toString()}
    }))
   }
}

export const getStaticProps=  async (context)=> {

  const meetupId=context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://drashtichunawala:o8t435NSK6iWDXWt@cluster0.nwm8xvy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id:new ObjectId(meetupId),
  })
  console.log('selectedMeetup :>> ', selectedMeetup);
  return{
    props:{
      meetupData:{
        id:selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        address:selectedMeetup.address,
        image:selectedMeetup.image,
        description:selectedMeetup.description
      }
    }
  }

}

export default MeetupDetails;
