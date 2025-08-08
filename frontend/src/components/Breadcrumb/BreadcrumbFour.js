import React from 'react';

const BreadcrumbFour = () => {
  const breadcrumbContent = {
    title: "Latest Insights",
  };

  return (
    <section id="home" className="breadcrumb-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Breadcrumb Content */}
            <div className="breadcrumb-content">
              <div className="flex">
                <h1 className="title">{breadcrumbContent.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbFour;
