import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

import { Header } from './Header';
import List from './List';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @media screen and ( min-width :1025px){
	.main-container{
	  max-width:1200px;
	  margin:0 auto;
  	}
  }
  /* other styles */
`;

const App = () => (
	<React.Fragment>
		<GlobalStyle />
		<main id='main' className='main-container'>
			<Header />
			<List />
		</main>
	</React.Fragment>
);

export default App;
