import React, { useState, useEffect } from 'react'; // Fixed import syntax

const SubscribeForm = () => {
  // Removed lastName from formData state
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
  });
  const [messageStatus, setMessageStatus] = useState(null); // 'success' or 'error'
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Define your logo and banner URLs here
  const LOGO_URL = "https://ik.imagekit.io/upzxi2yzb/tr:w-800,q-100,fo-auto/profile/Asset_4_ucSXtHMrz.svg";
  const BANNER_URL = "https://ik.imagekit.io/upzxi2yzb/tr:w-800,q-100,fo-auto/Mail%20Subscribe%20Assets/subscribe-banner.png";

  // New useEffect to read email from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get('email');
    if (emailFromUrl) {
      setFormData((prevData) => ({
        ...prevData,
        email: emailFromUrl,
      }));
    }
  }, []); // Empty dependency array means this runs once on mount

  // Handle changes to form input fields for all fields (firstName, email)
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Dynamically update the field based on input's id
    }));
  };

  // Function to display messages to the user
  const displayMessage = (type, text) => {
    setMessageStatus(type);
    setMessageText(text);
    // Clear message after 5 seconds for a smooth user experience
    setTimeout(() => {
      setMessageStatus(null);
      setMessageText('');
    }, 5000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission
    setIsLoading(true); // Set loading state to true

    const baseUrl = process.env.REACT_APP_API_BASE_URL || ''; // Ensure baseUrl is defined

    try {
      const response = await fetch(`${baseUrl}/email/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sending only email to match your current backend.
        // If your Mailchimp integration in the backend is updated to accept
        // firstName, you would change this to:
        // body: JSON.stringify(formData),
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();

      if (response.ok) {
        displayMessage('success', result.message || 'Subscribed successfully! Check your inbox.'); // Use result.message for "already subscribed"
        // Reset form data on successful subscription
        setFormData({
          firstName: '',
          email: '',
        });
      } else {
        // Display error message from the backend or a generic one
        displayMessage('error', result.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      displayMessage('error', 'Failed to subscribe. Please check your network and try again.');
    } finally {
      setIsLoading(false); // Always set loading state to false
    }
  };

  // The custom CSS provided by the user, embedded directly for this component
  const customStyles = `
    /* Using Inter font as per previous instructions */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

    .card {
        width: 90%; /* Responsive width */
        max-width: 350px; /* Maximum width for larger screens */
        padding: 0; /* Changed to 0 to allow banner to span full width */
        background: #fff;
        border: 6px solid #000;
        box-shadow: 12px 12px 0 #000;
        transition: transform 0.3s, box-shadow 0.3s;
        font-family: 'Inter', sans-serif; /* Apply Inter font */
        overflow: hidden; /* Ensures rounded corners apply to images too */
    }

    .card:hover {
        transform: translate(-5px, -5px);
        box-shadow: 17px 17px 0 #000;
    }

    .card__header {
        text-align: center;
        padding: 15px 25px 0px 25px; /* Adjust padding after banner */
        display: flex; /* Use flexbox for horizontal alignment */
        align-items: center; /* Vertically center items */
        justify-content: flex-start; /* Horizontally center items */
    }

    .card__banner {
        width: 100%;
        height: auto;
        display: block;
        border-bottom: 3px solid #000; /* Separator for banner */
    }

    .card__logo {
        max-width: 45px; /* Adjusted small logo size */
        height: auto;
        margin-bottom: 0; /* Remove bottom margin */
        margin-right: 10px; /* Space between logo and title */
        display: block; /* Ensure it behaves as a block in flex context */
    }

    .card__title {
        font-size: 1.2em; /* Slightly larger title */
        font-weight: 900;
        color: #000;
        text-transform: uppercase;
        margin-bottom: 0; /* Remove bottom margin */
        display: block; /* Ensure it behaves as a block in flex context */
        position: relative;
        overflow: hidden;
    }

    .card__title::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 90%;
        height: 3px;
        background-color: #000;
        transform: translateX(-100%);
        transition: transform 0.3s;
    }

    .card:hover .card__title::after {
        transform: translateX(0);
    }

    .card__content {
        font-size: 17px; /* Slightly larger content text */
        line-height: 1.4;
        color: #000;
        margin-bottom: 25px; /* Increased margin */
        padding: 0 25px; /* Add horizontal padding to content */
    }

    .card__form {
        display: flex;
        flex-direction: column;
        gap: 18px; /* Slightly increased gap */
        padding: 0 25px 25px 25px; /* Add padding to form area */
    }

    /* Adjusted input width for single input fields */
    .card__form input {
        width: calc(100% - 26px); /* Default for single inputs */
    }


    .card__form input:focus {
        outline: none;
        transform: scale(1.02); /* Adjusted scale slightly for smoother transition */
        background-color: #000;
        color: #ffffff;
    }

    .card__button {
        border: 3px solid #000;
        background: #000;
        color: #fff;
        padding: 12px; /* Slightly increased padding */
        font-size: 19px; /* Slightly larger button text */
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform 0.3s; /* Kept for general button transition, though no scale on active */
        width: 100%; /* Make button full width */
        min-height: 48px; /* Added min-height to prevent size changes */
        display: flex; /* Use flex for centering content including spinner */
        align-items: center;
        justify-content: center;
    }

    .card__button:active {
        transform: none; /* Explicitly remove scale on active to prevent unwanted size change */
    }


    @keyframes glitch {
        0% {
            transform: translate(2px, 2px);
        }
        25% {
            transform: translate(-2px, -2px);
        }
        50% {
            transform: translate(-2px, 2px);
        }
        75% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(2px, 2px);
        }
    }

    .glitch {
        animation: glitch 0.3s infinite;
    }

    /* Styles for message display */
    .message-success {
        color: #28a745; /* Changed to a standard green for success */
        font-weight: bold;
        text-align: center;
        margin-top: 15px; /* Adjusted margin to be a bit tighter */
        font-size: 14px; /* Smaller font size for notification */
        padding: 8px 15px; /* Added padding for a notification feel */
        background-color: #d4edda; /* Light green background */
        border-radius: 5px; /* Slightly rounded corners */
        border: 1px solid #c3e6cb;
    }

    .message-error {
        color: #dc3545; /* Red for error */
        font-weight: bold;
        text-align: center;
        margin-top: 15px; /* Adjusted margin */
        font-size: 14px; /* Smaller font size for notification */
        padding: 8px 15px; /* Added padding for a notification feel */
        background-color: #f8d7da; /* Light red background */
        border-radius: 5px; /* Slightly rounded corners */
        border: 1px solid #f5c6cb;
    }

    /* Ensure form is centered within the immersive */
    .container-center {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f0f0f0; /* Light background for the container */
        padding: 20px;
    }

    /* Removed mobile responsiveness for name fields as only one name field exists now */
  `;

  return (
    <div className="container-center">
      <title>Subscribe Newsletter - INFOSURAJ</title>
      <meta name="description" content="Join the INFOSURAJ newsletter to get the latest updates, exclusive content, and insights directly to your inbox." />
      <style>{customStyles}</style>
      <div className="card">
        {/* Banner at the very top of the card */}
        <img src={BANNER_URL} alt="infosuraj Banner" className="card__banner" />

        <div className="card__header">
          {/* Logo and title side-by-side */}
          <a href="https://infosuraj.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
            <img src={LOGO_URL} alt="infosuraj Logo" className="card__logo" />
          </a>
          <span className="card__title">Newsletter</span>
        </div>
        
        <p className="card__content">
          Get existential crisis delivered straight to your inbox every week.
        </p>
        <form className="card__form" onSubmit={handleSubmit}>
          {/* Only First Name input */}
          <input
            required
            type="text"
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {/* Email Input below the name field */}
          <input
            required
            type="email"
            id="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <button type="submit" className="card__button" disabled={isLoading}>
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: 'white' }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Click me'
            )}
          </button>
        </form>

        {/* Message display area */}
        {messageText && (
          <p
            className={messageStatus === 'success' ? 'message-success' : 'message-error'}
          >
            {messageText}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscribeForm;
