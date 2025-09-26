import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const UnsubscribeForm = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [messageStatus, setMessageStatus] = useState(null); // 'success' or 'error'
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Define your logo and banner URLs here for consistency
  const LOGO_URL = "https://ik.imagekit.io/upzxi2yzb/tr:w-800,q-100,fo-auto/profile/Asset_4_ucSXtHMrz.svg";
  const BANNER_URL = "https://ik.imagekit.io/upzxi2yzb/tr:w-800,q-100,fo-auto/Mail%20Subscribe%20Assets/email-banner.png";
  const WEBSITE_URL = "https://infosuraj.com/";

  // useEffect to read email from URL query parameter (common for unsubscribe links)
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

  // Handle changes to form input field
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };

  // Function to display messages to the user
  const displayMessage = (type, text) => {
    setMessageStatus(type);
    setMessageText(text);
    // Clear message after 5 seconds
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
      const response = await fetch(`${baseUrl}/email/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();

      if (response.ok) {
        displayMessage('success', result.message || 'You have been unsubscribed successfully!');
        // Optionally clear email field after successful unsubscribe
        setFormData({
          email: '',
        });
      } else {
        displayMessage('error', result.message || 'Unsubscribe failed. Please try again.');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      displayMessage('error', 'Failed to unsubscribe. Please check your network and try again.');
    } finally {
      setIsLoading(false); // Always set loading state to false
    }
  };

  // The custom CSS for the card, embedded directly
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

    .card__form input {
        padding: 12px; /* Slightly increased padding */
        border: 3px solid #000;
        font-size: 17px; /* Slightly larger input text */
        font-family: inherit;
        transition: transform 0.3s;
        width: calc(100% - 26px); /* Adjust for padding and border */
    }

    .card__form input:focus {
        outline: none;
        transform: scale(1.03); /* Slight adjustment to scale */
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
        position: relative;
        overflow: hidden;
        transition: transform 0.3s;
        width: 100%; /* Make button full width */
        height: auto; /* Adjust height dynamically based on content */
        display: flex; /* Use flex for centering content including spinner */
        align-items: center;
        justify-content: center;
    }

    .card__button::before {
        content: "Sure?";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 105%;
        background-color:rgb(214, 65, 65);
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(100%);
        transition: transform 0.3s;
    }

    .card__button:hover::before {
        transform: translateY(0);
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
        color: #007bff; /* Use brand color for success */
        font-weight: bold;
        text-align: center;
        margin-top: 20px; /* Adjusted margin */
    }

    .message-error {
        color: #dc3545; /* Red for error */
        font-weight: bold;
        text-align: center;
        margin-top: 20px; /* Adjusted margin */
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
  `;

  return (
    <>
    <Helmet>
      <title>Unsubscribe Newsletter - INFOSURAJ</title>
      <meta name="description" content="Manage your newsletter subscription preferences. Unsubscribe from future emails from INFOSURAJ." />
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <div className="container-center">
      <style>{customStyles}</style>
      <div className="card">
        {/* Banner at the very top of the card */}
        <img src={BANNER_URL} alt="infosuraj Banner" className="card__banner" />

        <div className="card__header">
          {/* Logo centered and clickable */}
          <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
            <img src={LOGO_URL} alt="infosuraj Logo" className="card__logo" />
          </a>
          <span className="card__title">Unsubscribe</span>
        </div>
        
        <p className="card__content">
          We're sorry to see you go. Please enter your email to unsubscribe from our newsletter.
        </p>
        <form className="card__form" onSubmit={handleSubmit}>
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
              'Unsubscribe'
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
    </>
  );
};

export default UnsubscribeForm;
