
// POST api/new-meetup
import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://drashtichunawala:o8t435NSK6iWDXWt@cluster0.nwm8xvy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    client.close();
    res.status(201).json({
      message: "One meetup inserted successfully",
    });
    console.log(result)
  }
};
export default handler;