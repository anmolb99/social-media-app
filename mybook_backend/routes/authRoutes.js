const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
let path = require("path");

async function Mailer(recieverEmail, code) {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log(code);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAIL_EMAIL, // generated ethereal user
      pass: process.env.NODEMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "UNKNOWN", // sender address
    to: recieverEmail, // list of receivers
    subject: "Email Verification", // Subject line
    text: `Your verification code is ${code}`, // plain text body
    html: `<b>Your verification code is ${code}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

// sign up

router.post("/signup_verify_email", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    res.status(422).json({ error: "please fill all the feilds" });
  } else {
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      res.status(422).json({ error: "Email already exist" });
    } else {
      try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        await Mailer(email, verificationCode);
        res.status(200).json({ msg: "code sent", email, verificationCode });
      } catch (error) {
        res.status(422).json({ error: "error sending code " + error });
      }
    }
  }
});

router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  // console.log(email, username, password);
  if (!email || !username || !password) {
    res.status(422).json({ error: "please fill all the feilds" });
  } else {
    try {
      const user = new User({
        email: email,
        username: username,
        password: password,
      });
      await user.save();
      res.status(200).json({ msg: "user registered" });
    } catch (error) {
      res.status(422).json({ error });
    }
  }
});

router.post("/username_available", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(422).json({ error: "Please fill all the feilds" });
  } else {
    try {
      const usernameExist = await User.findOne({ username: username });
      // console.log(usernameExist);
      if (usernameExist !== null) {
        res.status(422).json({ error: "username exists" });
      } else {
        res.status(200).json({ msg: "username availabe" });
      }
    } catch (error) {
      res.status(422).json({ error });
    }
  }
});

// forgot password

router.post("/fp_verify_email", async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  if (!email) {
    res.status(422).json({ error: "please fill all the feilds" });
  } else {
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        await Mailer(email, verificationCode);
        res.status(200).json({ msg: "code sent", email, verificationCode });
      } catch (error) {
        res.status(422).json({ error: "error sending code " + error });
      }
    } else {
      res.status(422).json({ error: "Invalid credentials" });
    }
  }
});

router.post("/reset_password", async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(422).json({ error: "please fill all the fields" });
  } else {
    try {
      const savedUser = await User.findOne({ email: email });
      if (savedUser) {
        savedUser.password = password;
        await savedUser.save();
        res.status(200).json({ msg: "password changed" });
      } else {
        res.status(422).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(422).json({ error });
    }
  }
});

//log in

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    res.status(422).json({ error: "please fill all the fields" });
  } else {
    try {
      const savedUser = await User.findOne({ email, email });
      if (savedUser) {
        const isMatched = await bcrypt.compare(password, savedUser.password);
        if (isMatched) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET_KEY
          );
          const { _id, email, username } = savedUser;

          res.status(200).json({
            msg: "signed in successfully",
            token,
            user: {
              id: _id,
              email: email,
              username: username,
            },
          });
        } else {
          res.status(422).json({ error: "Invalid credentials" });
        }
      } else {
        res.status(422).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(422).json({ error });
    }
  }
});

//user profile

// router.post("/user_profile", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     res.status(422).json({ error: "Invalid credentials" });
//   } else {
//     try {
//       const savedUser = await User.findOne({ email: email });
//       if (savedUser) {
//         res
//           .status(200)
//           .json({ msg: "logged in successfully", user: savedUser });
//       } else {
//         res.status(422).json({ error: "Invalid credentials" });
//       }
//     } catch (error) {
//       res.status(422).json({ error });
//     }
//   }
// });

//my profile

router.get("/my_profile", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(422).json({ error: "Please login again" });
  } else {
    const token = authorization.replace("Bearer ", "");
    try {
      const tokendata = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      const savedUser = await User.findById(tokendata._id);

      if (savedUser) {
        res
          .status(200)
          .json({ msg: "logged in successfully", user: savedUser });
      } else {
        res.status(422).json({ error: "server error" });
      }
    } catch (error) {
      res.status(422).json({ error: error });
    }
  }
});

// user profile

router.post("/user_profile", async (req, res) => {
  const { id } = req.body;
  // console.log(req.body);

  try {
    const savedUser = await User.findById(id);
    if (savedUser) {
      res.status(200).json({ msg: "user fetched", user: savedUser });
    } else {
      res.status(422).json({ error: "server error" });
    }
  } catch (error) {
    res.status(422).json({ error: error });
  }
});

//change password

router.post("/change_password", async (req, res) => {
  const { oldpassword, newpassword, email } = req.body;

  if (!oldpassword || !newpassword || !email) {
    res.status(422).json({ error: "please fill all the feilds" });
  } else {
    try {
      const savedUser = await User.findOne({ email: email });
      if (savedUser) {
        const encrpytedpass = savedUser.password;
        const isMatched = await bcrypt.compare(oldpassword, encrpytedpass);
        console.log(isMatched);
        if (isMatched) {
          savedUser.password = newpassword;
          await savedUser.save();
          res.status(200).json({ msg: "password changed" });
        } else {
          res.status(422).json({ error: "old password is wrong" });
        }
      } else {
        res.status(422).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(422).json({ error: error });
    }
  }
});

router.post("/add_bio", async (req, res) => {
  const { id, bio } = req.body;

  if (!id) {
    res.status(422).json({ error: "something went wrong" });
  } else {
    try {
      const savedUser = await User.findById(id);
      if (savedUser) {
        savedUser.bio = bio;
        await savedUser.save();
        res.status(200).json({ msg: "New bio added" });
      } else {
        res.status(422).json({ error: "server error" });
      }
    } catch (error) {
      res.status(200).json({ error });
    }
  }
});

router.post("/change_username", async (req, res) => {
  const { username, id } = req.body;
  if (!username) {
    res.status(422).json({ error: "please fill all the feilds" });
  } else {
    const usernameAvailable = await User.find({ username });
    // console.log(usernameAvailable);
    if (!usernameAvailable.length > 0) {
      const savedUser = await User.findById(id);
      // console.log(savedUser);
      if (savedUser) {
        savedUser.username = username;
        await savedUser.save();
        res.status(200).json({ msg: "username changed" });
        // console.log(savedUser);
      } else {
        res.status(422).json({ error: "server error" });
      }
    } else {
      res.status(422).json({ error: "username already exist" });
    }
  }
});

// update profile picture

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images/ProfilePics");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/change_dp").post(upload.single("photo"), async (req, res) => {
  const { id } = req.body;
  const photo = req.file ? req.file.filename : "";
  // console.log(photo);
  try {
    const updatePic = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      { profilepic: photo }
    );

    if (updatePic.profilepic.length > 0) {
      fs.unlink("Images/ProfilePics/" + updatePic.profilepic, (err) => {
        if (err) {
          throw err;
        }
        // console.log("Delete File successfully.");
      });
    }
    // console.log(updatePic);
    res.status(200).json({ msg: "profile pic changed" });
  } catch (error) {
    console.log(error);
  }
});

const storageposts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images/Posts");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

let uploadposts = multer({ storage: storageposts, fileFilter });

router
  .route("/upload_post")
  .post(uploadposts.single("postimg"), async (req, res) => {
    const postimg = req.file ? req.file.filename : "";
    const { caption, location, id } = req.body;
    // console.log(postimg);

    const newpost = {
      postimage: postimg,
      caption: caption,
      location: location,
      likes: [],
      comments: [],
    };

    try {
      const savedUser = await User.findById({ _id: id });
      if (savedUser) {
        if (postimg.length > 0) {
          savedUser.posts.push(newpost);
          await savedUser.save();
          res.status(200).json({ msg: "post added" });
        } else {
          res.status(422).json({ error: "image not found" });
        }
      } else {
        res.status(422).json({ error: "server error" });
      }
    } catch (error) {
      res.status(422).json({ error });
    }
  });

module.exports = router;
