import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./HR_Onboarding.css";

const HR_Onboarding = () => {
  const [onboardingRequests, setOnboardingRequests] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Fetch onboarding requests from the backend
    axios.get("http://127.0.0.1:8000/Onboarding/Get_Onboarding_requests/")
      .then(response => {
        setOnboardingRequests(response.data);
      })
      .catch(error => {
        console.error("Error fetching onboarding requests:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch employee list from the backend
    axios.get("http://127.0.0.1:8000/Onboarding/Get_Employee_List/")
      .then(response => {
        setEmployeeList(response.data);
      })
      .catch(error => {
        console.error("Error fetching employee list:", error);
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
      HR_comment: event.target.value
    }));
  };

  const handleAssignToChange = (event) => {
    setSelectedRequest(prevState => ({
      ...prevState,
      Assigned_to: event.target.value
    }));
  };

  const handleSaveChanges = () => {
    // Update HR comment and Assigned To in the backend
    axios.put(`http://127.0.0.1:8000/Onboarding/Update_Onboarding_request/${selectedRequest.id}/`, selectedRequest)
      .then(response => {
        // Update the onboarding request in the state
        setOnboardingRequests(prevState =>
          prevState.map(request =>
            request.id === selectedRequest.id ? selectedRequest : request
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
              value={selectedRequest.HR_comment}
              onChange={handleCommentChange}
            />
            {/* Input for Assigned To */}
            
            <select
            value={selectedRequest.Assigned_to}
            onChange={handleAssignToChange}
            >
                <option value="">Select Employee</option>
                {employeeList.map(employee => (
                <option key={employee.id} value={employee.id}>
                    {employee.name}
                </option>
                ))}
            </select>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HR_Onboarding;
