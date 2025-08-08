import React, {useState, useEffect} from 'react';
import { useProfile } from '../../context/profileContext';
import Preloader from '../Miscellaneous/Preloader';
const FAQ = () => {
  const { profile, loading } = useProfile();
  const [faqData, setFaqData] = useState([]);
  useEffect(() => {
    if (profile && profile.faqs) {
      setFaqData(profile.faqs);
    }
  }, [profile]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <section className="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="intro">
              <h3 className="title">Frequently Asked Questions</h3>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-10">
            <div className="accordion accordion-flush" id="infosuraj-accordion">
              {faqData.map((faq, index) => (
                <div className="accordion-item" key={index}>
                  <h4 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index + 1}`}
                    >
                      {faq.question}
                    </button>
                  </h4>
                  <div
                    id={`collapse${index + 1}`}
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    data-bs-parent="#infosuraj-accordion"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
