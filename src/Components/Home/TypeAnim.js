import React from 'react';
import Typing from 'react-typing-animation';

const AnimatedTypingComponent = () => (
  <Typing speed={100} loop={true}>
    <span className="animation-text">
      Promoting transparency and accountability.
    </span>
    <Typing.Reset count={1} delay={3000} />
  </Typing>
);

export default AnimatedTypingComponent;
