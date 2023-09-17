import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./HR_Onboarding.css";

const HR_Onboarding = () => {
  const [onboardingRequests, setOnboardingRequests] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [actionClicked, setActionClicked] = useState(null);


  useEffect(() => {
    // Fetch onboarding requests from the backend
    axios.get("http://127.0.0.1:8000/Onboarding/Get_Onboarding_requests/")
      .then(response => {
        setOnboardingRequests(response.data);
        console.log(response.data)
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
    setActionClicked(null)
  };

  const handleCommentChange = (event) => {
    setSelectedRequest(prevState => ({
      ...prevState,
      HR_comment: event.target.value
    }));
  };

  const handleRejectionReasonChange = (event) => {
    setSelectedRequest(prevState => ({
      ...prevState,
      Rejection_reason: event.target.value
    }));
  };

  const handleAssignToChange = (event) => {
    setSelectedRequest(prevState => ({
      ...prevState,
      Assigned_to: event.target.value
    }));
  };

  const handleActionClick = (action) => {
    setActionClicked(action);
  };

  function getStatusClassName(status) {
    if (status === 'Awaiting HR Approval') {
      return 'AwaitingHRApproval';
    } else if (status === 'Accepted') {
      return 'Accepted';
    } else if (status === 'Rejected') {
      return 'Rejected';
    }
    return '';
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
              <div key={expIndex} className="modal-section">
                <h3>Experience {expIndex + 1}</h3>
                <p>Employer: {experience.employer}</p>
                <p>Title: {experience.title}</p>
                <p>From Date: {experience.from_date}</p>
                <p>To Date: {experience.to_date}</p>
                <p>Gross Salary: {experience.gross_salary}</p>
                <p>Leave Reason: {experience.leave_reason}</p>
              </div>
            ))}
                {selectedRequest.Status === 'Awaiting HR Approval' && !actionClicked && (
                  <div className="modal-section" style={{ marginTop: '20px' }}>
                    <button
                      onClick={() => handleActionClick('accept')}
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        marginRight: '10px',
                        padding: '8px 16px',
                        border: '1px solid green',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color='green'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'green';
                        e.target.style.color='white'
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleActionClick('reject')}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '8px 16px',
                        border: '1px solid red',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color='red'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'red';
                        e.target.style.color='white'
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}
                {actionClicked === 'accept' && (
                  <div>
                  <div className="modal-section">
                    <div className="modal-section">
                      <h3>HR Comment</h3>
                      <textarea
                        value={selectedRequest.HR_comment}
                        onChange={handleCommentChange}
                      />
                    </div>

                    <div className="modal-section">
                      <h3>Assigned To</h3>
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
                    </div>
                  </div>
                    <div className="button-container">
                    <button onClick={handleSaveChanges}>Save Changes</button>
                  </div>
                  </div>

                  
                )}
                {actionClicked === 'reject' && (
                  <div>
                  <div className="modal-section">
                    <h3>Rejection Reason</h3>
                    <textarea
                      value={selectedRequest.Rejection_reason}
                      onChange={handleRejectionReasonChange}
                    />
                  </div>
                  <div className="button-container">
                    <button onClick={handleSaveChanges}>Save Changes</button>
                  </div>
                </div>
                  
                )}

                {(selectedRequest && (selectedRequest.Status === 'Accepted' || selectedRequest.Status === 'Rejected')) && (
                  <div className="modal-section">
                    <h3>HR Comment</h3>
                    <p>{selectedRequest.HR_comment || "HR Rejected"}</p>
                  </div>
                )}

                {(selectedRequest && (selectedRequest.Status === 'Accepted' || selectedRequest.Status === 'Rejected')) && (
                  <div className="modal-section">
                    <h3>Techincal Comment</h3>
                    <p>{selectedRequest.Technical_comment || "HR Rejected"}</p>
                  </div>
                )}

                {(selectedRequest && (selectedRequest.Status === 'Accepted' || selectedRequest.Status === 'Rejected')) && (
                  <div className="modal-section">
                    <h3>Assigned To</h3>
                    <p>{selectedRequest.Assigned_to || "HR Rejected"}</p>
                  </div>
                )}
          </div>
        </div>
      )}
    </Modal>
  </div>
  );
};

export default HR_Onboarding;
