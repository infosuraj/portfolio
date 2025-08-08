import React, {useState, useEffect} from 'react';
import { useProfile } from '../../context/profileContext';
import Preloader from '../Miscellaneous/Preloader';

const Services = () => {
    const { profile, loader } = useProfile();
    const [services, setServices] = useState([]);
    useEffect(() => {
        if (loader) return <Preloader />;
        if (profile && profile.services && profile.services.length > 0) {
            setServices(profile.services[0].serviceItem || []);
        }
    }, [profile, loader]);
    return (
        <div className="row service-wrapper items mt-md-5">
            {services.map((service, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                    <div className="item d-flex align-items-start">
                        <div className="item-count">0{index+1}</div>
                        <div className="content">
                            <h4 className="mt-0">{service.title}</h4>
                            <p>{service.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Services;
