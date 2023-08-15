import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./Onboarding_form.css"; // Import your CSS file

const OnboardingForm = () => {
    const [positions, setPositions] = useState([]);
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
    } catch (error) { 
        console.log(formData)
        console.error(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className='onboarding-form'>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="date"
        name="application_date"
        value={formData.application_date}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
      />
      <input
        type="text"
        name="place_of_birth"
        placeholder="Place of Birth"
        value={formData.place_of_birth}
        onChange={handleChange}
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select
        name="military_service"
        value={formData.military_service}
        onChange={handleChange}
      >
        <option value="">Select Military Service</option>
        <option value="exempted">Exempted</option>
        <option value="serving">Serving</option>
        <option value="postponed">Postponed</option>
      </select>
      <input
        type="text"
        name="father_occupation"
        placeholder="Father Occupation"
        value={formData.father_occupation}
        onChange={handleChange}
      />
      <select
        name="marital_status"
        value={formData.marital_status}
        onChange={handleChange}
      >
        <option value="">Select Marital Status</option>
        <option value="married">Married</option>
        <option value="divorced">Divorced</option>
        <option value="single">Single</option>
      </select>
      <input
        type="number"
        name="num_of_kids"
        placeholder="Number of Kids"
        value={formData.num_of_kids}
        onChange={handleChange}
      />
      <input
        type="text"
        name="spouse_occupation"
        placeholder="Spouse Occupation"
        value={formData.spouse_occupation}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <select
        name="position_applying_for"
        value={formData.position_applying_for}
        onChange={handleChange}
      >
        <option value="">Select Position</option>
        {/* Map over positions from backend and generate options */}
        {positions.map(position => (
          <option key={position.id} value={position.id}>
            {position.title}
          </option>
        ))}
      </select>
      
      {/* Experience fields (can be repeated for multiple experiences) */}
      <div>
  {formData.job_experience.map((experience, index) => (
    <div key={index}>
      <h3>Job Experience {index + 1}</h3>
      <label htmlFor={`experience_from_date_${index}`}>From Date:</label>
      <input
        type="date"
        id={`experience_from_date_${index}`}
        name={`experience_from_date_${index}`}
        value={experience.from_date}
        onChange={(e) => handleJobExperienceChange(index, 'from_date', e.target.value)}
      />

      <label htmlFor={`experience_to_date_${index}`}>To Date:</label>
      <input
        type="date"
        id={`experience_to_date_${index}`}
        name={`experience_to_date_${index}`}
        value={experience.to_date}
        onChange={(e) => handleJobExperienceChange(index, 'to_date', e.target.value)}
      />

      <label htmlFor={`experience_employer_${index}`}>Employer:</label>
      <input
        type="text"
        id={`experience_employer_${index}`}
        name={`experience_employer_${index}`}
        value={experience.employer}
        onChange={(e) => handleJobExperienceChange(index, 'employer', e.target.value)}
      />

      <label htmlFor={`experience_title_${index}`}>Title:</label>
      <input
        type="text"
        id={`experience_title_${index}`}
        name={`experience_title_${index}`}
        value={experience.title}
        onChange={(e) => handleJobExperienceChange(index, 'title', e.target.value)}
      />

      <label htmlFor={`experience_gross_salary_${index}`}>Gross Salary:</label>
      <input
        type="number"
        id={`experience_gross_salary_${index}`}
        name={`experience_gross_salary_${index}`}
        value={experience.gross_salary}
        onChange={(e) => handleJobExperienceChange(index, 'gross_salary', e.target.value)}
      />

      <label htmlFor={`experience_leave_reason_${index}`}>Leave Reason:</label>
      <textarea
        id={`experience_leave_reason_${index}`}
        name={`experience_leave_reason_${index}`}
        value={experience.leave_reason}
        onChange={(e) => handleJobExperienceChange(index, 'leave_reason', e.target.value)}
      />
      {/* ... Other experience fields */}
      
      <button onClick={() => removeJobExperience(index)}>Remove Experience</button>
    </div>
  ))}
  
  <button onClick={addJobExperience}>Add Experience</button>
</div>
      <input
        type="text"
        name="current_employer_benefits"
        placeholder="Current Employer Benefits"
        value={formData.current_employer_benefits}
        onChange={handleChange}
      />
      <textarea
        name="education"
        placeholder="Education"
        value={formData.education}
        onChange={handleChange}
      ></textarea>
      <textarea
        name="references"
        placeholder="References"
        value={formData.references}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="referred_by"
        placeholder="Referred By"
        value={formData.referred_by}
        onChange={handleChange}
      />
      <input
        type="number"
        name="expected_salary"
        placeholder="Expected Salary"
        value={formData.expected_salary}
        onChange={handleChange}
      />
      <input
        type="text"
        name="notice_period"
        placeholder="Notice Period"
        value={formData.notice_period}
        onChange={handleChange}
      />

    <button type="submit">Submit</button>
  </form>
  );
};

export default OnboardingForm;
