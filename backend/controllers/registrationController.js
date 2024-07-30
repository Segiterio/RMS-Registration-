import asyncHandler from 'express-async-handler';
import Registration from '../models/Registration.js';

// @desc    Register a new user
// @route   POST /api/registrations
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {
        personalInformation,
        jobPreferences,
        education,
        skillsAndCertifications,
        trainingWorkshops,
        workExperience,
        languagesKnown,
        resumeCV,
        workSamples,
        professionalAffiliations,
        awardsHonors,
        publications,
        volunteerExperience,
        hobbiesInterests
    } = req.body;

    const registration = new Registration({
        personalInformation,
        jobPreferences,
        education,
        skillsAndCertifications,
        trainingWorkshops,
        workExperience,
        languagesKnown,
        resumeCV,
        workSamples,
        professionalAffiliations,
        awardsHonors,
        publications,
        volunteerExperience,
        hobbiesInterests
    });

    const createdRegistration = await registration.save();
    res.status(201).json(createdRegistration);
});

export { registerUser };
