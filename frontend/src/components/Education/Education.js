
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import countryData from "./country.json";
import stateData from "./state.json";
import cityData from "./cities.json";
import institutionsData from "./college.json";

const Education = () => {
  const [educationLevel, setEducationLevel] = useState("");
  const [show10th, setShow10th] = useState(false);
  const [show12th, setShow12th] = useState(false);
  const [showDiploma, setShowDiploma] = useState(false);
  const [showBachelor, setShowBachelor] = useState(false);
  const [showMaster, setShowMaster] = useState(false);
  const [showDoctorate, setShowDoctorate] = useState(false);
  const [hasDiploma, setHasDiploma] = useState(false);
  const [hasMaster, setHasMaster] = useState(false);
  const [hasDoctorate, setHasDoctorate] = useState(true);
  const [hasGaps, setHasGaps] = useState(false);
  const [diplomaList, setDiplomaList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [gapDetails, setGapDetails] = useState("");
  const [has12th, setHas12th] = useState(false);
  const [isSandwichCourse, setIsSandwichCourse] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState({});
  const [cities, setCities] = useState({});
  const [institutions, setInstitutions] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [cgpa, setCgpa] = useState({});
  const [institutionOptions, setInstitutionOptions] = useState({});
  const [customInstitutions, setCustomInstitutions] = useState({});
  const [selectedBachelorDegree, setSelectedBachelorDegree] = useState(null);
  const [otherBachelorDegree, setOtherBachelorDegree] = useState("");
  const [otherMasterDegree, setOtherMasterDegree] = useState("");
  const [selectedPhDField, setSelectedPhDField] = useState(null);
  const [otherPhDField, setOtherPhDField] = useState("");

  console.log(states)

  useEffect(() => {
    setCountries(
      countryData.map((country) => ({
        value: country.country_id,
        label: country.country_name,
      }))
    );
  }, []);

  useEffect(() => {
    const updateInstitutions = (educationLevel) => {
      if (selectedCountry[educationLevel]) {
        const countrySortname = countryData.find(
          (country) =>
            country.country_id === selectedCountry[educationLevel].value
        )?.sortname;

        if (countrySortname) {
          const filteredInstitutions = institutionsData
            .filter((inst) => inst.country === countrySortname)
            .map((inst) => ({
              value: inst.name,
              label: inst.name,
            }));

          setInstitutionOptions((prev) => ({
            ...prev,
            [educationLevel]: [
              ...filteredInstitutions,
              { value: "other", label: "Other" },
            ],
          }));
        }
      }
    };

    updateInstitutions("bachelor");
    masterList.forEach((_, index) => updateInstitutions(`master_${index}`));
    updateInstitutions("doctorate");
  }, [selectedCountry, masterList]);

  const handleEducationLevelChange = (level) => {
    setEducationLevel(level);
    setShow10th(level !== "");
    setShow12th(
      level === "12th Standard" ||
        [
          "Diploma",
          "Bachelor's Degree",
          "Master's Degree",
          "Doctorate",
        ].includes(level)
    );
    setShowDiploma(
      ["Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate"].includes(
        level
      )
    );
    setShowBachelor(
      ["Bachelor's Degree", "Master's Degree", "Doctorate"].includes(level)
    );
    setShowMaster(["Master's Degree", "Doctorate"].includes(level));
    setShowDoctorate(level === "Doctorate");

    if (
      ["Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate"].includes(
        level
      )
    ) {
      setHasDiploma(false);
      setDiplomaList([{}]);
    }

    if (["Master's Degree", "Doctorate"].includes(level)) {
      setHasMaster(true);
      setMasterList([{}]);
    } else {
      setHasMaster(false);
      setMasterList([]);
    }
  };

  const handleCountryChange = (selectedOption, educationLevel) => {
    setSelectedCountry({
      ...selectedCountry,
      [educationLevel]: selectedOption,
    });
    const filteredStates = stateData.filter(
      (state) => state.country_id === selectedOption.value
    );
    const stateOptions = filteredStates.map((state) => ({
      value: state.state_id,
      label: state.state_name,
    }));
    setStates({ ...states, [educationLevel]: stateOptions });
    setSelectedState({ ...selectedState, [educationLevel]: null });
    setCities({ ...cities, [educationLevel]: [] });
    setInstitutionOptions((prev) => ({ ...prev, [educationLevel]: [] }));
  };

  const handleStateChange = (selectedOption, educationLevel) => {
    setSelectedState({ ...selectedState, [educationLevel]: selectedOption });
    const filteredCities = cityData[2].data.filter(
      (city) => city.state_id === selectedOption.value
    );
    const cityOptions = filteredCities.map((city) => ({
      value: city.city_id,
      label: city.city_name,
    }));
    setCities({ ...cities, [educationLevel]: cityOptions });
  };

  const handleCityChange = (selectedOption, educationLevel) => {
    setSelectedCity({ ...selectedCity, [educationLevel]: selectedOption });
  };

  const handleBachelorDegreeChange = (selectedOption) => {
    const integratedDegrees = [
      "B.Tech + M.Tech",
      "BS + MS",
      "BBA + MBA",
      "B.Com + M.Com",
      "BA + MA",
      "B.Sc + M.Sc",
      "B.Des + M.Des",
      "B.Arch + M.Arch",
      "B.Pharm + M.Pharm",
    ];

    if (integratedDegrees.includes(selectedOption.value)) {
      setIsSandwichCourse(true);
      setHasMaster(true);
      setMasterList([
        {
          degreeType: selectedOption,
          fieldOfStudy: selectedState.bachelor,
          completionStatus: selectedCity.bachelor,
          yearOfGraduation: institutions.bachelor,
          cgpa: cgpa.bachelor,
          country: selectedCountry.bachelor,
          state: selectedState.bachelor,
          city: selectedCity.bachelor,
          institution: institutions.bachelor,
        },
      ]);
    } else {
      setIsSandwichCourse(false);
      setHasMaster(false);
      setMasterList([]);
    }

    if (selectedOption.value === "Other") {
      setOtherBachelorDegree("");
    } else {
      setOtherBachelorDegree("");
    }
  };

  const addDiploma = () => setDiplomaList([...diplomaList, {}]);
  const addMaster = () => setMasterList([...masterList, {}]);
  const removeDiploma = (index) =>
    setDiplomaList(diplomaList.filter((_, i) => i !== index));
  const removeMaster = (index) =>
    setMasterList(masterList.filter((_, i) => i !== index));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  const renderRequiredAsterisk = () => <span className="required">*</span>;

  const renderLocationFields = (educationLevel, disabled = false) => (
    <>
      <div className="form-group">
        <label>Country: {renderRequiredAsterisk()}</label>
        <Select
          options={countries}
          onChange={(selectedOption) =>
            handleCountryChange(selectedOption, educationLevel)
          }
          value={selectedCountry[educationLevel]}
          isDisabled={disabled}
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
          required
        />
      </div>
      <div className="form-group">
        <label>State: {renderRequiredAsterisk()}</label>
        <Select
          options={states[educationLevel] || []}
          onChange={(selectedOption) =>
            handleStateChange(selectedOption, educationLevel)
          }
          value={selectedState[educationLevel]}
          isDisabled={!selectedCountry[educationLevel] || disabled}
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
          required
        />
      </div>
      <div className="form-group">
        <label>City: {renderRequiredAsterisk()}</label>
        <Select
          options={cities[educationLevel] || []}
          onChange={(selectedOption) =>
            handleCityChange(selectedOption, educationLevel)
          }
          value={selectedCity[educationLevel]}
          isDisabled={!selectedState[educationLevel] || disabled}
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
          required
        />
      </div>
      {["10th", "12th", "diploma"].includes(educationLevel) && (
        <div className="form-group">
          <label>School Name: {renderRequiredAsterisk()}</label>
          <input
            type="text"
            className="form-control"
            required
            disabled={disabled}
          />
        </div>
      )}
      {["bachelor", "master", "doctorate"].includes(educationLevel) && (
        <div className="form-group">
          <label>Institution: {renderRequiredAsterisk()}</label>
          <Select
            options={institutionOptions[educationLevel] || []}
            onChange={(selectedOption) => {
              if (selectedOption.value === "other") {
                setCustomInstitutions({
                  ...customInstitutions,
                  [educationLevel]: "",
                });
              } else {
                setCustomInstitutions({
                  ...customInstitutions,
                  [educationLevel]: undefined,
                });
              }
              setInstitutions({
                ...institutions,
                [educationLevel]: selectedOption,
              });
            }}
            value={institutions[educationLevel]}
            isDisabled={!selectedCountry[educationLevel] || disabled}
            className="select-bootstrap"
            styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
            required
          />
          {institutions[educationLevel]?.value === "other" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter institution name"
              value={customInstitutions[educationLevel] || ""}
              onChange={(e) =>
                setCustomInstitutions({
                  ...customInstitutions,
                  [educationLevel]: e.target.value,
                })
              }
              required
            />
          )}
        </div>
      )}
    </>
  );

  const handleCGPAInput = (value, educationLevel) => {
    // Remove any non-numeric characters except for decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = numericValue.split(".");
    const formattedValue = parts[0] + (parts.length > 1 ? "." + parts[1] : "");

    setCgpa({ ...cgpa, [educationLevel]: formattedValue });
  };

  const renderDiplomaFields = (index) => (
    <div key={index} className="diploma-section">
      <h5>Diploma {index + 1}</h5>
      <div className="form-group">
        <label>Diploma Name: {renderRequiredAsterisk()}</label>
        <input type="text" className="form-control" required />
      </div>
      <div className="form-group">
        <label>Field of Study: {renderRequiredAsterisk()}</label>
        <Select
          options={[
            { value: "engineering", label: "Engineering" },
            { value: "medicine", label: "Medicine" },
            { value: "arts", label: "Arts" },
            { value: "science", label: "Science" },
            { value: "commerce", label: "Commerce" },
          ]}
          required
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
        />
      </div>
      <div className="form-group">
        <label>Year of Completion: {renderRequiredAsterisk()}</label>
        <Select
          options={Array.from({ length: 61 }, (_, i) => ({
            value: 2035 - i,
            label: 2035 - i,
          }))}
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
          required
        />
      </div>
      <div className="form-group">
        <label>Percentage/CGPA: {renderRequiredAsterisk()}</label>
        <input type="text" className="form-control" required />
      </div>
      {renderLocationFields(`diploma_${index}`)}
      <button
        type="button"
        className="btn btn-danger mt-2"
        onClick={() => removeDiploma(index)}
      >
        Remove Diploma
      </button>
    </div>
  );

  const renderMasterFields = (index) => (
    <div key={index} className="master-section">
      <h5>Master's Degree {index + 1}</h5>
      <div className="form-group">
        <label>Degree Type: {renderRequiredAsterisk()}</label>
        <Select
          options={[
            { value: "M.Tech", label: "M.Tech (Master of Technology)" },
            { value: "M.E.", label: "M.E. (Master of Engineering)" },
            { value: "M.Sc", label: "M.Sc (Master of Science)" },
            { value: "M.A.", label: "M.A. (Master of Arts)" },
            { value: "M.Com", label: "M.Com (Master of Commerce)" },
            { value: "MBA", label: "MBA (Master of Business Administration)" },
            { value: "MCA", label: "MCA (Master of Computer Applications)" },
            { value: "M.Arch", label: "M.Arch (Master of Architecture)" },
            { value: "M.Des", label: "M.Des (Master of Design)" },
            { value: "MFA", label: "MFA (Master of Fine Arts)" },
            { value: "LL.M", label: "LL.M (Master of Laws)" },
            { value: "M.Pharm", label: "M.Pharm (Master of Pharmacy)" },
            { value: "MPH", label: "MPH (Master of Public Health)" },
            { value: "MSW", label: "MSW (Master of Social Work)" },
            { value: "M.Ed", label: "M.Ed (Master of Education)" },
            { value: "MPA", label: "MPA (Master of Public Administration)" },
            { value: "Other", label: "Other" },
          ]}
          value={masterList[index].degreeType}
          onChange={(selectedOption) => {
            const updatedMasterList = [...masterList];
            updatedMasterList[index].degreeType = selectedOption;
            setMasterList(updatedMasterList);
          }}
          isDisabled={isSandwichCourse}
          required
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
        />
      </div>
      {masterList[index].degreeType &&
        masterList[index].degreeType.value === "Other" && (
          <div className="form-group mt-2">
            <label>Please specify the degree: {renderRequiredAsterisk()}</label>
            <input
              type="text"
              className="form-control"
              value={otherMasterDegree}
              onChange={(e) => {
                setOtherMasterDegree(e.target.value);
                const updatedMasterList = [...masterList];
                updatedMasterList[index].otherDegree = e.target.value;
                setMasterList(updatedMasterList);
              }}
              required
            />
          </div>
        )}
      <div className="form-group">
        <label>Completion Status: {renderRequiredAsterisk()}</label>
        <Select
          options={[
            { value: "1", label: "1st Year" },
            { value: "2", label: "2nd Year" },
            { value: "completed", label: "Completed" },
          ]}
          value={masterList[index].completionStatus}
          isDisabled={isSandwichCourse}
          required
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
        />
      </div>
      <div className="form-group">
        <label>Year of Graduation: {renderRequiredAsterisk()}</label>
        <Select
          options={Array.from({ length: 61 }, (_, i) => ({
            value: 2035 - i,
            label: 2035 - i,
          }))}
          value={masterList[index].yearOfGraduation}
          isDisabled={isSandwichCourse}
          required
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
        />
      </div>
      {renderLocationFields(`master_${index}`, isSandwichCourse)}
      <div className="form-group">
        <label>Institution: {renderRequiredAsterisk()}</label>
        <Select
          options={institutionOptions[`master_${index}`] || []}
          onChange={(selectedOption) => {
            if (selectedOption.value === "other") {
              setCustomInstitutions({
                ...customInstitutions,
                [`master_${index}`]: "",
              });
            } else {
              setCustomInstitutions({
                ...customInstitutions,
                [`master_${index}`]: undefined,
              });
            }
            setInstitutions({
              ...institutions,
              [`master_${index}`]: selectedOption,
            });
          }}
          value={institutions[`master_${index}`]}
          isDisabled={isSandwichCourse}
          className="select-bootstrap"
          styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
          required
        />
        {institutions[`master_${index}`]?.value === "other" && (
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Enter institution name"
            value={customInstitutions[`master_${index}`] || ""}
            onChange={(e) =>
              setCustomInstitutions({
                ...customInstitutions,
                [`master_${index}`]: e.target.value,
              })
            }
            disabled={isSandwichCourse}
            required
          />
        )}
      </div>
      <div className="form-group">
        <label>CGPA/Percentage: {renderRequiredAsterisk()}</label>
        <input
          type="text"
          className="form-control"
          value={cgpa[`master_${index}`] || ""}
          onChange={(e) => handleCGPAInput(e.target.value, `master_${index}`)}
          disabled={isSandwichCourse}
          required
        />
      </div>
      {!isSandwichCourse && (
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => removeMaster(index)}
        >
          Remove Master's Degree
        </button>
      )}
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className='main-heading-for-page'>Education Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            What is your highest level of education? {renderRequiredAsterisk()}
          </label>
          <Select
            options={[
              { value: "10th Standard", label: "10th Standard" },
              { value: "12th Standard", label: "12th Standard" },
              { value: "Diploma", label: "Diploma" },
              { value: "Bachelor's Degree", label: "Bachelor's Degree" },
              { value: "Master's Degree", label: "Master's Degree" },
              { value: "Doctorate", label: "Doctorate" },
              { value: "Other", label: "Other" },
            ]}
            onChange={(selectedOption) =>
              handleEducationLevelChange(selectedOption.value)
            }
            required
            className="select-bootstrap"
            styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
          />
        </div>

        {show10th && (
          <div className="section">
            <h4>10th Standard Details:</h4>
            <div className="form-group">
              <label>Board: {renderRequiredAsterisk()}</label>
              <Select
                options={[
                  { value: "CBSE", label: "CBSE" },
                  { value: "ICSE", label: "ICSE" },
                  { value: "State Board", label: "State Board" },
                  { value: "Other", label: "Other" },
                ]}
                required
                className="select-bootstrap"
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            </div>
            <div className="form-group">
              <label>Year of Passing: {renderRequiredAsterisk()}</label>
              <Select
                options={Array.from({ length: 61 }, (_, i) => ({
                  value: 2035 - i,
                  label: 2035 - i,
                }))}
                required
                className="select-bootstrap"
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            </div>

            {renderLocationFields("10th")}
            <div className="form-group">
              <label>Percentage/CGPA: {renderRequiredAsterisk()}</label>
              <input
                type="text"
                className="form-control"
                value={cgpa["10th"] || ""}
                onChange={(e) => handleCGPAInput(e.target.value, "10th")}
                required
              />
            </div>
          </div>
        )}

        {show12th && (
          <>
            <div className="form-group">
              <label className="inter-diploma-label">
                Have you completed 12th? {renderRequiredAsterisk()}
              </label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="has12th"
                    value="yes"
                    onChange={() => setHas12th(true)}
                    required
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="has12th"
                    value="no"
                    onChange={() => setHas12th(false)}
                    required
                  />{" "}
                  No
                </label>
              </div>
            </div>
            {has12th && (
              <>
                <h4>12th Standard Details:</h4>
                <div className="form-group">
                  <label>Board: {renderRequiredAsterisk()}</label>
                  <Select
                    options={[
                      { value: "CBSE", label: "CBSE" },
                      { value: "ICSE", label: "ICSE" },
                      { value: "State Board", label: "State Board" },
                      { value: "Other", label: "Other" },
                    ]}
                    required
                    className="select-bootstrap"
                    styles={{
                      control: (base) => ({ ...base, cursor: "pointer" }),
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Year of Passing: {renderRequiredAsterisk()}</label>
                  <Select
                    options={Array.from({ length: 61 }, (_, i) => ({
                      value: 2035 - i,
                      label: 2035 - i,
                    }))}
                    required
                    className="select-bootstrap"
                    styles={{
                      control: (base) => ({ ...base, cursor: "pointer" }),
                    }}
                  />
                </div>
                {renderLocationFields("12th")}
                <div className="form-group">
                  <label>Percentage/CGPA: {renderRequiredAsterisk()}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cgpa["12th"] || ""}
                    onChange={(e) => handleCGPAInput(e.target.value, "12th")}
                    required
                  />
                </div>
              </>
            )}
          </>
        )}

        {showDiploma && (
          <>
            <div className="form-group">
              <label className="inter-diploma-label">
                Have you completed any diploma(s)? {renderRequiredAsterisk()}
              </label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="hasDiploma"
                    value="yes"
                    onChange={() => {
                      setHasDiploma(true);
                      if (diplomaList.length === 0) {
                        setDiplomaList([{}]);
                      }
                    }}
                    required
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasDiploma"
                    value="no"
                    onChange={() => {
                      setHasDiploma(false);
                      setDiplomaList([]);
                    }}
                    required
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {hasDiploma && (
              <div className="section">
                <h4>Diploma Details:</h4>
                {diplomaList.map((_, index) => renderDiplomaFields(index))}
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={addDiploma}
                >
                  + Add Another Diploma
                </button>
              </div>
            )}
          </>
        )}

        {showBachelor && (
          <div className="section">
            <h4>Bachelor's Degree Details:</h4>
            <div className="form-group">
              <label>Degree Type: {renderRequiredAsterisk()}</label>
              <Select
                options={[
                  { value: "B.Tech", label: "B.Tech (Bachelor of Technology)" },
                  { value: "B.E.", label: "B.E. (Bachelor of Engineering)" },
                  { value: "B.Sc", label: "B.Sc (Bachelor of Science)" },
                  { value: "B.A.", label: "B.A. (Bachelor of Arts)" },
                  { value: "B.Com", label: "B.Com (Bachelor of Commerce)" },
                  {
                    value: "BBA",
                    label: "BBA (Bachelor of Business Administration)",
                  },
                  {
                    value: "BCA",
                    label: "BCA (Bachelor of Computer Applications)",
                  },
                  {
                    value: "B.Arch",
                    label: "B.Arch (Bachelor of Architecture)",
                  },
                  { value: "B.Des", label: "B.Des (Bachelor of Design)" },
                  { value: "BFA", label: "BFA (Bachelor of Fine Arts)" },
                  { value: "LL.B", label: "LL.B (Bachelor of Laws)" },
                  {
                    value: "MBBS",
                    label: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
                  },
                  { value: "B.Pharm", label: "B.Pharm (Bachelor of Pharmacy)" },
                  {
                    value: "B.Tech + M.Tech",
                    label: "B.Tech + M.Tech (Integrated)",
                  },
                  { value: "BS + MS", label: "BS + MS (Integrated)" },
                  { value: "BBA + MBA", label: "BBA + MBA (Integrated)" },
                  {
                    value: "B.Com + M.Com",
                    label: "B.Com + M.Com (Integrated)",
                  },
                  { value: "BA + MA", label: "BA + MA (Integrated)" },
                  { value: "B.Sc + M.Sc", label: "B.Sc + M.Sc (Integrated)" },
                  {
                    value: "B.Des + M.Des",
                    label: "B.Des + M.Des (Integrated)",
                  },
                  {
                    value: "B.Arch + M.Arch",
                    label: "B.Arch + M.Arch (Integrated)",
                  },
                  {
                    value: "B.Pharm + M.Pharm",
                    label: "B.Pharm + M.Pharm (Integrated)",
                  },
                  { value: "Other", label: "Other" },
                ]}
                onChange={(selectedOption) => {
                  setSelectedBachelorDegree(selectedOption);
                  handleBachelorDegreeChange(selectedOption);
                }}
                value={selectedBachelorDegree}
                required
                className="select-bootstrap"
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            </div>
            {selectedBachelorDegree &&
              selectedBachelorDegree.value === "Other" && (
                <div className="form-group mt-2">
                  <label>
                    Please specify the degree: {renderRequiredAsterisk()}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={otherBachelorDegree}
                    onChange={(e) => setOtherBachelorDegree(e.target.value)}
                    required
                  />
                </div>
              )}
            <div className="form-group">
              <label>Field of Study: {renderRequiredAsterisk()}</label>
              <Select
                options={[
                  {
                    value: "computer_science",
                    label: "Computer Science & Engineering",
                  },
                  { value: "mechanical", label: "Mechanical Engineering" },
                  { value: "electrical", label: "Electrical Engineering" },
                  { value: "civil", label: "Civil Engineering" },
                  {
                    value: "electronics",
                    label: "Electronics & Communication",
                  },
                  { value: "chemical", label: "Chemical Engineering" },
                  { value: "aerospace", label: "Aerospace Engineering" },
                  { value: "biotechnology", label: "Biotechnology" },
                  { value: "physics", label: "Physics" },
                  { value: "chemistry", label: "Chemistry" },
                  { value: "mathematics", label: "Mathematics" },
                  { value: "biology", label: "Biology" },
                  { value: "economics", label: "Economics" },
                  { value: "business", label: "Business Administration" },
                  { value: "accounting", label: "Accounting & Finance" },
                  { value: "marketing", label: "Marketing" },
                  { value: "psychology", label: "Psychology" },
                  { value: "sociology", label: "Sociology" },
                  { value: "history", label: "History" },
                  { value: "political_science", label: "Political Science" },
                  { value: "literature", label: "Literature" },
                  { value: "law", label: "Law" },
                  { value: "medicine", label: "Medicine" },
                  { value: "nursing", label: "Nursing" },
                  { value: "pharmacy", label: "Pharmacy" },
                  { value: "architecture", label: "Architecture" },
                  { value: "design", label: "Design" },
                  { value: "fine_arts", label: "Fine Arts" },
                  { value: "other", label: "Other" },
                ]}
                required
                className="select-bootstrap"
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            </div>
            <div className="form-group">
              <label>Completion Status: {renderRequiredAsterisk()}</label>
              <Select
                options={[
                  { value: "1", label: "1st Year" },
                  { value: "2", label: "2nd Year" },
                  { value: "3", label: "3rd Year" },
                  { value: "4", label: "4th Year" },
                  { value: "5", label: "5th Year" },
                  { value: "completed", label: "Completed" },
                ]}
                required
                className="select-bootstrap"
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            </div>
            <div className="form-group">
              <label>Year of Graduation: {renderRequiredAsterisk()}</label>
              <Select
                options={Array.from({ length: 61 }, (_, i) => ({
                  value: 2035 - i,
                  label: 2035 - i,
                }))}
                required
                className="select-bootstrap"
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            </div>

            {renderLocationFields("bachelor")}
            <div className="form-group">
              <label>CGPA/Percentage: {renderRequiredAsterisk()}</label>
              <input
                type="text"
                className="form-control"
                value={cgpa.bachelor || ""}
                onChange={(e) => handleCGPAInput(e.target.value, "bachelor")}
                required
              />
            </div>
          </div>
        )}

        {showMaster && (
          <>
            <div className="form-group">
              <label>Have you completed any Master's degree(s)?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="hasMaster"
                    value="yes"
                    checked={hasMaster}
                    onChange={() => {
                      setHasMaster(true);
                      if (masterList.length === 0) {
                        setMasterList([{}]);
                      }
                    }}
                    required
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasMaster"
                    value="no"
                    checked={!hasMaster}
                    onChange={() => {
                      setHasMaster(false);
                      setMasterList([]);
                    }}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {hasMaster && (
              <div className="section">
                <h4>Master's Degree Details:</h4>
                {masterList.map((_, index) => renderMasterFields(index))}

                {!isSandwichCourse && (
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={addMaster}
                  >
                    + Add Another Master's Degree
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {showDoctorate && (
          <>
            <div className="form-group">
              <label>Have you completed a Doctorate?</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={hasDoctorate}
                    onChange={(e) => setHasDoctorate(e.target.checked)}
                  />{" "}
                  Yes
                </label>
              </div>
            </div>

            {hasDoctorate && (
              <div className="section">
                <h4>Doctorate Details:</h4>
                <div className="form-group">
                  <label>Field of Study: {renderRequiredAsterisk()}</label>
                  <Select
                    options={[
                      { value: "computer_science", label: "Computer Science" },
                      { value: "engineering", label: "Engineering" },
                      { value: "physics", label: "Physics" },
                      { value: "chemistry", label: "Chemistry" },
                      { value: "biology", label: "Biology" },
                      { value: "mathematics", label: "Mathematics" },
                      { value: "economics", label: "Economics" },
                      { value: "business", label: "Business Administration" },
                      { value: "literature", label: "Literature" },
                      { value: "history", label: "History" },
                      { value: "sociology", label: "Sociology" },
                      { value: "psychology", label: "Psychology" },
                      {
                        value: "political_science",
                        label: "Political Science",
                      },
                      { value: "philosophy", label: "Philosophy" },
                      { value: "law", label: "Law" },
                      { value: "medicine", label: "Medicine" },
                      { value: "public_health", label: "Public Health" },
                      { value: "education", label: "Education" },
                      {
                        value: "environmental_science",
                        label: "Environmental Science",
                      },
                      { value: "neuroscience", label: "Neuroscience" },
                      { value: "other", label: "Other" },
                    ]}
                    onChange={(selectedOption) => {
                      setSelectedPhDField(selectedOption);
                    }}
                    value={selectedPhDField}
                    required
                    className="select-bootstrap"
                    styles={{
                      control: (base) => ({ ...base, cursor: "pointer" }),
                    }}
                  />
                </div>
                {selectedPhDField && selectedPhDField.value === "other" && (
                  <div className="form-group mt-2">
                    <label>
                      Please specify the field of study:{" "}
                      {renderRequiredAsterisk()}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={otherPhDField}
                      onChange={(e) => setOtherPhDField(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Completion Status: {renderRequiredAsterisk()}</label>
                  <Select
                    options={[
                      { value: "1", label: "1st Year" },
                      { value: "2", label: "2nd Year" },
                      { value: "3", label: "3rd Year" },
                      { value: "4", label: "4th Year" },
                      { value: "5", label: "5th Year" },
                      { value: "completed", label: "Completed" },
                    ]}
                    required
                    className="select-bootstrap"
                    styles={{
                      control: (base) => ({ ...base, cursor: "pointer" }),
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Year of Completion: {renderRequiredAsterisk()}</label>
                  <Select
                    options={Array.from({ length: 61 }, (_, i) => ({
                      value: 2035 - i,
                      label: 2035 - i,
                    }))}
                    required
                    className="select-bootstrap"
                    styles={{
                      control: (base) => ({ ...base, cursor: "pointer" }),
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Thesis Title: {renderRequiredAsterisk()}</label>
                  <input type="text" className="form-control" required />
                </div>
                {renderLocationFields("doctorate")}
              </div>
            )}
          </>
        )}

        <div className="form-group">
          <label>Do you have any gaps in education?</label>
          {/* <div>
            <label>
              <input
                type="checkbox"
                checked={hasGaps}
                onChange={(e) => setHasGaps(e.target.checked)}
              />{" "}
              Yes
            </label>
          </div> */}
          <div className="checkbox-container">
  <input
    type="checkbox"
    id="gapsCheckbox"
    className="checkbox-input"
    checked={hasGaps}
    onChange={(e) => setHasGaps(e.target.checked)}
  />
  <label htmlFor="gapsCheckbox" className="checkbox-label">
    Yes
  </label>
</div>
        </div>

        {hasGaps && (
          <div className="form-group">
            <label>Please explain the gaps in your education:</label>
            <textarea
              className="form-control"
              rows="3"
              value={gapDetails}
              onChange={(e) => setGapDetails(e.target.value)}
              required
            ></textarea>
          </div>
        )}

        <div className="form-group">
          <label>Any other relevant qualifications or certifications?</label>
          <textarea className="form-control" rows="3"></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Education;