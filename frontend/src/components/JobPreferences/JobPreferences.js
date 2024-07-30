

import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import cityData from './cities.json'
import countryData from './country.json'
import stateData from './state.json'
import './index.css'

const jobList = [
  'Software Engineer',
  'Web Developer',
  'Data Scientist',
  'Database Administrator (DBA)',
  'Network Administrator',
  'Systems Administrator',
  'Security Analyst',
  'IT Project Manager',
  'Help Desk Analyst',
  'Quality Assurance (QA) Tester',
  'Business Analyst',
  'User Experience (UX) Designer',
  'User Interface (UI) Designer',
  'Front-End Developer',
  'Back-End Developer',
  'Full-Stack Developer',
  'Cloud Architect',
  'DevOps Engineer',
  'Network Security Engineer',
  'Cybersecurity Analyst',
  'Software Architect',
  'Machine Learning Engineer',
  'Data Analyst',
  'Business Intelligence (BI) Analyst',
  'IT Auditor',
  'IT Security Specialist',
  'Web Content Manager',
  'Search Engine Optimization (SEO) Specialist',
  'Social Media Manager',
  'IT Trainer',
]

const desiredIndustries = [
  'IT & Software',
  'Finance & Banking',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Marketing & Advertising',
  'Other',
]

const countries = countryData[2].data
const states = stateData

const cities = cityData[2].data

const JobPreferences = () => {
  const [selectedJobs, setSelectedJobs] = useState([])
  const jobOptions = jobList.map(job => ({value: job, label: job}))
  const [currency, setCurrency] = useState('USD')
  const [minSalary, setMinSalary] = useState(50000)
  const [maxSalary, setMaxSalary] = useState(60000)

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filteredStates, setFilteredStates] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [filteredCities, setFilteredCities] = useState([])
  const [selectedCities, setSelectedCities] = useState([])

  const [selectedDesiredIndustries, setSelectedDesiredIndustries] = useState([])
  const desiredIndustryOptions = desiredIndustries.map(industry => ({
    value: industry,
    label: industry,
  }))

  const currencies = ['USD', 'INR']
  const today = new Date().toISOString().slice(0, 10)

  const preferredCities = () => {
    const preferredCitiesList = selectedCities.map(item => item.label)
    return preferredCitiesList.join(',')
  }

  const [jobPreferences, setJobPreferences] = useState({
    positionAppliedFor: `${selectedJobs.join(',')}`,
    desiredSalary: `${
      currency === 'USD' ? '$' : '₹'
    }${minSalary.toLocaleString()} - ${
      currency === 'USD' ? '$' : '₹'
    }${maxSalary.toLocaleString()}`,
    employmentStatus: '',
    preferredJobType: '',
    preferredWorkLocation: `${preferredCities()}`,
    availabilityToStart: '',
    willingnessToRelocate: 'No',
    willingnessToTravel: 'No',
    preferredWorkingHours: 'Day Shift',
    desiredIndustry: `${selectedDesiredIndustries.join(',')}`,
    preferredCompanySize: 'Small',
    preferredWorkEnvironment: 'Remote',
    preferredRoleLevel: 'Entry-Level',
    desiredBenefits: 'Health Insurance',
    careerGoals: '',
    preferredCompanyCulture: 'Innovative',
    additionalPreferencesOrComments: '',
  })

  console.log(jobPreferences)

  useEffect(() => {
    setJobPreferences({
      ...jobPreferences,
      positionAppliedFor: `${selectedJobs.join(',')}`,
    })
  }, [selectedJobs])

  useEffect(() => {
    setJobPreferences({
      ...jobPreferences,
      preferredWorkLocation: `${preferredCities()}`,
    })
  }, [selectedCities])

  useEffect(() => {
    setJobPreferences({
      ...jobPreferences,
      desiredIndustry: `${selectedDesiredIndustries.join(',')}`,
    })
  }, [selectedDesiredIndustries])

  useEffect(() => {
    setJobPreferences({
      ...jobPreferences,
      desiredSalary: `${
        currency === 'USD' ? '$' : '₹'
      }${minSalary.toLocaleString()} - ${
        currency === 'USD' ? '$' : '₹'
      }${maxSalary.toLocaleString()}`,
    })
  }, [selectedDesiredIndustries])

  const handleMinSalaryChange = e => {
    setMinSalary(e.target.value)
    setJobPreferences(prevJobPreferences => ({
      ...prevJobPreferences,
      desiredSalary: `${
        currency === 'USD' ? '$' : '₹'
      }${e.target.value.toLocaleString()} - ${maxSalary.toLocaleString()}`,
    }))
  }

  const handleMaxSalaryChange = e => {
    setMaxSalary(e.target.value)
    setJobPreferences(prevJobPreferences => ({
      ...prevJobPreferences,
      desiredSalary: `${
        currency === 'USD' ? '$' : '₹'
      }${minSalary.toLocaleString()} - ${e.target.value.toLocaleString()}`,
    }))
  }

  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption)
    const filteredStatesList = states.filter(
      state => state.country_id === selectedOption.value,
    )
    setFilteredStates(filteredStatesList)
    setSelectedState(null)
    setFilteredCities([])
  }

  const handleStateChange = selectedOption => {
    setSelectedState(selectedOption)
    const filteredCitiesList = cities.filter(
      city => city.state_id === selectedOption.value,
    )
    setFilteredCities(filteredCitiesList)
    setSelectedCities([])
  }

  const handleCityChange = selectedOptions => {
    setSelectedCities(selectedOptions)
  }

  const countryOptions = countries.map(country => ({
    value: country.country_id,
    label: country.country_name,
  }))

  const stateOptions = filteredStates.map(state => ({
    value: state.state_id,
    label: state.state_name,
  }))

  const cityOptions = filteredCities.map(city => ({
    value: city.city_id,
    label: city.city_name,
    isMulti: true,
  }))

  const handleCurrencyChange = selectedOption => {
    setCurrency(selectedOption.value)
  }

  const handleSelectedJob = selectedOption => {
    setSelectedJobs(selectedOption.map(item => item.value))
  }

  const handleSelectedIndustry = selectedOption => {
    setSelectedDesiredIndustries(selectedOption.map(item => item.value))
  }

  const handleInputChange = (e, section, field) => {
    if (section === 'jobPreferences') {
      setJobPreferences({...jobPreferences, [field]: e.target.value})
    } else {
      console.error('Unknown section')
    }
  }

  return (
    <div className="form job preferences">
      <h2 className='main-heading-for-page'>Job Preferences</h2>
      <div className="fields">
        <div className="input-field">
          <label htmlFor="positionAppliedFor">Position Applied For</label>
          <Select
            isMulti
            value={selectedJobs.map(job => ({value: job, label: job}))}
            onChange={handleSelectedJob}
            options={jobOptions}
            id="positionAppliedFor"
          />
        </div>
        
        <div className="input-field">
  <label htmlFor="desiredSalary">Desired Salary</label>
  <div className="desired-salary-inputs-container">
    <div className="currency-select-container">
      <label htmlFor="currencySelect">Currency:</label>
      <select
        id="currencySelect"
        value={currency}
        onChange={handleCurrencyChange}
      >
        {currencies.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="minSalary">Min Salary:</label>
      <input
        type="number"
        id="minSalary"
        value={minSalary}
        onChange={handleMinSalaryChange}
      />
    </div>

    <div>
      <label htmlFor="maxSalary">Max Salary:</label>
      <input
        type="number"
        id="maxSalary"
        value={maxSalary}
        onChange={handleMaxSalaryChange}
      />
    </div>
  </div>
</div>

        <div className="input-field">
          <p>Current Employment Status</p>

          <div className="radio-buttons">
            <div>
              <input
                type="radio"
                id="employed"
                value="Employed"
                checked={jobPreferences.employmentStatus === 'Employed'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'employmentStatus')
                }
              />
              <label htmlFor="employed">Employed</label>
            </div>
            <div>
              <input
                type="radio"
                id="unemployed"
                value="Unemployed"
                checked={jobPreferences.employmentStatus === 'Unemployed'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'employmentStatus')
                }
              />
              <label htmlFor="unemployed">Unemployed</label>
            </div>
            <div>
              <input
                type="radio"
                id="student"
                value="Student"
                checked={jobPreferences.employmentStatus === 'Student'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'employmentStatus')
                }
              />
              <label htmlFor="student">Student</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                value="Other"
                checked={jobPreferences.employmentStatus === 'Other'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'employmentStatus')
                }
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>

        <div className="input-field">
          <p>Preferred Job Type</p>

          <div className="radio-buttons">
            <div>
              <input
                type="radio"
                id="fulltime"
                value="Full-Time"
                checked={jobPreferences.preferredJobType === 'Full-Time'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'preferredJobType')
                }
              />
              <label htmlFor="fulltime">Full-Time</label>
            </div>
            <div>
              <input
                type="radio"
                id="parttime"
                value="Part-Time"
                checked={jobPreferences.preferredJobType === 'Part-Time'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'preferredJobType')
                }
              />
              <label htmlFor="parttime">Part-Time</label>
            </div>
            <div>
              <input
                type="radio"
                id="contract"
                value="Contract"
                checked={jobPreferences.preferredJobType === 'Contract'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'preferredJobType')
                }
              />
              <label htmlFor="contract">Contract</label>
            </div>
            <div>
              <input
                type="radio"
                id="internship"
                value="Internship"
                checked={jobPreferences.preferredJobType === 'Internship'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'preferredJobType')
                }
              />
              <label htmlFor="internship">Internship</label>
            </div>
            <div>
              <input
                type="radio"
                id="jobTypeOther"
                value="Other"
                checked={jobPreferences.preferredJobType === 'Other'}
                onChange={e =>
                  handleInputChange(e, 'jobPreferences', 'preferredJobType')
                }
              />
              <label htmlFor="jobTypeOther">Other</label>
            </div>
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="preferredWorkLocation">Preferred Work Location</label>
          <div>
            <div>
              <label htmlFor="country">Country:</label>
              <Select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                options={countryOptions}
                placeholder="Select Country"
              />
            </div>

            <div>
              <label htmlFor="state">State:</label>
              <Select
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                options={stateOptions}
                placeholder="Select State"
                isDisabled={filteredStates.length === 0}
              />
            </div>

            <div>
              <label htmlFor="city">City: </label>
              <Select
                id="city"
                value={selectedCities}
                onChange={handleCityChange}
                options={cityOptions}
                placeholder="Select City/Cities (Multi-select)"
                isMulti // Enable multi-select for cities
                isDisabled={filteredCities.length === 0}
              />
            </div>
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="availabilityToStart">Availability to Start</label>
          <input
            type="date"
            placeholder="Availability to Start"
            value={jobPreferences.availabilityToStart}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'availabilityToStart')
            }
            id="availabilityToStart"
            min={today}
          />
        </div>
        <div className="input-field">
          <label htmlFor="willingnessToRelocate">Willingness to Relocate</label>
          <select
            value={jobPreferences.willingnessToRelocate}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'willingnessToRelocate')
            }
            id="willingnessToRelocate"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="May be">May be</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="willingnessToTravel">Willingness to Travel</label>
          <select
            id="willingnessToTravel"
            value={jobPreferences.willingnessToTravel}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'willingnessToTravel')
            }
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="May be">May be</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="preferredWorkingHours">Preferred Working Hours</label>
          <select
            id="preferredWorkingHours"
            value={jobPreferences.preferredWorkingHours}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'preferredWorkingHours')
            }
          >
            <option value="Day Shift">Day Shift</option>
            <option value="Night Shift">Night Shift</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="desiredIndustry">Desired Industry</label>
          <Select
            id="desiredIndustry"
            isMulti
            value={selectedDesiredIndustries.map(industry => ({
              value: industry,
              label: industry,
            }))}
            onChange={handleSelectedIndustry}
            options={desiredIndustryOptions}
          />
        </div>
        <div className="input-field">
          <label htmlFor="preferredCompanySize">Preferred Company Size</label>
          <select
            id="preferredCompanySize"
            value={jobPreferences.preferredCompanySize}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'preferredCompanySize')
            }
          >
            <option value="Startup"> Startup (1-50 employees)</option>
            <option value="Small"> Small (51-200 employees)</option>
            <option value="Medium">Medium (201-500 employees)</option>
            <option value="Large"> Large (501+ employees)</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="preferredWorkEnvironment">
            Preferred Work Environment
          </label>
          <select
            id="preferredWorkEnvironment"
            value={jobPreferences.preferredWorkEnvironment}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'preferredWorkEnvironment')
            }
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="preferredRoleLevel">Preferred Role Level</label>
          <select
            id="preferredRoleLevel"
            value={jobPreferences.preferredRoleLevel}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'preferredRoleLevel')
            }
          >
            <option value="Entry-level">Entry-level</option>
            <option value="Mid-level">Mid-level</option>
            <option value="Senior-level">Senior-level</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="desiredBenefits">Desired Benefits</label>
          <select
            id="desiredBenefits"
            value={jobPreferences.desiredBenefits}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'desiredBenefits')
            }
          >
            <option value="Health Insurance">Health Insurance</option>
            <option value="Retirement Plan">Retirement Plan</option>
            <option value="Paid Time Off"> Paid Time Off</option>
            <option value="Remote Work Options">Remote Work Options</option>
            <option value="Professional Development">
              Professional Development
            </option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="careerGoals">Career Goals</label>
          <textarea
            id="careerGoals"
            type="text"
            placeholder="Career Goals"
            maxLength="200"
            rows="5"
            value={jobPreferences.careerGoals}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'careerGoals')
            }
          />
        </div>
        <div className="input-field">
          <label htmlFor="preferredCompanyCulture">
            Preferred Company Culture
          </label>
          <select
            id="preferredCompanyCulture"
            value={jobPreferences.preferredCompanyCulture}
            onChange={e =>
              handleInputChange(e, 'jobPreferences', 'preferredCompanyCulture')
            }
          >
            <option value="Collaborative">Collaborative</option>
            <option value="Innovative">Innovative</option>
            <option value="Traditional">Traditional</option>
            <option value="Inclusive"> Inclusive</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="additionalPreferencesOrComments">
            Additional Preferences or Comments
          </label>
          <textarea
            id="additionalPreferencesOrComments"
            type="text"
            maxLength="200"
            rows="5"
            placeholder="Additional Preferences or Comments"
            value={jobPreferences.additionalPreferencesOrComments}
            onChange={e =>
              handleInputChange(
                e,
                'jobPreferences',
                'additionalPreferencesOrComments',
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default JobPreferences