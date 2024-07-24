// routes/job.js
const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, deleteJob, updateJob } = require('../controllers/jobController');

router.post('/create', createJob);
router.get('/', getAllJobs);
router.delete('/:id', deleteJob);
router.put('/:id', updateJob);

module.exports = router;
