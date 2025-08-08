import React from 'react';
import SkillsSection from './SkillsSection';
import AwardsTwo from '../Awards/AwardsTwo';

const Skills = () => {
  return (
    <section className="awards skills sticky primary-bg">
      <div className="container">
        {/* Skills Section */}
        <SkillsSection />

        <hr />

        {/* Awards Section */}
        <AwardsTwo />
      </div>
    </section>
  );
};

export default Skills;
