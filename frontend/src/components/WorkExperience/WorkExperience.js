
import React, { useState } from 'react';
import "./index.css";

const WorkExperience = () => {
  const [isFresher, setIsFresher] = useState(true);
  const [experiences, setExperiences] = useState([
    { company: '', jobTitle: '', startDate: '', endDate: '', responsibilities: '', reasonForLeaving: '', salary: '', employmentType: '' },
  ]);

  const jobTitles = [
    "Full Stack Developer", "Front End Developer", "Backend Developer", "Mobile App Developer (iOS/Android)",
    "DevOps Engineer", "Cloud Computing Specialist", "Cybersecurity Analyst", "Database Administrator",
    "UI/UX Designer", "Game Developer", "Blockchain Developer", "AR/VR Developer", "Data Scientist",
    "Machine Learning Engineer", "Business Intelligence Analyst", "Big Data Engineer", "Statistician",
    "Quantitative Analyst", "Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Chemical Engineer",
    "Aerospace Engineer", "Biomedical Engineer", "Environmental Engineer", "Robotics Engineer",
    "Materials Scientist", "Financial Analyst", "Investment Banker", "Management Consultant", "Project Manager",
    "Business Development Manager", "Human Resources Manager", "Supply Chain Manager", "Operations Manager",
    "Risk Analyst", "Chartered Accountant", "Digital Marketing Specialist", "Content Strategist",
    "Social Media Manager", "Brand Manager", "Public Relations Specialist", "SEO Specialist", "Copywriter",
    "Marketing Analytics Manager", "Graphic Designer", "Industrial Designer", "Fashion Designer",
    "Interior Designer", "3D Modeler", "Motion Graphics Designer", "UX Researcher", "Physician",
    "Nurse Practitioner", "Pharmacist", "Biotechnologist", "Clinical Research Associate",
    "Nutritionist/Dietitian", "Bioinformatics Specialist", "Corporate Lawyer", "Patent Attorney",
    "Compliance Officer", "Legal Researcher", "Paralegal", "University Professor", "Research Scientist",
    "Data Analyst", "Curriculum Developer", "Instructional Designer", "Education Technology Specialist",
    "Film Director", "Video Editor", "Sound Engineer", "Animator", "Journalist", "Game Designer", "Podcaster",
    "Environmental Scientist", "Sustainability Consultant", "Renewable Energy Engineer",
    "Conservation Biologist", "Urban Planner", "Hotel Manager", "Event Planner", "Travel Consultant", "Chef",
    "Restaurant Manager", "Sales Manager", "Account Executive", "Customer Success Manager",
    "Technical Support Specialist", "Product Manager", "Quality Assurance Engineer", "Systems Administrator",
    "Network Engineer", "Information Security Analyst", "Business Analyst", "Data Engineer", "UX/UI Developer",
    "Technical Writer", "Scrum Master"
  ];

  const handleFresherChange = (event) => {
    setIsFresher(event.target.value === 'yes');
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: '', jobTitle: '', startDate: '', endDate: '', responsibilities: '', reasonForLeaving: '', salary: '', employmentType: '' },
    ]);
  };

  const calculateYearsOfExperience = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();
    const totalMonths = yearsDiff * 12 + monthsDiff;
    return (totalMonths / 12).toFixed(1);
  };

  return (
    <div className="work-experience">
      <h2 className='main-heading-for-page'>Work Experience</h2>
      <div className="fresher-section">
        <label>Are you a fresher (no prior work experience)?</label>
        <select onChange={handleFresherChange}>
          <option value="yes">Yes, I am a fresher</option>
          <option value="no">No, I have work experience</option>
        </select>
      </div>
      {!isFresher && (
        <div className="experience-details">
          {experiences.map((experience, index) => (
            <div key={index} className="experience">
              <div className="form-group">
                <label>Company Name:</label>
                <input
                  type="text"
                  name="company"
                  value={experience.company}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label>Job Title:</label>
                <select
                  name="jobTitle"
                  value={experience.jobTitle}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">Select Job Title</option>
                  {jobTitles.map((title, idx) => (
                    <option key={idx} value={title}>{title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Employment Dates:</label>
                <div className="date-picker">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={experience.startDate}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="date-picker">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={experience.endDate}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Years of Experience:</label>
                <input
                  type="text"
                  placeholder="Years of Experience"
                  value={calculateYearsOfExperience(experience.startDate, experience.endDate)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Employment Type:</label>
                <select
                  name="employmentType"
                  value={experience.employmentType}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="form-group">
                <label>Responsibilities and Achievements:</label>
                <textarea
                  name="responsibilities"
                  value={experience.responsibilities}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label>Reason for Leaving Previous Job:</label>
                <input
                  type="text"
                  name="reasonForLeaving"
                  value={experience.reasonForLeaving}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label>Previous Salary:</label>
                <input
                  type="text"
                  name="salary"
                  value={experience.salary}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
          ))}
          <button className="add-experience-button" onClick={addExperience}>
            Add Another Job Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
