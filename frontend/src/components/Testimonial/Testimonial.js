import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { transformImageKitUrl } from '../../utils/ImageKitUrlModify'; // Import the utility function

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    axios
      .get(`${baseUrl}/testimonials`)
      .then((response) => {
        const processedTestimonials = response.data.map(testimonial => {
          return {
            ...testimonial,
            image: testimonial.image || '/img/client-1.jpg'
          };
        });
        setTestimonials(processedTestimonials);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Testimonials data:", err);
        setError("Failed to load Testimonials");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && !error && testimonials.length > 0 && typeof window.Swiper !== 'undefined') {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }

      swiperRef.current = new window.Swiper('.swiper-container', {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
        slidesPerView: 1, // Still showing one slide at a time
        centeredSlides: true, // Keeping the active slide centered
        spaceBetween: 0, // No space between slides, handled by container padding
        // You can add breakpoints here for responsive padding if needed,
        // but the content max-width will handle the internal sizing.
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: "fraction",
        },
        on: {
          init: function () {
            const activeSlide = this.slides[this.activeIndex];
            const activeImg = activeSlide?.querySelector('.testimonial-thumb img');
            if (activeImg) {
              activeImg.classList.add('animated', 'zoomIn');
              activeImg.style.opacity = '1';
            }
          },
          slideChangeTransitionStart: function () {
            const prevSlide = this.slides[this.previousIndex];
            const prevImg = prevSlide?.querySelector('.testimonial-thumb img');
            if (prevImg) {
              prevImg.classList.remove('animated', 'zoomIn');
              prevImg.style.opacity = '0';
            }
          },
          slideChangeTransitionEnd: function () {
            const activeSlide = this.slides[this.activeIndex];
            const activeImg = activeSlide?.querySelector('.testimonial-thumb img');
            if (activeImg) {
              activeImg.classList.add('animated', 'zoomIn');
              activeImg.style.opacity = '1';
            }
          }
        }
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [loading, error, testimonials]);

  if (loading) {
    return <div className="text-center p-3">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-danger p-3">{error}</div>;
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="container-fluid">
      <div className="row testimonials justify-content-center">
        <div className="col-12">
          <div className="swiper-container slider-min items"
               style={{
                 paddingLeft: '10%', // Adjust these values as before
                 paddingRight: '10%',
                 overflow: 'hidden'
               }}>
            <div className="swiper-wrapper">
              {testimonials.map((testimonial) => (
                <div className="swiper-slide item" key={testimonial._id}>
                  {/* NEW: Content Wrapper Div */}
                  <div className="testimonial-content-wrapper mx-auto"
                       style={{ maxWidth: '700px', width: '90%' /* Adjust these values */ }}>
                    <div className="testimonial text-center border rounded-5 p-4 p-md-0">
                      <div className="testimonial-meta">
                        <div className="testimonial-thumb">
                          <img
                            className="rounded-circle"
                            src={transformImageKitUrl(testimonial.image, {width: 800, crop: true, quality: 80, format: "auto"})}
                            alt={testimonial.name}
                            style={{ opacity: 0 }}
                          />
                        </div>
                        <h5 className="client-name mt-3 mb-1">{testimonial.name}</h5>
                        <span className="client-position">{testimonial.position}</span>
                      </div>
                      <div className="testimonial-content mt-4">
                        <p>{testimonial.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;