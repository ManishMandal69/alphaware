// controllers/jobController.js
const Job = require('../models/Job');

// Create Job
exports.createJob = async (req, res) => {
  const { company, position, contract, location } = req.body;
  console.log(company, position, contract, location ,req.body);
  try {
    const job = new Job({ company, position, contract, location });
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json(req.params.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  const { company, position, contract, location } = req.body;
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    job.company = company;
    job.position = position;
    job.contract = contract;
    job.location = location;

    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
