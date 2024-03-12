const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

const os = require('os');
const si = require('systeminformation');


let records = [];

//Get all students
router.get('/', (req, res) => {
  res.send('App is running..');
});

router.get("/sysinfo", (req, res) => {
  res.json({

// Get the serial number of the machine
const serialNumber = os.cpus()[0].serial;

// Display the serial number to the user
console.log(`Your serial number is: ${serialNumber}`);

  });
});


router.get("/sysinformation", (req, res) => {
  res.json({
// Get the serial number of the machine
     si.system().then(data => {
    const serialNumber = data.serial;
    // Display the serial number to the user
    console.log(`Your serial number is: ${serialNumber}`);
}).catch(error => {
    console.error(`Error retrieving serial number: ${error}`);
});


  });
});


//Create new record
router.post('/add', (req, res) => {
  res.send('New record added.');
});

//delete existing record
router.delete('/', (req, res) => {
  res.send('Deleted existing record');
});

//updating existing record
router.put('/', (req, res) => {
  res.send('Updating existing record');
});

//showing demo records
router.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com',
    },
    {
      id: '002',
      name: 'Sam',
      email: 'sam@gmail.com',
    },
    {
      id: '003',
      name: 'lily',
      email: 'lily@gmail.com',
    },
  ]);
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
