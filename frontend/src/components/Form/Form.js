import React, { useState, useEffect } from "react";
import MagneticButton from "../Miscellaneous/MagneticButton";
import { useProfile } from "../../context/profileContext";

const Form = () => {
  const { profile } = useProfile();

  const [contactInfo, setContactInfo] = useState({
    title: "Schedule a call with me to see if I can help",
    description:
      "Whether you’re looking to start a new project or simply want to chat, feel free to reach out to me!",
    phone: "",
    email: "",
    address: "",
  });

  const [messageStatus, setMessageStatus] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setContactInfo((prevInfo) => ({
        ...prevInfo,
        phone: profile?.phone || "",
        email: profile?.email || "",
        address: profile?.address || "",
      }));
    }
  }, [profile]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    interest: "",
    budget: "",
    timeline: "",
    message: "",
  });

  // State for selected option, defaulting to "contract"
  const [selectedOption, setSelectedOption] = useState("contract");

  // Reset form data when the option changes
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      website: "",
      interest: "",
      budget: "",
      timeline: "",
      message: "",
    });
  }, [selectedOption]); // Depend on selectedOption

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const displayMessage = (type, text) => {
    setMessageStatus(type);
    setMessageText(text);
    setTimeout(() => {
      setMessageStatus(null);
      setMessageText("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let requiredFieldsMet = true;
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // Basic validation for both modes
    if (!formData.name || !formData.email || !formData.message) {
      displayMessage("error", "Name, Email, and Message are required fields.");
      requiredFieldsMet = false;
    }

    if (selectedOption === "contract" && requiredFieldsMet) {
      // Additional validation for 'Contract' mode
      if (!formData.interest || !formData.budget || !formData.timeline) {
        displayMessage("error", "For contract inquiries, Interest, Budget, and Timeline are also required.");
        requiredFieldsMet = false;
      }
      Object.assign(dataToSend, {
        phone: formData.phone,
        companyName: formData.companyName,
        website: formData.website,
        interest: formData.interest,
        budget: formData.budget,
        timeline: formData.timeline,
      });
    }

    if (!requiredFieldsMet) {
      setIsLoading(false);
      return;
    }

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/email/send-support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend), // Send selected data
      });

      const result = await response.json();

      if (response.ok) {
        displayMessage("success", "Message sent successfully!");
        // Reset form data completely after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          website: "",
          interest: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        displayMessage("error", result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      displayMessage("error", "Failed to send message. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-area primary-bg">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-4 order-last order-md-first">
            <div className="contact-info">
              <h3>{contactInfo.title}</h3>
              <p>{contactInfo.description}</p>
              <div className="content contact-form">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="icon icon-phone"></i>
                    <a className="content" href={`tel:${contactInfo.phone}`}>
                      {contactInfo.phone}
                    </a>
                  </li>
                  <li className="list-group-item">
                    <i className="icon icon-envelope-open"></i>
                    <a className="content" href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </li>
                  <li className="list-group-item">
                    <i className="icon icon-location-pin"></i>
                    <span className="content">{contactInfo.address}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7 order-first order-md-last mt-sm-4 mt-lg-0">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <div className="form-label">What brings you here today?</div>
                <div className="form-input-group">
                  <div className="form-input">
                    <input
                      type="radio"
                      className="btn-check"
                      name="option"
                      id="contract"
                      value="contract"
                      checked={selectedOption === "contract"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <label className="btn magnetic-button btn-outline" htmlFor="contract">
                      Work Together / Contract Inquiry
                    </label>
                  </div>
                  <div className="form-input">
                    <input
                      type="radio"
                      className="btn-check"
                      name="option"
                      id="connect"
                      value="connect"
                      checked={selectedOption === "connect"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <label className="btn magnetic-button btn-outline" htmlFor="connect">
                      Say Hi / General Connect
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="name">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              {/* Conditional rendering for "Contract" specific fields */}
              {selectedOption === "contract" && (
                <>
                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Phone (Optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="phone">Phone (Optional)</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      placeholder="Company Name (Optional)"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="companyName">Company Name (Optional)</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="url"
                      className="form-control"
                      id="website"
                      placeholder="Website (Optional)"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="website">Website (Optional)</label>
                  </div>

                  <div className="form-group mb-3">
                    <div className="form-label">I'm interested in:</div>
                    <div className="form-input-group">
                      {["Branding", "Web Design", "App Design", "Other"].map((option) => (
                        <div className="form-input" key={option}>
                          <input
                            type="radio"
                            className="btn-check"
                            name="interest"
                            id={`option-${option.toLowerCase().replace(/\s/g, '-')}`}
                            value={option}
                            checked={formData.interest === option}
                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                            required={selectedOption === "contract"}
                          />
                          <label className="btn magnetic-button btn-outline" htmlFor={`option-${option.toLowerCase().replace(/\s/g, '-')}`}>
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="form-label">My budget is:</div>
                    <div className="form-input-group">
                      {["< 2k", "2-5k", "5-10k", "10-15k", "> 20k"].map((option) => (
                        <div className="form-input" key={option}>
                          <input
                            type="radio"
                            className="btn-check"
                            name="budget"
                            id={`budget-${option.replace(/[\s<>]/g, '')}`}
                            value={option}
                            checked={formData.budget === option}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            required={selectedOption === "contract"}
                          />
                          <label className="btn magnetic-button btn-outline" htmlFor={`budget-${option.replace(/[\s<>]/g, '')}`}>
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="timeline"
                      placeholder="Timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required={selectedOption === "contract"}
                    />
                    <label htmlFor="timeline">Timeline</label>
                  </div>
                </>
              )}

              <div className="form-floating mb-4">
                <textarea
                  className="form-control"
                  id="message"
                  placeholder="Message"
                  style={{ height: "100px" }}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="message">Message</label>
              </div>

              <MagneticButton
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? "Sending..." : "Submit Message"}
              </MagneticButton>
            </form>

            {messageText && (
              <p
                className={`form-message ${messageStatus === 'success' ? 'text-success' : 'text-danger'}`}
                style={{
                  marginTop: '15px',
                  fontWeight: 'bold',
                  color: messageStatus === 'success' ? 'green' : 'red'
                }}
              >
                {messageText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;