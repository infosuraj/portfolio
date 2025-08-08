import React from 'react';
import { useState, useEffect } from 'react';
import { useProfile } from '../../context/profileContext';
import Preloader from '../Miscellaneous/Preloader';
import { transformImageKitUrl } from '../../utils/ImageKitUrlModify'; // Import the utility function

const BreadcrumbOne = () => {
  const { profile, loading } = useProfile();
  const [breadcrumbContent, setBreadcrumbContent] = useState({
    title: "Crafting",
    subtitle: "I transform ideas into impactful digital experiences, delivering innovative solutions that elevate brands and captivate audiences around the world.",
    imageSrc: "/img/photographer.jpg",
    subheading: "timeless stories."
  })
  useEffect(() => {
    if (profile) {
      setBreadcrumbContent({
        title: profile?.breadcrumb?.[0]?.title || "Crafting",
        subtitle: profile?.breadcrumb?.[0]?.subtitle || "I transform ideas into impactful digital experiences, delivering innovative solutions that elevate brands and captivate audiences around the world.",
        imageSrc: profile?.profileImage || "/img/photographer.jpg",
        subheading: profile?.breadcrumb?.[0]?.subheading || "timeless stories."
      });
    }
  }, [profile]);

  if (loading) {
    return <Preloader />;
  }
  return (
    <section id="home" className="breadcrumb-section">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12">
            <div className="content d-flex flex-column justify-content-between">
              <div className="heading w-60">
                <h1 className="title">
                  {breadcrumbContent.title} <img src={transformImageKitUrl(breadcrumbContent.imageSrc, {width: 800, crop: true, quality: 80, format: "auto"})} alt="Photographer" />
                </h1>
                <div className="flex ms-auto">
                  <span className="line animate-line my-3 my-md-0"></span>
                  <h1 className="title">{breadcrumbContent.subheading}</h1>
                </div>
              </div>
              <p className="sub-title w-50 mt-4 ms-auto">
                {breadcrumbContent.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbOne;
