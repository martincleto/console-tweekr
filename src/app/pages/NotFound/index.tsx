import React from 'react';
import { Link } from 'react-router-dom';

import Page from '../Page';

import './styles.less';

const NotFound: React.FC = () => {
  return (
    <Page
      className="page page-404"
      sidebar={
        <nav>
          <Link to="/wall">Wall</Link>
        </nav>
      }
      content={
        <>
          <img src="assets/images/chicken_egg_broken.svg" alt="Not found"></img>
          <p><strong>Oooops! It seems there isn't anything interesting here...</strong></p>
          <p>Don't miss the conversation and go to the <Link to="/wall">Wall</Link>!</p>
        </>
      }
    />
  );
};

export default NotFound;
