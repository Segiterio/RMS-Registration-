


import React, { useState } from 'react';
import './index.css';

const PersonalInformation = () => {
    const [formData, setFormData] = useState({
        personalInfo: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            mobileCountryCode: '+1',
            phoneNumberMobile: '',
            homeCountryCode: '+1',
            phoneNumberHome: '',
            homeAddress: {
                street: '',
                city: '',
                state: '',
                zipCode: ''
            },
            temporaryAddress: {
                street: '',
                city: '',
                state: '',
                zipCode: ''
            },
            dateOfBirth: '',
            gender: '',
            nationality: '',
            maritalStatus: '',
            linkedInProfile: '',
            personalWebsite: '',
            emergencyContactName: '',
            emergencyContactRelationship: '',
            emergencyCountryCode: '+1',
            emergencyContactPhoneNumber: ''
        },
        sameAsPermanent: true,
        zipCodeError: '',
        showNationalitySearch: true
    });

    const [nationalitySearch, setNationalitySearch] = useState('');

    const handleInputChange = (section, field, value) => {
        setFormData(prevState => ({
            ...prevState,
            personalInfo: {
                ...prevState.personalInfo,
                [section]: section === 'homeAddress' || section === 'temporaryAddress'
                    ? { ...prevState.personalInfo[section], [field]: value }
                    : value
            }
        }));
    };

    const handleSameAsPermanent = () => {
        setFormData(prevState => ({
            ...prevState,
            sameAsPermanent: !prevState.sameAsPermanent,
            personalInfo: {
                ...prevState.personalInfo,
                temporaryAddress: prevState.sameAsPermanent
                    ? { street: '', city: '', state: '', zipCode: '' }
                    : { ...prevState.personalInfo.homeAddress }
            }
        }));
    };

    const handleZipCodeChange = (section, field, value) => {
        if (/^\d*$/.test(value)) {
            setFormData(prevState => ({
                ...prevState,
                zipCodeError: '',
                personalInfo: {
                    ...prevState.personalInfo,
                    [section]: { ...prevState.personalInfo[section], [field]: value }
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                zipCodeError: 'Enter valid numbers only'
            }));
        }
    };

    const handleNationalityChange = (value) => {
        setFormData(prevState => ({
            ...prevState,
            personalInfo: {
                ...prevState.personalInfo,
                nationality: value
            },
            showNationalitySearch: !value
        }));
    };

    const countryCodes = [
        "+1", "+44", "+91", "+86", "+81", "+49", "+33", "+39", "+7", "+61",
        "+55", "+34", "+52", "+31", "+90", "+966", "+27", "+82", "+971", "+41",
        "+46", "+45", "+47", "+358", "+65", "+62", "+60", "+63", "+64", "+353"
    ];

    const countryOptions = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
        "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
        "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
        "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
        "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
        "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
        "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
        "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
        "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
        "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
        "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
        "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
        "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
        "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
        "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
        "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
        "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
        "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
        "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const filteredCountries = countryOptions.filter(country =>
        country.toLowerCase().includes(nationalitySearch.toLowerCase())
    );

    const maxDate = new Date().toISOString().split('T')[0];

//     return (
//         <div className="form-section">
//             <h2>Personal Information</h2>
//             <div className="form-group">
//                 <label>First Name*</label>
//                 <input
//                     type="text"
//                   maxLength="100"

//                     required
//                     value={formData.personalInfo.firstName}
//                     onChange={(e) => handleInputChange('firstName', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Middle Name</label>
//                 <input
//                     type="text"
//                     maxLength="50"

//                     value={formData.personalInfo.middleName}
//                     onChange={(e) => handleInputChange('middleName', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Last Name*</label>
//                 <input
//                     type="text"
//                     maxLength="100"

//                     required
//                     value={formData.personalInfo.lastName}
//                     onChange={(e) => handleInputChange('lastName', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Email*</label>
//                 <input
//                     type="email"
//                     required
//                     value={formData.personalInfo.email}
//                     onChange={(e) => handleInputChange('email', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Mobile Phone*</label>
//                 <div className="phone-input">
//                     <select
                        
//                         value={formData.personalInfo.mobileCountryCode}
//                         onChange={(e) => handleInputChange('mobileCountryCode', null, e.target.value)}
//                     >
//                         {countryCodes.map(code => (
//                             <option key={code} value={code}>{code}</option>
//                         ))}
//                     </select>
//                     <input
//                         type="tel"
//                        pattern="[0-9]*"
//                         maxLength="10"
//                         required
//                         value={formData.personalInfo.phoneNumberMobile}
//                         onChange={(e) => handleInputChange('phoneNumberMobile', null, e.target.value)}
//                     />
//                 </div>
//             </div>
//             <div className="form-group">
//                 <label>Home Phone</label>
//                 <div className="phone-input">
//                     <select
//                         value=                        {formData.personalInfo.homeCountryCode}
//                         onChange={(e) => handleInputChange('homeCountryCode', null, e.target.value)}
//                     >
//                         {countryCodes.map(code => (
//                             <option key={code} value={code}>{code}</option>
//                         ))}
//                     </select>
//                     <input
//                         type="tel"
//                        pattern="[0-9]*"
//                         maxLength="10"
//                         value={formData.personalInfo.phoneNumberHome}
//                         onChange={(e) => handleInputChange('phoneNumberHome', null, e.target.value)}
//                     />
//                 </div>
//             </div>
//             <div className="form-group">
//                 <label>Home Address</label>
//                 <input
//                     type="text"
//                     placeholder="Street"
//                     value={formData.personalInfo.homeAddress.street}
//                     onChange={(e) => handleInputChange('homeAddress', 'street', e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="City"
//                     value={formData.personalInfo.homeAddress.city}
//                     onChange={(e) => handleInputChange('homeAddress', 'city', e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="State"
//                     value={formData.personalInfo.homeAddress.state}
//                     onChange={(e) => handleInputChange('homeAddress', 'state', e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Zip Code"
//                     value={formData.personalInfo.homeAddress.zipCode}
//                     onChange={(e) => handleZipCodeChange('homeAddress', 'zipCode', e.target.value)}
//                 />
//                 {formData.zipCodeError && <p className="error">{formData.zipCodeError}</p>}
//             </div>
//             <div className="form-group">
//                 <label>Temporary Address</label>
//                 <div className="checkbox-group">
//                     <input
//                         type="checkbox"
//                         checked={formData.sameAsPermanent}
//                         onChange={handleSameAsPermanent}
//                     />
          
//                     <label>Same as Permanent Address</label>
//                 </div>
//                 {!formData.sameAsPermanent && (
//                     <>
//                         <input
//                             type="text"
//                             placeholder="Street"
//                             value={formData.personalInfo.temporaryAddress.street}
//                             onChange={(e) => handleInputChange('temporaryAddress', 'street', e.target.value)}
//                         />
//                         <input
//                             type="text"
//                             placeholder="City"
//                             value={formData.personalInfo.temporaryAddress.city}
//                             onChange={(e) => handleInputChange('temporaryAddress', 'city', e.target.value)}
//                         />
//                         <input
//                             type="text"
//                             placeholder="State"
//                             value={formData.personalInfo.temporaryAddress.state}
//                             onChange={(e) => handleInputChange('temporaryAddress', 'state', e.target.value)}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Zip Code"
//                             value={formData.personalInfo.temporaryAddress.zipCode}
//                             onChange={(e) => handleZipCodeChange('temporaryAddress', 'zipCode', e.target.value)}
//                         />
//                         {formData.zipCodeError && <p className="error">{formData.zipCodeError}</p>}
//                     </>
//                 )}
//             </div>
//             <div className="form-group">
//                 <label>Date of Birth*</label>
//                 <input
//                     type="date"
//                     required
//                     max={maxDate}
//                     value={formData.personalInfo.dateOfBirth}
//                     onChange={(e) => handleInputChange('dateOfBirth', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Gender</label>
//                 <select
//                     value={formData.personalInfo.gender}
//                     onChange={(e) => handleInputChange('gender', null, e.target.value)}
//                 >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                 </select>
//             </div>
//              <div className="form-group">
//                 <label>Nationality*</label>
//                 <select
//                     required
//                     value={formData.personalInfo.nationality}
//                     onChange={(e) => handleNationalityChange(e.target.value)}>
//                     <option value="">Select Nationality</option>
//                     {countryOptions.map((country) => (
//                         <option key={country} value={country}>{country}</option>
//                     ))}
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label>Marital Status</label>
//                 <select
//                     value={formData.personalInfo.maritalStatus}
//                     onChange={(e) => handleInputChange('maritalStatus', null, e.target.value)}
//                 >
//                     <option value="">Select Marital Status</option>
//                     <option value="single">Single</option>
//                     <option value="married">Married</option>
//                     <option value="divorced">Divorced</option>
//                   <option value="Widower/Widow">Widower/Widow</option>
//                   <option value="prefer not to say">Prefer not to say</option>
                  
                  
                 


                  
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label>LinkedIn Profile</label>
//                 <input
//                     type="url"
//                     value={formData.personalInfo.linkedInProfile}
//                     onChange={(e) => handleInputChange('linkedInProfile', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Personal Website</label>
//                 <input
//                     type="url"
//                     value={formData.personalInfo.personalWebsite}
//                     onChange={(e) => handleInputChange('personalWebsite', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Emergency Contact Name*</label>
//                 <input
//                     type="text"
//                     required
//                     value={formData.personalInfo.emergencyContactName}
//                     onChange={(e) => handleInputChange('emergencyContactName', null, e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Emergency Contact Relationship*</label>
//                <select
                    
//                 >
//                     <option value="select_relationship">Select Relationship</option>
//                     <option value="parent">Parent</option>
//                     <option value="spouse">Spouse</option>
//                     <option value="relative">Relative</option>
//                   <option value="guardian">Guardian</option>
//                   <option value="friend">Friend</option>
//                  <option value="others">Others</option>
                  
                  
                 


                  
//                 </select>
              
//             </div>
//             <div className="form-group">
//                 <label>Emergency Contact Phone*</label>
//                 <div className="phone-input">
//                     <select
//                         value={formData.personalInfo.emergencyCountryCode}
//                         onChange={(e) => handleInputChange('emergencyCountryCode', null, e.target.value)}
//                     >
//                         {countryCodes.map(code => (
//                             <option key={code} value={code}>{code}</option>
//                         ))}
//                     </select>
//                     <input
//                         type="tel"
//                        pattern="[0-9]*"
//                         maxLength="10"
//                         required
//                         value={formData.personalInfo.emergencyContactPhoneNumber}
//                         onChange={(e) => handleInputChange('emergencyContactPhoneNumber', null, e.target.value)}
//                     />
//                 </div>
//             </div>
//           {/* <style jsx>{`body {
//     font-family: Arial, sans-serif;
//     background-color: #f8f9fa;
//     margin: 0;
//     padding: 0;
// }

// .form-section {
//     width: 80%;
//     max-width: 600px;
//     margin: 20px auto;
//     padding: 20px;
//     background-color: #ffffff;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
// }

// h2 {
//     text-align: center;
//     margin-bottom: 20px;
// }

// .form-group {
//     margin-bottom: 15px;
// }

// .form-group label {
//     display: block;
//     margin-bottom: 5px;
// }

// .form-group input,
// .form-group select {
//     width: 100%;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// }

// .phone-input {
//     display: flex;
// }

// .phone-input select {
//     width: 30%;
//     margin-right: 10px;
// }

// .phone-input input {
//     width: 70%;
// }

// .checkbox-group {
//     display: flex;
//     flex-direction:row;
//     justify-content:space-between;
//     align-items: center;
    
// }

// .checkbox-group input {
//     margin-right: 10px;
// }

// .error {
//     color: red;
//     font-size: 12px;
// }

// .dropdown {
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     margin-top: 5px;
//     max-height: 150px;
//     overflow-y: auto;
// }

// .dropdown-item {
//     padding: 10px;
//     cursor: pointer;
// }

// .dropdown-item:hover {
//     background-color: #f1f1f1;
// }
// .phone-input select 
// {
//     margin-right: 10px;
//     width: auto;
// }
// .checkbox-group {
//   display:flex;
//   flex-direction:row;
// }

// `}</style> */}
//         </div>
//     );
// };
return (
    <div className="form-section">
        <h1 className='main-heading-for-page'>Personal Information</h1>
        <div className="form-group">
            <label>First Name*</label>
            <input
                type="text"
                maxLength="100"
                placeholder="Enter your first name"
                required
                value={formData.personalInfo.firstName}
                onChange={(e) => handleInputChange('firstName', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Middle Name</label>
            <input
                type="text"
                maxLength="50"
                placeholder="Enter your middle name (if any)"
                value={formData.personalInfo.middleName}
                onChange={(e) => handleInputChange('middleName', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Last Name*</label>
            <input
                type="text"
                maxLength="100"
                placeholder="Enter your last name"
                required
                value={formData.personalInfo.lastName}
                onChange={(e) => handleInputChange('lastName', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Email*</label>
            <input
                type="email"
                placeholder="Enter your email address"
                required
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('email', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Mobile Phone*</label>
            <div className="phone-input">
                <select
                    value={formData.personalInfo.mobileCountryCode}
                    onChange={(e) => handleInputChange('mobileCountryCode', null, e.target.value)}
                >
                    {countryCodes.map(code => (
                        <option key={code} value={code}>{code}</option>
                    ))}
                </select>
                <input
                    type="tel"
                    pattern="[0-9]*"
                    maxLength="10"
                    placeholder="Enter your mobile phone number"
                    required
                    value={formData.personalInfo.phoneNumberMobile}
                    onChange={(e) => handleInputChange('phoneNumberMobile', null, e.target.value)}
                />
            </div>
        </div>
        <div className="form-group">
            <label>Home Phone</label>
            <div className="phone-input">
                <select
                    value={formData.personalInfo.homeCountryCode}
                    onChange={(e) => handleInputChange('homeCountryCode', null, e.target.value)}
                >
                    {countryCodes.map(code => (
                        <option key={code} value={code}>{code}</option>
                    ))}
                </select>
                <input
                    type="tel"
                    pattern="[0-9]*"
                    maxLength="10"
                    placeholder="Enter your home phone number"
                    value={formData.personalInfo.phoneNumberHome}
                    onChange={(e) => handleInputChange('phoneNumberHome', null, e.target.value)}
                />
            </div>
        </div>
        <div className="form-group">
            <label>Home Address</label>
            <input
                type="text"
                placeholder="Enter street address"
                value={formData.personalInfo.homeAddress.street}
                onChange={(e) => handleInputChange('homeAddress', 'street', e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter city"
                value={formData.personalInfo.homeAddress.city}
                onChange={(e) => handleInputChange('homeAddress', 'city', e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter state"
                value={formData.personalInfo.homeAddress.state}
                onChange={(e) => handleInputChange('homeAddress', 'state', e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter zip code"
                value={formData.personalInfo.homeAddress.zipCode}
                onChange={(e) => handleZipCodeChange('homeAddress', 'zipCode', e.target.value)}
            />
            {formData.zipCodeError && <p className="error">{formData.zipCodeError}</p>}
        </div>
        <div className="form-group">
            <label>Temporary Address</label>
            <div className="checkbox-container">
  <input
    type="checkbox"
    id="sameAsPermanentCheckbox"
    className="checkbox-input"
    checked={formData.sameAsPermanent}
    onChange={handleSameAsPermanent}
  />
  <label htmlFor="sameAsPermanentCheckbox" className="checkbox-label">
    Same as Permanent Address
  </label>
</div>
            {!formData.sameAsPermanent && (
                <>
                    <input
                        type="text"
                        placeholder="Enter street address"
                        value={formData.personalInfo.temporaryAddress.street}
                        onChange={(e) => handleInputChange('temporaryAddress', 'street', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={formData.personalInfo.temporaryAddress.city}
                        onChange={(e) => handleInputChange('temporaryAddress', 'city', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter state"
                        value={formData.personalInfo.temporaryAddress.state}
                        onChange={(e) => handleInputChange('temporaryAddress', 'state', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter zip code"
                        value={formData.personalInfo.temporaryAddress.zipCode}
                        onChange={(e) => handleZipCodeChange('temporaryAddress', 'zipCode', e.target.value)}
                    />
                    {formData.zipCodeError && <p className="error">{formData.zipCodeError}</p>}
                </>
            )}
        </div>
        <div className="form-group">
            <label>Date of Birth*</label>
            <input
                type="date"
                required
                max={maxDate}
                placeholder="Select your date of birth"
                value={formData.personalInfo.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Gender</label>
            <select
                value={formData.personalInfo.gender}
                onChange={(e) => handleInputChange('gender', null, e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div className="form-group">
            <label>Nationality*</label>
            <select
                required
                value={formData.personalInfo.nationality}
                onChange={(e) => handleNationalityChange(e.target.value)}
            >
                <option value="">Select Nationality</option>
                {countryOptions.map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <label>Marital Status</label>
            <select
                value={formData.personalInfo.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', null, e.target.value)}
            >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="Widower/Widow">Widower/Widow</option>
                <option value="prefer not to say">Prefer not to say</option>
            </select>
        </div>
        <div className="form-group">
            <label>LinkedIn Profile</label>
            <input
                type="url"
                placeholder="Enter your LinkedIn profile URL"
                value={formData.personalInfo.linkedInProfile}
                onChange={(e) => handleInputChange('linkedInProfile', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Personal Website</label>
            <input
                type="url"
                placeholder="Enter your personal website URL"
                value={formData.personalInfo.personalWebsite}
                onChange={(e) => handleInputChange('personalWebsite', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Emergency Contact Name*</label>
            <input
                type="text"
                placeholder="Enter the name of your emergency contact"
                required
                value={formData.personalInfo.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', null, e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Emergency Contact Relationship*</label>
            <select
                required
                value={formData.personalInfo.emergencyContactRelationship}
                onChange={(e) => handleInputChange('emergencyContactRelationship', null, e.target.value)}
            >
                <option value="">Select Relationship</option>
                <option value="parent">Parent</option>
                <option value="spouse">Spouse</option>
                <option value="relative">Relative</option>
                <option value="guardian">Guardian</option>
                <option value="friend">Friend</option>
                <option value="others">Others</option>
            </select>
        </div>
        <div className="form-group">
            <label>Emergency Contact Phone*</label>
            <div className="phone-input">
                <select
                    value={formData.personalInfo.emergencyCountryCode}
                    onChange={(e) => handleInputChange('emergencyCountryCode', null, e.target.value)}
                >
                    {countryCodes.map(code => (
                        <option key={code} value={code}>{code}</option>
                    ))}
                </select>
                <input
                    type="tel"
                    pattern="[0-9]*"
                    maxLength="10"
                    placeholder="Enter your emergency contact's phone number"
                    required
                    value={formData.personalInfo.emergencyContactPhoneNumber}
                    onChange={(e) => handleInputChange('emergencyContactPhoneNumber', null, e.target.value)}
                />
            </div>
        </div>
    </div>
);
}


export default PersonalInformation;