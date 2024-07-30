
import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import "./index.css";
import countries from './country.json';

const AdditionalInformation = () => {
  const [formData, setFormData] = useState({
    hasVisa: false,
    visaCountry: [],
    visaType: '',
    otherVisaType: '',
    visaExpiryDate: '',
    visaDocument: null,
    passport: null,
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    trainingWorkshops: [],
    languagesKnown: '',
    resumeCV: null,
    workSamples: [],
    professionalAffiliations: [],
    awardsHonors: [],
    publications: [],
    volunteerExperience: [],
    hobbiesInterests: '',
    skills: [],
    certifications: [],
    languages: [],
    hobbies: []
  });
  console.log(formData.visaCountry)


  const [newTrainingWorkshop, setNewTrainingWorkshop] = useState({ 
    title: '', 
    type: '',
    customType: '',
    date: '', 
    description: '' 
  });
  const [newAffiliation, setNewAffiliation] = useState('');
  const [newVolunteerExperience, setNewVolunteerExperience] = useState('');

  const workshopTypes = [
    'Conference',
    'Seminar',
    'Webinar',
    'Workshop',
    'Training',
    'Course',
    'Other'
  ];

  const visaTypes = [
    'Tourist Visa',
    'Business Visa',
    'Work Visa',
    'Student Visa',
    'Permanent Resident Visa',
    'Diplomatic Visa',
    'Transit Visa',
    'Journalist Visa',
    'Medical Visa',
    'Spousal Visa',
    'Other'
  ];

  // const countryOptions = countries.map(country => ({
  //   value: country.code,
  //   label: country.name
  // }));
  const countryOptions = countries.map(country => ({
    value: country.country_name,
    label: country.country_name
  }));

  const skillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'scala', label: 'Scala' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'sql', label: 'SQL' },
    { value: 'nosql', label: 'NoSQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'oracle', label: 'Oracle' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'express', label: 'Express.js' },
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' },
    { value: 'spring', label: 'Spring' },
    { value: 'aspnet', label: 'ASP.NET' },
    { value: 'laravel', label: 'Laravel' },
    { value: 'ruby_on_rails', label: 'Ruby on Rails' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sass', label: 'Sass' },
    { value: 'less', label: 'Less' },
    { value: 'bootstrap', label: 'Bootstrap' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'webpack', label: 'Webpack' },
    { value: 'babel', label: 'Babel' },
    { value: 'gulp', label: 'Gulp' },
    { value: 'grunt', label: 'Grunt' },
    { value: 'git', label: 'Git' },
    { value: 'svn', label: 'SVN' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'jenkins', label: 'Jenkins' },
    { value: 'circleci', label: 'CircleCI' },
    { value: 'travis', label: 'Travis CI' },
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Azure' },
    { value: 'gcp', label: 'Google Cloud Platform' },
    { value: 'heroku', label: 'Heroku' },
    { value: 'digitalocean', label: 'DigitalOcean' },
    { value: 'linux', label: 'Linux' },
    { value: 'unix', label: 'Unix' },
    { value: 'windows', label: 'Windows' },
    { value: 'macos', label: 'macOS' },
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'iOS' },
    { value: 'react_native', label: 'React Native' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'xamarin', label: 'Xamarin' },
    { value: 'unity', label: 'Unity' },
    { value: 'unreal_engine', label: 'Unreal Engine' },
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'keras', label: 'Keras' },
    { value: 'scikit_learn', label: 'scikit-learn' },
    { value: 'pandas', label: 'pandas' },
    { value: 'numpy', label: 'NumPy' },
    { value: 'matplotlib', label: 'Matplotlib' },
    { value: 'opencv', label: 'OpenCV' },
    { value: 'hadoop', label: 'Hadoop' },
    { value: 'spark', label: 'Apache Spark' },
    { value: 'kafka', label: 'Apache Kafka' },
    { value: 'elasticsearch', label: 'Elasticsearch' },
    { value: 'logstash', label: 'Logstash' },
    { value: 'kibana', label: 'Kibana' },
    { value: 'grafana', label: 'Grafana' },
    { value: 'prometheus', label: 'Prometheus' },
    { value: 'tableau', label: 'Tableau' },
    { value: 'power_bi', label: 'Power BI' },
    { value: 'qlikview', label: 'QlikView' },
    { value: 'sas', label: 'SAS' },
    { value: 'spss', label: 'SPSS' },
    { value: 'photoshop', label: 'Adobe Photoshop' },
    { value: 'illustrator', label: 'Adobe Illustrator' },
    { value: 'indesign', label: 'Adobe InDesign' },
    { value: 'premiere_pro', label: 'Adobe Premiere Pro' },
    { value: 'after_effects', label: 'Adobe After Effects' },
    { value: 'figma', label: 'Figma' },
    { value: 'sketch', label: 'Sketch' },
    { value: 'invision', label: 'InVision' },
    { value: 'zeplin', label: 'Zeplin' },
    { value: 'jira', label: 'Jira' },
    { value: 'trello', label: 'Trello' },
    { value: 'asana', label: 'Asana' },
    { value: 'slack', label: 'Slack' },
  ];

  const handleFileUpload = (key, files) => {
    setFormData({...formData, [key]: files });
  };

  const handleSkillChange = (selectedOptions) => {
    setFormData({
      ...formData,
      skills: selectedOptions.map(option => option.label)
    });
  };

  const addLanguage = () => {
    if (formData.languagesKnown) {
      setFormData({
        ...formData,
        languages: [...formData.languages, { name: formData.languagesKnown, speak: '', read: '', write: '' }],
        languagesKnown: ''
      });
    }
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index][field] = value;
    setFormData({...formData, languages: updatedLanguages });
  };

  const removeLanguage = (index) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index)
    });
  };

  const addHobby = () => {
    if (formData.hobbiesInterests) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, formData.hobbiesInterests],
        hobbiesInterests: ''
      });
    }
  };

  const removeHobby = (hobby) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter((h) => h !== hobby)
    });
  };

  const handleTrainingWorkshopAdd = () => {
    if (newTrainingWorkshop.title && newTrainingWorkshop.date) {
      const workshopToAdd = {
        ...newTrainingWorkshop,
        type: newTrainingWorkshop.type === 'Other' ? newTrainingWorkshop.customType : newTrainingWorkshop.type
      };
      setFormData({
        ...formData,
        trainingWorkshops: [...formData.trainingWorkshops, workshopToAdd]
      });
      setNewTrainingWorkshop({ title: '', type: '', customType: '', date: '', description: '' });
    }
  };

  const removeTrainingWorkshop = (index) => {
    setFormData({
      ...formData,
      trainingWorkshops: formData.trainingWorkshops.filter((_, i) => i !== index)
    });
  };

  const addAffiliation = () => {
    if (newAffiliation) {
      setFormData({
        ...formData,
        professionalAffiliations: [...formData.professionalAffiliations, newAffiliation]
      });
      setNewAffiliation('');
    }
  };


  const removeAffiliation = (index) => {
    setFormData({
      ...formData,
      professionalAffiliations: formData.professionalAffiliations.filter((_, i) => i !== index)
    });
  };

  const addVolunteerExperience = () => {
    if (newVolunteerExperience) {
      setFormData({
        ...formData,
        volunteerExperience: [...formData.volunteerExperience, newVolunteerExperience]
      });
      setNewVolunteerExperience('');
    }
  };

  const removeVolunteerExperience = (index) => {
    setFormData({
      ...formData,
      volunteerExperience: formData.volunteerExperience.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="form-section">
      <h2 className='main-heading-for-page'>Additional Information</h2>

      <div className="form-group">
        <h4>Visa Information</h4>
         <div class="checkbox-container">
        <input
            type="checkbox"
            id="visaCheckbox"
            className='checkbox-input'
            checked={formData.hasVisa}
            onChange={(e) => setFormData({...formData, hasVisa: e.target.checked})}
        />
        <label for="visaCheckbox" className='checkbox-label'>Do you have a visa?</label>
    </div>

        {formData.hasVisa && (
          <>
            <label>
  Country
  <Select
    isMulti
    options={countryOptions}
    value={formData.visaCountry.map(country => ({ value: country, label: country }))}
    onChange={(selectedOptions) => setFormData({...formData, visaCountry: selectedOptions.map(option => option.value)})}
  />
</label>

            <label>
              Visa Type
              <select
                value={formData.visaType}
                onChange={(e) => setFormData({...formData, visaType: e.target.value})}
              >
                <option value="">Select Visa Type</option>
                {visaTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </label>

            {formData.visaType === 'Other' && (
              <input
                type="text"
                placeholder="Specify Other Visa Type"
                value={formData.otherVisaType}
                onChange={(e) => setFormData({...formData, otherVisaType: e.target.value})}
              />
            )}

            <label>
              Visa Expiry Date
              <input
                type="date"
                value={formData.visaExpiryDate}
                onChange={(e) => setFormData({...formData, visaExpiryDate: e.target.value})}
              />
            </label>

            <label>
              Upload Visa Document
              <input
                type="file"
                onChange={(e) => handleFileUpload('visaDocument', e.target.files[0])}
              />
            </label>

            <label>
              Upload Passport
              <input
                type="file"
                onChange={(e) => handleFileUpload('passport', e.target.files[0])}
              />
            </label>

            <label>
              Passport Number
              <input
                type="text"
                value={formData.passportNumber}
                onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
              />
            </label>

            <label>
              Passport Issue Date
              <input
                type="date"
                value={formData.passportIssueDate}
                onChange={(e) => setFormData({...formData, passportIssueDate: e.target.value})}
              />
            </label>

            <label>
              Passport Expiry Date
              <input
                type="date"
                value={formData.passportExpiryDate}
                onChange={(e) => setFormData({...formData, passportExpiryDate: e.target.value})}
                />
                </label>
                </>
                )}
                </div>
                <div className="form-group">
    <label>Skills and Certifications</label>
    <Select
      isMulti
      options={skillOptions}
      value={formData.skills.map(skill => ({ value: skill, label: skill }))}
      onChange={handleSkillChange}
      placeholder="Select skills..."
    />
  </div>

  <div className="form-group">
    <label>Training and Workshops</label>
    <div className="input-group">
      <input
        type="text"
        placeholder="Title"
        value={newTrainingWorkshop.title}
        onChange={(e) => setNewTrainingWorkshop({...newTrainingWorkshop, title: e.target.value})}
      />
      <select
        value={newTrainingWorkshop.type}
        onChange={(e) => setNewTrainingWorkshop({...newTrainingWorkshop, type: e.target.value})}
      >
        <option value="">Select Type</option>
        {workshopTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      {newTrainingWorkshop.type === 'Other' && (
        <input
          type="text"
          placeholder="Custom Type"
          value={newTrainingWorkshop.customType}
          onChange={(e) => setNewTrainingWorkshop({...newTrainingWorkshop, customType: e.target.value})}
        />
      )}
      <input
        type="date"
        value={newTrainingWorkshop.date}
        onChange={(e) => setNewTrainingWorkshop({...newTrainingWorkshop, date: e.target.value})}
      />
      <textarea
        placeholder="Description"
        value={newTrainingWorkshop.description}
        onChange={(e) => setNewTrainingWorkshop({...newTrainingWorkshop, description: e.target.value})}
      />
      <button className="add-button" onClick={handleTrainingWorkshopAdd}>
        <FaPlus /> Add
      </button>
    </div>
    {formData.trainingWorkshops.map((item, index) => (
      <div key={index} className="list-item">
        <strong>{item.title}</strong> - {item.type} - {item.date}
        <p>{item.description}</p>
        <button className="remove-button" onClick={() => removeTrainingWorkshop(index)}>
          <FaTimes />
        </button>
      </div>
    ))}
  </div>

  <div className="form-group">
    <label>Languages Known</label>
    <div className="input-group">
      <input
        type="text"
        value={formData.languagesKnown}
        onChange={(e) => setFormData({...formData, languagesKnown: e.target.value})}
      />
      <button className="add-button" onClick={addLanguage}>Add Language</button>
    </div>
    {formData.languages.map((language, index) => (
      <div key={index} className="language-group">
        <label>{language.name}</label>
        <div className="select-group">
          <div>
            <label>Speak</label>
            <select
              value={language.speak}
              onChange={(e) => handleLanguageChange(index, 'speak', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Fluent">Fluent</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
          <div>
            <label>Read</label>
            <select
              value={language.read}
              onChange={(e) => handleLanguageChange(index, 'read', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Fluent">Fluent</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
          <div>
            <label>Write</label>
            <select
              value={language.write}
              onChange={(e) => handleLanguageChange(index, 'write', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Fluent">Fluent</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
          <button className="remove-button" onClick={() => removeLanguage(index)}>
            <FaTimes />
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="form-group">
    <label>Resume/CV</label>
    <input
      type="file"
      onChange={(e) => handleFileUpload('resumeCV', e.target.files[0])}
    />
  </div>

  <div className="form-group">
    <label>Work Samples</label>
    <input
      type="file"
      multiple
      onChange={(e) => handleFileUpload('workSamples', Array.from(e.target.files))}
    />
  </div>

  <div className="form-group">
    <label>Professional Affiliations</label>
    <div className="input-group">
      <input
        type="text"
        value={newAffiliation}
        onChange={(e) => setNewAffiliation(e.target.value)}
        placeholder="Add affiliation"
      />
      <button className="add-button" onClick={addAffiliation}>
        <FaPlus /> Add
      </button>
    </div>
    {formData.professionalAffiliations.map((affiliation, index) => (
      <div key={index} className="list-item">
        {affiliation}
        <button className="remove-button" onClick={() => removeAffiliation(index)}>
          <FaTimes />
        </button>
      </div>
    ))}
  </div>

  <div className="form-group">
    <label>Awards and Honors</label>
    <div className="list-group">
      <input
        type="text"
        placeholder="Add award"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setFormData({...formData, awardsHonors: [...formData.awardsHonors, e.target.value]});
            e.target.value = '';
          }
        }}
      />
      {formData.awardsHonors.map((award, index) => (
        <div key={index} className="list-item">
          {award}
          <button className="remove-button" onClick={() => setFormData({...formData, awardsHonors: formData.awardsHonors.filter((_, i) => i !== index)})}>
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  </div>

  <div className="form-group">
    <label>Publications</label>
    <div className="list-group">
      <input
        type="text"
        placeholder="Add publication"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setFormData({...formData, publications: [...formData.publications, e.target.value]});
            e.target.value = '';
          }
        }}
      />
      {formData.publications.map((publication, index) => (
        <div key={index} className="list-item">
          {publication}
          <button className="remove-button" onClick={() => setFormData({...formData, publications: formData.publications.filter((_, i) => i !== index)})}>
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  </div>

  <div className="form-group">
    <label>Volunteer Experience</label>
    <div className="input-group">
      <input
        type="text"
        value={newVolunteerExperience}
        onChange={(e) => setNewVolunteerExperience(e.target.value)}
        placeholder="Add volunteer experience"
      />
      <button className="add-button" onClick={addVolunteerExperience}>
        <FaPlus /> Add
      </button>
    </div>
    {formData.volunteerExperience.map((experience, index) => (
      <div key={index} className="list-item">
        {experience}
        <button className="remove-button" onClick={() => removeVolunteerExperience(index)}>
          <FaTimes />
        </button>
      </div>
    ))}
  </div>

  <div className="form-group">
    <label>Hobbies and Interests</label>
    <div className="input-group">
      <input
        type="text"
        value={formData.hobbiesInterests}
        onChange={(e) => setFormData({...formData, hobbiesInterests: e.target.value})}
      />
      <button className="add-button" onClick={addHobby}>Add Hobby</button>
    </div>
    <div className="hobbies-list">
      {formData.hobbies.map((hobby, index) => (
        <span key={index} className="hobby-tag">
          {hobby}
          <button className="remove-button" onClick={() => removeHobby(hobby)}>
            <FaTimes />
          </button>
        </span>
      ))}
    </div>
  </div>
</div>
);
};
export default AdditionalInformation;
                