const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Family = mongoose.model("family");
const relation = require("../models/relationship");
const Invite = require("../models/invite");
const nodemailer = require("nodemailer");
const family = require("../models/familyGroup");

//Family Group Management

router.post("/families/create", async (req, res) => {
  console.log("create");
  const { groupName, email, members } = req.body;
  try {
    const newFamily = new Family({ groupName, email, members });
    const savefamily = await newFamily.save();
    const newinvite = new Invite({
      email: email,
      familyId: savefamily._id,
      owner: true,
    });
    newinvite.save();
    res.status(201).json(newFamily);
  } catch (err) {
    console.log(err);
  }
});

router.get("/families1/:id", async (req, res) => {
  console.log("getupdate");
  const { id } = req.params;
  try {
    const familyDetail = await Family.findById({ _id: id });
    res.json({ allfamily1: familyDetail });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
//retrieve the list of user's family group
router.get("/families/:email", async (req, res) => {
  console.log("get");
  const { email } = req.params;

  try {
    const familyListofuser = await Family.find({ email: email });
    const allinvitedemail = await relation
      .find({ sender: email })
      .select("receiver")
      .exec();
    const allinvitetomeemail = await relation
      .find({ receiver: email })
      .select("sender")
      .exec();

    const allFamilyDetails = [];
    for (let i = 0; i < allinvitedemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitedemail[i].receiver,
      });
      // allFamilyDetails.push(familyDetail);
      for (let j = 0; j < familyDetail.length; j++) {
        allFamilyDetails.push(familyDetail[i]);
      }
    }
    for (let i = 0; i < allinvitetomeemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitetomeemail[i].sender,
      });
      for (let j = 0; j < familyDetail.length; j++) {
        allFamilyDetails.push(familyDetail[i]);
      }
    }
    for (let j = 0; j < familyListofuser.length; j++) {
      allFamilyDetails.push(familyListofuser[j]);
    }
    // allFamilyDetails.push(familyListofuser);

    // console.log(allFamilyDetails);
    // res.json("hello");
    res.send({ allFamilyDetails });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/confirminvitation/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;
  try {
    const relations = new relation({ sender: sender, receiver: receiver });
    relations.save();
    // for (let i = 0; i < familyList.length; i++) {
    // const familyDetail =new Invite({ familyId: familyList[i].familyId,email:receiver,owner:false });
    // familyDetail.save();
    // }
    res.send("invition accepted successfully");
  } catch (error) {
    res.send("error");
  }
}); //explain this code
router.post("/send-mail", async (req, res) => {
  const { sender, receiver } = req.body;
  console.log(sender);
  let mailtransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ashim1998.poudyal@gmail.com",
      pass: "arup ossg moue xxme",
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });
  const url = `http://localhost:5000/confirminvitation/${sender}/${receiver}`;
  let details = {
    from: "ashim1998.poudyal@gmail.com",
    to: `${receiver}`,
    subject: "testing our api",
    html: `<h1>hello<h1/><button>cancel<button/><button><a href="${url}">accept</a></button>`,
  };
  mailtransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mail is sent");
    }

    // console.log("email sent");
  });
  // res.send("sending mails");
});

//delete the data
router.delete("/deleteRoute/:id", async (req, res) => {
  console.log("hey");
  try {
    // const familyResult=await Invite.deleteMany({familyId:req.params.id})
    // if(familyResult.ok === 1){
    const inviteResult = await Family.deleteOne({ _id: req.params.id });
    if (inviteResult.ok === 1) {
      res.send(inviteResult);
    }
  } catch (err) {
    console.log(err);
  }
});

//Update Route
router.put("/families/update/:id", async (req, res) => {
  console.log("create");
  const { id } = req.params;
  console.log(id);
  const { groupName, email, members } = req.body;
  try {
    const newFamily = await Family.findOneAndUpdate(
      { _id: id },
      { groupName, email, members },
      { new: true }
    );
    const updatedFamilyObject = newFamily.toObject();
    res.status(201).json(updatedFamilyObject);
  } catch (err) {
    console.log(err);
  }
});

//Count Date
router.get("/count-data/:email/:value", async (req, res) => {
  try {
    const { email } = req.params;
    // const {members}
    const{value}=req.params
    let findvalue = value / 12;
    const currdate = new Date();
    let curryear = currdate.getFullYear();
    let currmonth = currdate.getMonth();
    let currday = currdate.getDate();
    let currvalue = curryear + currmonth / 12 + currday / 30 / 12;
    console.log("currdate", currvalue);

    const currentDate = new Date();

    const thirtyDays = new Date(currentDate);
    thirtyDays.setDate(currentDate.getDate() - 30);

    const twoMonths = new Date(currentDate);
    twoMonths.setMonth(currentDate.getMonth() - 2);

    const threeMonths = new Date(currentDate);
    threeMonths.setMonth(currentDate.getMonth() - 3);

    const oneYear = new Date(currentDate);
    oneYear.setFullYear(currentDate.getFullYear() - 1);

    //Query for thirtyDays
    const queryThirtyDays = {
      "members.infectedDays": { $gte: thirtyDays, $lt: currentDate },
    };

    const queryTwoMonths = {
      "members.infectedDays": { $gte: twoMonths, $lt: currentDate },
    };

    const queryThreeMonths = {
      "members.infectedDays": { $gte: threeMonths, $lt: currentDate },
    };

    const queryOneYear = {
      "members.infectedDays": { $gte: oneYear, $lt: currentDate },
    };

    const familyListofuser = await Family.find({ email: email });
    const allinvitedemail = await relation
      .find({ sender: email })
      .select("receiver")
      .exec();
    const allinvitetomeemail = await relation
      .find({ receiver: email })
      .select("sender")
      .exec();
    const allFamilyDetails = [];
    for (let i = 0; i < allinvitedemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitedemail[i].receiver,
        "members.infectedDays": { $gte: thirtyDays, $lt: currentDate },
      });
      // allFamilyDetails.push(familyDetail);

      for (let j = 0; j < familyDetail.length; j++) {
        let year = familyDetail[i].members[0].dob.getFullYear();
        let month = familyDetail[i].members[0].dob.getMonth();
        let day = familyDetail[i].members[0].dob.getDate();
        let value = year + month / 12 + day / 30 / 12;
        if (currvalue - value <= findvalue) {
          allFamilyDetails.push(familyDetail[i]);
        }
      }
    }
    for (let i = 0; i < allinvitetomeemail.length; i++) {
      const familyDetail = await Family.find({
        email: allinvitetomeemail[i].sender,
        "members.infectedDays": { $gte: thirtyDays, $lt: currentDate },
      });
      for (let j = 0; j < familyDetail.length; j++) {
        let year = familyDetail[i].members[0].dob.getFullYear();
        let month = familyDetail[i].members[0].dob.getMonth();
        let day = familyDetail[i].members[0].dob.getDate();
        let value = year + month / 12 + day / 30 / 12;
        if (currvalue - value <= findvalue) {
          allFamilyDetails.push(familyDetail[i]);
        }
      }
    }
    for (let j = 0; j < familyListofuser.length; j++) {
      let year = familyListofuser[j].members[0].dob.getFullYear();
      let month = familyListofuser[j].members[0].dob.getMonth();
      let day = familyListofuser[j].members[0].dob.getDate();
      console.log("record date", month);
      let value = year + month / 12 + day / 30 / 12;
      console.log("vaueof records", value);
      if (currvalue - value <= findvalue) {
        allFamilyDetails.push(familyListofuser[j]);
        // allFamilyDetails.push(familyDetail[i]);
      }
    }
    // const dataThirtyDays = await Family.find(queryThirtyDays)
    // const dataTwoMonths = await Family.find(queryTwoMonths)
    // const dataThreeMonths = await Family.find(queryThreeMonths)
    // const dataOneYear = await Family.find(queryOneYear)

    // const allData = [...dataThirtyDays, ...dataTwoMonths, ...dataThreeMonths, ...dataOneYear]

    res.send(allFamilyDetails);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
