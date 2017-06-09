import React from 'react';
import {Link} from 'react-router';

import Headline from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import NavButton from './NavButton.jsx';

const HomePage = () => (
	<Section align='center'>
		<Headline>
			Dolphin is diagrams.
		</Headline>
		<Paragraph align='center'>
			Dolphin is tiny tool which allows you to create awesome UML Class diagrams. We utilize SVG to make your diagrams look perfect on both screen and print.  
		</Paragraph>
		<NavButton label='Get started'
			path='/create'
			primary={true} />

	</Section>
);

export default HomePage;
