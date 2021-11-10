const crypto = require('crypto')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload')
const User = require('./models/users');
const Mentor = require('./models/mentors');
const Institutions = require('./models/institutions');
const path = require('path');
const Resume = require('./models/uploads');

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost/recommender", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('MongoDB connected...');
}
connectDB();

// Protect routes
const isAuthenticated = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token)
  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized', status: 401 });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "!@#$@1234");
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ msg: 'Unauthorized', status: 401 });
  }
};

app.use(cors());
app.use(fileUpload())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());


app.post('/api/users/register',  async (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const userExist = await User.findOne({email:email});
    if (userExist) return res.status(400).json({msg: 'user already registered'});

    const user = User({
      name,
      email,
      password
    })

    await user.save();

    return res.status(201).json({'msg': 'user registered successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.get('/api/users', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find().sort('-createdAt');
    return res.status(201).json({'count': users.length, 'users': users})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.post('/api/users/login',  async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({email:email});

    if (!user) return res.status(401).json({msg: 'email or password is incorrect'})

    const isMatch = await user.comparePass(password);
    console.log({isMatch})

    if (!isMatch) return res.status(401).json({msg: 'email or password is incorrect'})

    const token = await user.getJWT()

    return res.status(200).json({'msg': 'user login successfully', token: token})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});



// Mentors Route
app.post('/api/mentors/add', isAuthenticated,  async (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email

    const userExist = await Mentor.findOne({email:email});
    if (userExist) return res.status(400).json({msg: 'mentor already registered'});

    function mentorCode() {
      return Math.floor(Math.random() * 100000) + 1
    }

    const mentor = Mentor({
      name,
      email,
      code: mentorCode()
    })

    await mentor.save();
    return res.status(201).json({'msg': 'mentor registered successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.put('/api/mentors/:id', isAuthenticated, async (req, res) => {
  try {
    if (req.body.name === '' || !req.body.name || req.body.email === '' || !req.body.email) return res.status(400).json({'msg': 'name and email is required'})

    const name = req.body.name
    const email = req.body.email


    const mentor = await Mentor.findOne({email:email});
    if (!mentor) return res.status(404).json({msg: 'mentor does not exist'});

    const updated = await Mentor.findOneAndUpdate({_id:req.params.id}, {
      name: name,
      email: email
    }); 

    return res.status(201).json({'msg': 'mentor profile updated successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.delete('/api/mentors/:id', isAuthenticated, async (req, res) => {
  try {
    
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({msg: 'mentor does not exist'});

    await Mentor.findByIdAndDelete(req.params.id) 
    return res.status(201).json({'msg': 'mentor deleted successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.get('/api/mentors', isAuthenticated, async (req, res) => {
  try {
    const mentors = await Mentor.find().sort('-createdAt');
    return res.status(201).json({'count': mentors.length, 'mentors': mentors})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


// Institutions Route
app.post('/api/institution/add', isAuthenticated, async (req, res) => {
  try {
    const name = req.body.name

    const instition = await Institutions.findOne({name:name});
    if (instition) return res.status(400).json({msg: 'institution already registered'});

    function institutionCode() {
      return `INST${Math.floor(Math.random() * 10000000) + 1}`
    }

    const institution = Institutions({
      name,
      institutionCode: institutionCode()
    })

    await institution.save();
    return res.status(201).json({msg: 'institution registered successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.put('/api/institution/:id', isAuthenticated, async (req, res) => {
  try {
    const name = req.body.name
    if (req.body.name === '' || !req.body.name) return res.status(400).json({'msg': 'name is required'})
    const institution = await Institutions.findOne({_id:req.params.id});
    if (!institution) return res.status(404).json({msg: 'institution does not exist'});

    const updated = await Institutions.findOneAndUpdate({_id:req.params.id}, {
      name: name
    });

    return res.status(201).json({'msg': 'institution updated successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.delete('/api/institution/:id', isAuthenticated,  async (req, res) => {
  try {
    
    const institution = await Institutions.findById(req.params.id);
    if (!institution) return res.status(404).json({msg: 'institution does not exist'});

    await Institutions.findByIdAndDelete(req.params.id) 
    return res.status(201).json({msg: 'institution deleted successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.get('/api/institution', isAuthenticated, async (req, res) => {
  try {
    const institutions = await Institutions.find().sort('-createdAt');
    return res.status(201).json({'count': institutions.length, 'institutions': institutions})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.post('/api/resume/upload', isAuthenticated,  async (req, res) => {
  try {

    if (req.files === null) return res.status(400).json({msg: 'No file uploaded'})

    const file = req.files.file

    file.mv(`${__dirname}/client/public/${file.name}`, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({msg: err})
      }
    });

    const resume = Resume({
      user: req.user,
      filename: file.name,
      filepath: `/uploads/${file.name}`
    })

    await resume.save() 
    return res.status(200).json({msg: 'file uploaded successfully'})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});


app.get('/api/resumes', isAuthenticated, async (req, res) => {
  try {
    const resumes = await Resume.find().sort('-createdAt');
    return res.status(201).json({'count': resumes.length, 'resumes': resumes})

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: error.message})
  }
});

app.get('/', (req, res) => {
  res.send("API is runnng");
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});