import React from 'react';

const BreadcrumbThree = () => {
  const breadcrumbContent = {
    title1: "Let's talk!",
    title2: "design"
  };

  return (
    <section id="home" className="breadcrumb-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Breadcrumb Content */}
            <div className="breadcrumb-content">
              <div className="flex">
                <h1 className="title">{breadcrumbContent.title1}</h1>
                <span className="line animate-line"></span>
                <h1 className="title">{breadcrumbContent.title2}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbThree;
