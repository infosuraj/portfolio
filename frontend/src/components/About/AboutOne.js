import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import MagneticButton from '../Miscellaneous/MagneticButton';
import Preloader from '../Miscellaneous/Preloader';
import { useProfile } from '../../context/profileContext';

gsap.registerPlugin(ScrollTrigger);

const AboutOne = () => {
    const { profile, loader } = useProfile();

    const defaultData = {
        title: "Helping brands achieve digital mastery of creative innovation and strategi planning.",
        subTitle: "Transforming ideas into digital realities by blending strategic insights with innovative design, helping brands thrive in a rapidly evolving digital landscape.",
        buttonText: "About Me",
        buttonLink: "/about"
    };

    const [data, setData] = useState(defaultData);

    useEffect(() => {
        if (profile) {
            setData({
                title: profile.services?.[0]?.title,
                subTitle: profile.services?.[0]?.subtitle,
            });
        }
    }, [profile]);

    useEffect(() => {
        if (loader) return;

        const animationTimeout = setTimeout(() => {
            const splitElements = document.querySelectorAll(".reveal-text");

            if (splitElements.length === 0) return;

            splitElements.forEach((element) => {
                const text = new SplitType(element, { types: 'words, chars' });

                gsap.fromTo(
                    text.chars,
                    { color: "#B6BCC6" },
                    {
                        color: "#030712",
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 85%',
                            end: 'top 20%',
                            scrub: true,
                        },
                        stagger: 0.05,
                    }
                );
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(animationTimeout);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [loader, data]);

    if (loader) {
        return <Preloader />;
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="content">
                    <h2 className="title reveal-text mt-0">{data.title}</h2>
                </div>
                <div className="wrapper">
                    <p className="sub-title">{data.subTitle}</p>
                    <MagneticButton
                        href={data.buttonLink}
                        className="btn-outline"
                    >
                        {data.buttonText}
                    </MagneticButton>
                </div>
            </div>
        </div>
    );
};

export default AboutOne;