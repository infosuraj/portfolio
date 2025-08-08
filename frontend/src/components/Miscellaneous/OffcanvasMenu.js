import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { menuItems, socialLinks } from "../Header/menuConfig";
import { useProfile } from "../../context/profileContext";
import Preloader from "./Preloader";

const OffcanvasMenu = ({ className = "offcanvas-wrapper" }) => {
  const { profile, loader } = useProfile();
  const location = useLocation(); // Get current URL path
  const [dynamicMenu, setDynamicMenu] = useState(menuItems);
  const [socialMedia, setSocialMedia] = useState(socialLinks);

  useEffect(() => {
    const newMenu = [...menuItems];
    const newSocial = [...socialLinks];
    if (loader) {
      return <Preloader />;
    }
    if (profile?.resume) {
      newMenu.push({
        label: "Resume",
        href: profile?.resume,
        external: true,
        download: true,
      });
    }

    if (Array.isArray(profile?.socials)) {
      profile.socials.forEach((social) => {
        if (social.Name && social.Link) {
          newSocial.push({
            label: social.Name, // Use Name as the label for the social link
            href: social.Link,
            icon: social.Icon, // Use Icon for the social media icon
            external: true, // Assuming social links are external
          });
        }
      });
    }

    setSocialMedia(newSocial);
    setDynamicMenu(newMenu);
  }, [profile, loader]);
  return (
    <div className={className}>
      {/* Navbar Toggler */}
      <div
        className="navbar-toggler"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
      >
        <div className="navbar-header">
          <div className="content">
            <div className="toggler-icon"></div>
            <span className="title">Menu</span>
          </div>
        </div>
      </div>

      {/* Offcanvas */}
      <div className="offcanvas offcanvas-end" id="offcanvasRight">
        <div className="fixed-nav-rounded-div">
          <div className="rounded-div-wrap">
            <div className="rounded-div"></div>
          </div>
        </div>

        {/* Offcanvas Content */}
        <div className="offcanvas-content">
          <div className="offcanvas-navigation">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title mt-0">Navigation</h5>
            </div>

            <hr />

            {/* Navigation Menu */}
            <div className="offcanvas-body">
              <ul className="navbar-nav menu pt-md-4">
                {dynamicMenu.map((item, index) => (
                  <li className="nav-item" key={index}>
                    {item.external ? (
                      <a
                        href={item.href}
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        download={item.download || false}
                      >
                        {item.label}{" "}
                        <span className="item-count">({index + 1})</span>
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        className={`nav-link ${
                          location.pathname === item.href ? "active" : ""
                        }`}
                      >
                        {item.label}{" "}
                        <span className="item-count">({index + 1})</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Offcanvas Social */}
          <div className="offcanvas-social">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title mt-0">Socials</h5>
            </div>

            <hr />

            {/* Socials */}
            <div className="socials offcanvas-body">
              <nav className="nav">
                {socialMedia.map((social, index) => (
                  <a
                    className="nav-link swap-icon"
                    href={social.href}
                    key={index}
                    target="_blank" // Good practice for external links
                    rel="noopener noreferrer" // Security best practice
                    aria-label={`Link to ${social.label}`} // Accessibility improvement
                  >
                    {social.icon ? ( // Check if an icon URL exists
                      <img
                        src={social.icon}
                        alt={`${social.label} icon`}
                        className="social-icon" // Add a class for styling your icons
                        style={{
                          width: "40px",
                          marginRight: "3px",
                        }} // Basic inline style, consider CSS
                      />
                    ) : (
                      // Fallback if no icon is provided (optional)
                      <span>{social.label}</span>
                    )}
                    {/* You can still keep the label next to the icon if you like, or remove it */}
                    {/* If you want the label to show only when there's no icon, you can refactor */}
                    {!social.icon && social.label}{" "}
                    {/* Display label only if no icon */}
                    {/* <i className="icon rotate bi bi-arrow-right-short"></i> If you still want a consistent arrow */}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasMenu;
