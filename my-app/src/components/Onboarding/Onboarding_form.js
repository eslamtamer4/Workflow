import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./Onboarding_form.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

const OnboardingForm = () => {
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: '',
    address: '',
    application_date: '',
    date_of_birth: '',
    place_of_birth: '',
    gender: '',
    military_service: '',
    father_occupation: '',
    marital_status: '',
    num_of_kids: 0,
    spouse_occupation: '',
    phone_number: '',
    email: '',
    position_applying_for: '',
    job_experience: [],
    current_employer_benefits: '',
    education: '',
    references: '',
    referred_by: '',
    expected_salary: 0,
    notice_period: '',
  });

  const handleJobExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.job_experience];
    updatedExperiences[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      job_experience: updatedExperiences,
    }));
  };

  const addJobExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      job_experience: [
        ...prevData.job_experience,
        {
          from_date: '',
          to_date: '',
          employer: '',
          title: '',
          gross_salary: 0,
          leave_reason: '',
        },
      ],
    }));
  };

  const removeJobExperience = (index) => {
    const updatedExperiences = formData.job_experience.filter((exp, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      job_experience: updatedExperiences,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch positions from backend and populate positions state
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Onboarding/Fetch_Positions/'); // Update the API endpoint
        setPositions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPositions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/Onboarding/Post_Onboarding_Form/', formData); // Update the API endpoint
      console.log(response.data);
      // navigate("/Success_Page");
    } catch (error) { 
        console.log(formData)
        console.error(error);
    }
  };
  
  return (
    <div class="formbold-main-wrapper">
   
    <div class="formbold-form-wrapper">
      <form onSubmit={handleSubmit}>

      <div class="formbold-mb-3">
            <label for="name" class="formbold-form-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              class="formbold-form-input"
              value={formData.name}
              onChange={handleChange}
            />
        </div>
  
        <div class="formbold-mb-3">
            <label for="application_date" class="formbold-form-label">Application Date</label>
            <input
              type="date"
              name="application_date"
              id="application_date"
              placeholder="application_date"
              class="formbold-form-input"
              value={formData.application_date}
              onChange={handleChange}
            />
        </div>

        <div class="formbold-input-flex">
          <div>
              <label for="email" class="formbold-form-label"> Email </label>
              <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              class="formbold-form-input"
              />
          </div>
  
          <div>
              <label for="gender" class="formbold-form-label"> Gender</label>
              <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              class="formbold-form-input"
              >
              <option value="">Choose a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="formbold-input-flex">
          <div>
            <label for="Place of birth" class="formbold-form-label"> Place Of Birth </label>
            <input
              type="text"
              name="place_of_birth"
              id="placeofbirth"
              placeholder="Your place of birth"
              value={formData.place_of_birth}
              onChange={handleChange}
              class="formbold-form-input"
            />
          </div>

          <div class="formbold-mb-3">
          <label for="date_of_birth" class="formbold-form-label"> Date of Birth </label>
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            class="formbold-form-input"
          />
          </div>
        </div>

        <div class="formbold-mb-3">
          <label for="address" class="formbold-form-label"> Address </label>
  
          <textarea
            name="address"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            class="formbold-form-input formbold-mb-3"
          />
        </div>

        <div class="formbold-input-flex">
          <div>
              <label for="military_service" class="formbold-form-label"> Military Service </label>
              <select
              name="military_service"
              id="military_service"
              value={formData.military_service}
              onChange={handleChange}
              class="formbold-form-input"
              >
              <option value="">Select Military Service</option>
              <option value="exempted">Exempted</option>
              <option value="serving">Serving</option>
              <option value="postponed">Postponed</option>
            </select>
          </div>
  
          <div>
              <label class="formbold-form-label">Marital Status</label>
              <select
              name="marital_status"
              id="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              class="formbold-form-input"
               >
        <option value="">Select Marital Status</option>
        <option value="married">Married</option>
        <option value="divorced">Divorced</option>
        <option value="single">Single</option>
      </select>
          </div>
        </div>

        
        <div class="formbold-input-flex">
          <div>
              <label for="father_occupation" class="formbold-form-label"> Father Occupation</label>
              <input
              type="text"
              name="father_occupation"
              id="father_occupation"
              value={formData.father_occupation}
              onChange={handleChange}
              class="formbold-form-input"
              />
          </div>
  
          <div>
              <label class="formbold-form-label">Spouse Occupation </label>
              <input
              type="text"
              name="spouse_occupation"
              id="spouse_occupation"
              value={formData.spouse_occupation}
              onChange={handleChange}
              class="formbold-form-input"
              />
          </div>
        </div>
  
  
        <div class="formbold-input-flex">
  
          <div>
          <label class="formbold-form-label">Phone number </label>
            <input
              type="tel"
              name="phone_number"
              id='phone'
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              class="formbold-form-input"
            />
          </div>
          <div>
          <label class="formbold-form-label">No. of kids </label>
            <input
              type="number"
              name="num_of_kids"
              placeholder="Number of Kids"
              value={formData.num_of_kids}
              onChange={handleChange}
              class="formbold-form-input"
            />
          </div>
        </div>
  
        <div class="formbold-mb-3">
          <label for="position_applying_for" class="formbold-form-label"> Applying for Position: </label>
          <select
            name="position_applying_for"
            id="position_applying_for"
            value={formData.position_applying_for}
            onChange={handleChange}
            class="formbold-form-input"
          >
            <option value="">Select Position</option>
            {/* Map over positions from backend and generate options */}
            {positions.map(position => (
              <option key={position.id} value={position.id}>
                {position.title}
              </option>
            ))}
          </select>
        </div>

        <div class="formbold-mb-3">
            {formData.job_experience.map((experience, index) => (
              <div key={index}>
                <h3 style={{marginTop:'10px'}}>Job Experience {index + 1}</h3>
                <label htmlFor={`experience_from_date_${index}`}>From Date:</label>
                <input
                  type="date"
                  id={`experience_from_date_${index}`}
                  name={`experience_from_date_${index}`}
                  placeholder='The start date'
                  class="formbold-form-input"
                  value={experience.from_date}
                  onChange={(e) => handleJobExperienceChange(index, 'from_date', e.target.value)}
                />

                <label htmlFor={`experience_to_date_${index}`}>To Date:</label>
                <input
                  type="date"
                  id={`experience_to_date_${index}`}
                  name={`experience_to_date_${index}`}
                  placeholder='The end date'
                  class="formbold-form-input"
                  value={experience.to_date}
                  onChange={(e) => handleJobExperienceChange(index, 'to_date', e.target.value)}
                />

                <label htmlFor={`experience_employer_${index}`}>Employer:</label>
                <input
                  type="text"
                  id={`experience_employer_${index}`}
                  name={`experience_employer_${index}`}
                  placeholder='Name of employer'
                  class="formbold-form-input"
                  value={experience.employer}
                  onChange={(e) => handleJobExperienceChange(index, 'employer', e.target.value)}
                />

                <label htmlFor={`experience_title_${index}`}>Title:</label>
                <input
                  type="text"
                  id={`experience_title_${index}`}
                  name={`experience_title_${index}`}
                  placeholder='What was your title?'
                  class="formbold-form-input"
                  value={experience.title}
                  onChange={(e) => handleJobExperienceChange(index, 'title', e.target.value)}
                />

                <label htmlFor={`experience_gross_salary_${index}`}>Gross Salary:</label>
                <input
                  type="number"
                  id={`experience_gross_salary_${index}`}
                  name={`experience_gross_salary_${index}`}
                  placeholder='Gross salary'
                  class="formbold-form-input"
                  value={experience.gross_salary}
                  onChange={(e) => handleJobExperienceChange(index, 'gross_salary', e.target.value)}
                />

                <label htmlFor={`experience_leave_reason_${index}`}>Leave Reason:</label>
                <textarea
                  id={`experience_leave_reason_${index}`}
                  name={`experience_leave_reason_${index}`}
                  placeholder='Reason of leave'
                  class="formbold-form-input"
                  value={experience.leave_reason}
                  onChange={(e) => handleJobExperienceChange(index, 'leave_reason', e.target.value)}
                />
                {/* ... Other experience fields */}
                
                <button class="formbold-btn" onClick={() => removeJobExperience(index)} style={{width:'300px',height:'50px'}}>Remove Experience</button>
              </div>
            ))}
            
            <button class="formbold-btn" onClick={addJobExperience} style={{width:'300px',height:'50px'}}>Add Experience</button>
          </div>


          <div class="formbold-mb-3">
          <label for="address" class="formbold-form-label"> Current Employer Benefits: </label> 
          <input
              type="text"
              name="current_employer_benefits"
              placeholder="Current Employer Benefits"
              value={formData.current_employer_benefits}
              onChange={handleChange}
              class="formbold-form-input"
            />
        </div>

        <div class="formbold-mb-3">
          <label for="address" class="formbold-form-label"> Education: </label> 
          <textarea
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
              class="formbold-form-input"
            >
            </textarea>
        </div>

        <div class="formbold-mb-3">
          <label for="address" class="formbold-form-label"> References: </label> 
          <textarea
              name="references"
              placeholder="References"
              value={formData.references}
              onChange={handleChange}
              class="formbold-form-input"
            >
            </textarea>
        </div>

        <div class="formbold-mb-3">
          <label for="address" class="formbold-form-label"> Referred By: </label> 
          <textarea
              type="text"
              name="referred_by"
              placeholder="Referred By"
              value={formData.referred_by}
              onChange={handleChange}
              class="formbold-form-input"
            >
            </textarea>
        </div>

        <div class="formbold-mb-3">
          <label for="address" class="formbold-form-label"> Expected Salary: </label> 
          <input
              type="number"
              name="expected_salary"
              placeholder="Expected Salary"
              value={formData.expected_salary}
              onChange={handleChange}
              class="formbold-form-input"
            />
        </div>

        <div class="formbold-mb-3">
          <label for="dob" class="formbold-form-label"> When can you start? </label>
          <input
            type="text"
            name="notice_period"
            placeholder="Notice Period"
            value={formData.notice_period}
            onChange={handleChange}
            class="formbold-form-input"
          />
        </div>  
       
        {/* <div class="formbold-form-file-flex">
          <label for="upload" class="formbold-form-label">
            Upload Resume
          </label>
          <input
            type="file"
            name="upload"
            id="upload"
            class="formbold-form-file"
          />
        </div> */}
  
        <button type="submit" class="formbold-btn">Submit</button>
      </form>
    </div>
  </div>
  );
};

export default OnboardingForm;
