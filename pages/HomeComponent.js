import React from 'react';

export function HomeComponent() {
  return React.createElement(
    'section',
    { className: 'content-section text-center' },
    [
      React.createElement(
        'h1',
        { className: 'text-5xl font-bold mb-6', key: 'title' },
        'Welcome to the HHD Study Hub!'
      ),
      React.createElement(
        'p',
        { className: 'text-xl mb-8', key: 'tagline' },
        'Your central resource for VCE Health and Human Development.'
      ),
      React.createElement('img', {
        key: 'img',
        src: 'https://placehold.co/800x400/1e293b/e2e8f0?text=HHD+Concept+Image',
        alt: 'HHD Concept Image',
        className: 'mx-auto rounded-lg shadow-lg mb-8',
        onError: (e) => {
          e.target.src =
            'https://placehold.co/800x400/1e293b/e2e8f0?text=Image+Not+Available';
          e.target.alt = 'Image Not Available';
        }
      }),
      React.createElement(
        'p',
        { className: 'mb-4', key: 'intro1' },
        'This website is designed to help you navigate the complexities of the VCE HHD curriculum, starting with Unit 3 and expanding to Unit 4.'
      ),
      React.createElement(
        'p',
        { key: 'intro2' },
        'Explore key knowledge, practice skills, and prepare for your assessments with our curated content.'
      ),
      React.createElement(
        'div',
        { className: 'mt-10', key: 'button-container' },
        React.createElement(
          'a',
          { href: '#unit3', className: 'button-style' },
          'Explore Unit 3'
        )
      )
    ]
  );
}
