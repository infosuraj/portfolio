import React from 'react';

const BreadcrumbTwo = ({ title = "Showcasing innovation", subheading = "and expertise" }) => {
  return (
    <section id="home" className="breadcrumb-section">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12">
            <div className="content w-60">
              <h1 className="title">{title}</h1>
              <div className="flex ms-auto">
                <span className="line animate-line"></span>
                <h1 className="title">{subheading}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbTwo;
