import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./HR_Onboarding.css";

const Sup_Onboarding = () => {
  const [onboardingRequests, setOnboardingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming your token key is 'token'
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    console.log('test')
    console.log(token)
    console.log('last')  
    // Fetch onboarding requests from the backend with the token in the header
    axios.get("http://127.0.0.1:8000/Onboarding/Get_Onboarding_requests_Sup/", config)
      .then(response => {
        setOnboardingRequests(response.data);
      })
      .catch(error => {
        console.error("Error fetching onboarding requests:", error);
      });
  }, []);


  const openModal = (request) => {
    setSelectedRequest(request);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalIsOpen(false);
  };

  const handleCommentChange = (event) => {
    setSelectedRequest(prevState => ({
      ...prevState,
      Technical_comment: event.target.value
    }));
  };


  const handleSaveChanges = (action) => {
    const token = localStorage.getItem('token'); // Assuming your token key is 'token'
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    // Create a copy of the selected request with the updated status
    const updatedRequest = { ...selectedRequest, Status: action  };
  
    // Update the onboarding request in the backend
    axios.put(`http://127.0.0.1:8000/Onboarding/Update_Onboarding_request_sup/${selectedRequest.id}/`, { ...updatedRequest, action },config)
      .then(response => {
        // Update the onboarding request in the state
        setOnboardingRequests(prevState =>
          prevState.map(request =>
            request.id === selectedRequest.id ? updatedRequest : request
          )
        );
        closeModal();
      })
      .catch(error => {
        console.error("Error updating onboarding request:", error);
      });
  };

  return (
    <div>
      <h2>HR Onboarding Requests</h2>
      {onboardingRequests.map(request => (
        <div key={request.id} className="card">
          <div className="card-header" onClick={() => openModal(request)}>
            <h3>{request.name}</h3>
            <p>Application Date: {request.application_date}</p>
            <p>Position: {request.position_applying_for}</p>
            <p>Status: {request.Status}</p>
          </div>
        </div>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Onboarding Request Details"
      >
        {selectedRequest && (
          <div>
            {/* Display detailed information */}
            <h2>{selectedRequest.name}</h2>
            <p>Email: {selectedRequest.email}</p>
            <p>Phone Number: {selectedRequest.phone_number}</p>
            <p>Address: {selectedRequest.address}</p>
            <p>Date of Birth: {selectedRequest.date_of_birth}</p>
            <p>Place of Birth: {selectedRequest.place_of_birth}</p>
            <p>Gender: {selectedRequest.gender}</p>
            <p>Military Service: {selectedRequest.military_service}</p>
            <p>Father Occupation: {selectedRequest.father_occupation}</p>
            <p>Marital Status: {selectedRequest.marital_status}</p>
            <p>Number of Kids: {selectedRequest.num_of_kids}</p>
            <p>Spouse Occupation: {selectedRequest.spouse_occupation}</p>
            <p>Current Employer Benefits: {selectedRequest.current_employer_benefits}</p>
            <p>Education: {selectedRequest.education}</p>
            <p>References: {selectedRequest.references}</p>
            <p>Referred By: {selectedRequest.referred_by}</p>
            <p>Expected Salary: {selectedRequest.expected_salary}</p>
            <p>Notice Period: {selectedRequest.notice_period}</p>
            <p>Hr Comments: {selectedRequest.HR_comment}</p>
            {selectedRequest.experiences.map((experience, expIndex) => (
                <div key={expIndex}>
                  <p>Employer: {experience.employer}</p>
                  <p>Title: {experience.title}</p>
                  <p>From Date: {experience.from_date}</p>
                  <p>To Date: {experience.to_date}</p>
                  <p>Gross Salary: {experience.gross_salary}</p>
                  <p>Leave Reason: {experience.leave_reason}</p>
                </div>
              ))}
            <textarea
              value={selectedRequest.Technical_comment}
              onChange={handleCommentChange}
            />
            {/* Input for Assigned To */}
            
            <div>
                <button onClick={() => handleSaveChanges('Accept')}>Accept</button>
                <button onClick={() => handleSaveChanges('Reject')}>Reject</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Sup_Onboarding;
