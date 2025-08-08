import React, { useEffect, useState } from 'react';
import SubscribeFooter from './subscribeFooter';
import { useProfile } from '../../context/profileContext';
import { menuItems, socialLinks, resourceLinks } from "../Header/menuConfig";
import { transformImageKitUrl } from '../../utils/ImageKitUrlModify'; // Import the utility function

const Footer = ({
  className = "footer-area",
  copyrightYear = "©2025 ",
  linkText = "Infosuraj",
  linkUrl = "https://infosuraj.com/about",
  copyrightText = ", All Rights Reserved.",
  scrollToTopText = "Scroll to Top",
  scrollToTopTarget = "#",
  defaultLogoSrc = "/assets/logo.png",
}) => {
  const { profile } = useProfile();

  const [dynamicMenuItems, setDynamicMenuItems] = useState(menuItems);
  const [dynamicSocialLinks, setDynamicSocialLinks] = useState(socialLinks);
  const [dynamicResourceLinks, setDynamicResourceLinks] = useState(resourceLinks);
  const [footerDisplayLogoSrc, setFooterDisplayLogoSrc] = useState(defaultLogoSrc);

  useEffect(() => {
    const chosenLogo =
      transformImageKitUrl(profile?.logoDark, {width: 800, quality: 80, format: "auto"}) ||
      defaultLogoSrc;
    setFooterDisplayLogoSrc(chosenLogo);

    const newMenu = [...menuItems];
    const newResource = [...resourceLinks];
    if (profile?.resume) {
      newResource.push({
        label: "Resume",
        href: profile?.resume,
        external: true,
        download: true,
      });
    }

    const newSocial = [...socialLinks];
    if (Array.isArray(profile?.socials) && profile.socials.length > 0) {
      profile.socials.forEach((social) => {
        if (social.Name && social.Link) {
          newSocial.push({
            name: social.Name,
            url: social.Link,
            icon: social.Icon || `fab fa-${social.Name.toLowerCase()}`
          });
        }
      });
      setDynamicSocialLinks(newSocial);
    } else {
      setDynamicSocialLinks([socialLinks]);
    }
    setDynamicMenuItems(newMenu)
    setDynamicResourceLinks(newResource);

  }, [profile, defaultLogoSrc]);


  const handleClick = (e, href, external = false, download = false) => {
    if (external || download) {
      return;
    }
    e.preventDefault();
    window.location.href = href;
  };

  const handleScrollToTop = (event) => {
    event.preventDefault();
    window.location.href = scrollToTopTarget;
  };


  return (
    <footer className={`${className}`}>
      <div className="container">
        <div className="row py-5">
          {/* Part 1: Logo & Newsletter */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 d-flex flex-column footer-col-logo-newsletter">
            <div className="footer-logo-wrapper">
              <img
                src={footerDisplayLogoSrc}
                alt="Logo"
                className="footer-logo-img"
              />
            </div>
            <p className="mt-3 subscribe-text">Subscribe to our newsletter</p>
            <SubscribeFooter />
          </div>

          {/* Part 2: Follow Us */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 list-unstyled resource-links-list" style={{ paddingLeft: "40px" }}>
            <h5 className="mb-3">Follow Us</h5>
            <div className="social-links d-flex">
              {dynamicSocialLinks.map((social, index) => (
                <a
                  key={social.id || social.url || index}
                  href={social.url}
                  className="me-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                >
                  {social.icon && social.icon.startsWith('fab fa-') ? (
                    <i className={social.icon}></i>
                  ) : social.icon ? (
                    <img
                      src={social.icon}
                      alt={`${social.name} icon`}
                      className="social-icon"
                      style={{ maxWidth: "100px"}}
                    />
                  ) : (
                    <span>{social.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Part 3: Quick Links */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5 className="mb-3 list-unstyled resource-links-list">Quick Links</h5>
            <ul className="list-unstyled quick-links-list"> {/* Added quick-links-list */}
              {dynamicMenuItems.map((item, index) => (
                <li key={item.id || item.href || index}>
                  {item.external || item.download ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={item.download || false}
                      className="smooth-anchor"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="smooth-anchor"
                      onClick={(e) => handleClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Part 4: Blogs & Help Resources */}
          <div className="col-12 col-md-3">
            <h5 className="mb-3 list-unstyled resource-links-list">Resources</h5>
            <ul className="list-unstyled resource-links-list"> {/* Added resource-links-list */}
              {dynamicResourceLinks.map((item, index) => (
                <li key={item.id || item.href || index}>
                  {item.external || item.download ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={item.download || false}
                      className="nav-link"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="smooth-anchor"
                      onClick={(e) => handleClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="row">
          <div className="col-12">
            <div className="footer-content d-flex flex-wrap justify-content-center justify-content-md-between align-items-center py-3 border-top">
              <div className="copyright">
                {copyrightYear} <a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</a> {copyrightText}
              </div>
              <div id="scroll-to-top" className="scroll-to-top mt-3 mt-sm-0">
                <a href={scrollToTopTarget} onClick={handleScrollToTop} className="smooth-anchor">
                  {scrollToTopText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-area {
          padding-top: 50px;
          padding-bottom: 30px;
        }

        .footer-area h5 {
          margin-bottom: 25px;
          font-weight: 600;
        }

        .footer-area p {
          line-height: 1.6;
          font-size: 0.95em;
        }

        .footer-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          padding: 5px;
          border-radius: 50%;
          background-color: rgb(233, 233, 233);
          border: 1px solid rgb(233, 233, 233);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          margin-bottom: 15px;
          flex-shrink: 0;
        }

        .footer-logo-img {
          max-width: 98%;
          max-height: 98%;
          height: auto;
          object-fit: contain;
        }

        .subscribe-text {
          margin-bottom: 15px;
          font-size: 0.95em;
        }

        /* Adjustments for Logo/SubscribeFooter alignment on left */
        .col-md-3.d-flex {
            align-items: flex-start; /* Keep default Bootstrap behavior */
        }
        .col-md-3 .subscribe-footer-wrapper-container {
            width: 100%;
            max-width: 300px;
            align-items: flex-start;
            margin-left: 0;
        }
        .col-md-3 .input-wrapper {
            width: 100%;
            max-width: unset;
        }

        /* Quick Links and Resources styling */
        .list-unstyled {
            padding-left: 0;
        }
        .list-unstyled li {
          margin-bottom: 8px;
        }
        .list-unstyled a {
          text-decoration: none;
          color: inherit;
          transition: color 0.3s ease;
        }


        /* Social Links styling */
        .social-links a {
          font-size: 1.5em;
          transition: 0.3s ease, transform 0.3s ease;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
        }
        .social-links a:hover {
          transform: translateY(-3px);
        }
        .social-links .social-icon {
          width: 28px;
          height: 28px;
        }

        /* Copyright and Scroll to Top */
        .footer-content {
          padding-top: 20px;
          font-size: 0.9em;
        }
        .footer-content .copyright a {
          text-decoration: none;
          font-weight: 500;
          color: inherit;
        }
        .footer-content .copyright a:hover {
          text-decoration: underline;
        }
        .scroll-to-top a {
          text-decoration: none;
          transition: color 0.3s ease;
          color: inherit;
        }

        /* Responsive adjustments for mobile (max-width: 767px) */
        @media (max-width: 991px) {
          /* Ensure columns stack and take full width */
          .col-12 {
            margin-bottom: 25px;
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          /* General column styling for mobile - align items to center for common elements */
          /* Note: We will specifically override for lists below */
          .col-12.col-md-3 {
            display: flex;
            flex-direction: column;
            align-items: center; /* Center items like h5, social links, logo */
            text-align: center;  /* Center text that is not a list item */
          }

          /* Specific centering for the logo and subscribe section */
          .footer-col-logo-newsletter .footer-logo-wrapper {
            margin-left: auto;
            margin-right: auto;
          }

          .footer-col-logo-newsletter .subscribe-text {
            text-align: center;
          }

          .footer-col-logo-newsletter .subscribe-footer-wrapper-container {
            align-items: center;
            margin-left: auto;
            margin-right: auto;
          }

          /* Centering for social links */
          .social-links {
            justify-content: center;
            padding-left: 0;
          }

          /* --- Specific Overrides for Quick Links and Resources to keep them left-aligned --- */
          .quick-links-list,
          .resource-links-list {
            /* Override the text-align: center from parent column */
            text-align: left;
            /* If the parent column has align-items: center affecting ul, revert it here */
            align-self: flex-start; /* Aligns the ul to the start of its flex parent (the column) */
            padding-left: 0; /* Keep padding-left 0 as list-unstyled already does this */
          }

          .quick-links-list li,
          .resource-links-list li {
            text-align: left; /* Ensure individual list items are left-aligned */
          }

          /* Make copyright and scroll to top stack vertically and center */
          .footer-content {
            flex-direction: column; /* Stack items vertically */
            justify-content: center; /* Center items horizontally */
            align-items: center; /* Center items horizontally */
          }

          .footer-content .copyright,
          .footer-content .scroll-to-top {
            width: 100%; /* Take full width to ensure stacking */
            text-align: center; /* Center the text */
            margin-top: 0; /* Reset any potential top margin */
            margin-bottom: 0; /* Reset any potential bottom margin */
          }

          /* Add specific spacing for scroll-to-top on mobile */
          .footer-content .scroll-to-top {
            margin-top: 15px; /* Space from copyright text */
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;