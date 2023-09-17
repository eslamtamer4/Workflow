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

  function getStatusClassName(status) {
    if (status === 'Awaiting Supervisor Approval') {
      return 'AwaitingSupervisorApproval';
    } else if (status === 'Accepted') {
      return 'Accepted';
    } else if (status === 'Rejected') {
      return 'Rejected';
    }
    return '';
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
      <div class="grid-container">
        {onboardingRequests.map(request => (
            <div
              key={request.id}
              className="card"
              onClick={() => openModal(request)}
            >
              <div className="card-header">
                <h3>{request.name}</h3>
                <p>Application Date: {request.application_date}</p>
                <p>Position: {request.position_applying_for}</p>
                <p className={`status-${getStatusClassName(request.Status)}`}>{request.Status}</p>
              </div>
            </div>
          ))}
          </div>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Onboarding Request Details"
      className="modal-overlay"
      shouldCloseOnOverlayClick={true}
      >
        {selectedRequest && (
          <div className="modal-content">
          <div className="modal-header">
            <h2>{selectedRequest.name}</h2>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
          <div className="modal-body">
            {/* Display detailed information */}
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
            <div className="modal-section">
              <h3>Hr Comments</h3>
              <p>{selectedRequest.HR_comment}</p>
            </div>
            <div className="modal-section">
              <h3>Technical Comment</h3>
              {selectedRequest.Status === 'Accepted' || selectedRequest.Status === 'Rejected' ? (
                <p>{selectedRequest.Technical_comment}</p>
              ) : (
                <textarea
                  value={selectedRequest.Technical_comment}
                  onChange={handleCommentChange}
                />
              )}
            </div>

            {selectedRequest.Status === 'Awaiting Supervisor Approval' && (
              <div>
                <button
                  onClick={() => handleSaveChanges('Accept')}
                  disabled={!selectedRequest.Technical_comment || !selectedRequest.Technical_comment.trim()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                    backgroundColor: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'green'
                      : 'gray',
                    color: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'white'
                      : 'black',
                      border: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? '1px solid green' // Use red border when technical comment is not empty
                      : '1px solid gray',
                    marginRight: '10px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'green';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'green'
                      : 'gray';
                    e.target.style.color = selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'white'
                      : 'black';
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleSaveChanges('Reject')}
                  disabled={!selectedRequest.Technical_comment || !selectedRequest.Technical_comment.trim()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                    backgroundColor: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'red'
                      : 'gray',
                    color: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'white'
                      : 'black',
                      border: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? '1px solid red' // Use red border when technical comment is not empty
                      : '1px solid gray',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'red';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'red'
                      : 'gray';
                    e.target.style.color = selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'white'
                      : 'black';
                  }}
                >
                  Reject
                </button>
                <button
                  onClick={closeModal}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                    backgroundColor: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'gray'
                      : 'gray',
                    color: selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'white'
                      : 'black',
                    border: '1px solid gray',
                    marginLeft: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'gray';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'gray'
                      : 'gray';
                    e.target.style.color = selectedRequest.Technical_comment && selectedRequest.Technical_comment.trim()
                      ? 'white'
                      : 'black';
                  }}
                >
                  Cancel
                </button>
            </div>
            )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Sup_Onboarding;
