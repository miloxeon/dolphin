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
			Dolphin — это диаграммы.
		</Headline>
		<Paragraph align='center'>
			Dolphin — это небольшой инструмент, позволяющий вам создавать диаграммы классов UML. Мы используем SVG, чтобы ваши диаграммы выглядели одинаково хорошо и на экране, и при печати.
		</Paragraph>
		<NavButton label='Начать работу'
			path='/create'
			primary={true} />

	</Section>
);

export default HomePage;
