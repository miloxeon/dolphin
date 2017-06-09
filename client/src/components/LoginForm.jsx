import React from 'react';
import PropTypes from 'prop-types';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import TextInput from 'grommet/components/TextInput';
import Box from 'grommet/components/Box';
import NavAnchor from './NavAnchor.jsx';

const LoginForm = ({
	onSubmit, 
	onChange,
	errors,
	successMessage,
	user
}) => (
	<Box justify="center"
		align="center"
		pad='large'
		margin='large'
		colorIndex='light-2'
		size="full">
		<Form action="/" onSubmit={onSubmit}>
			<Heading align="center">
				Welcome back!
			</Heading>
			<p>
				Not a member yet?&nbsp;
				<NavAnchor path="/signup">
					Sign up
				</NavAnchor>
			</p>
			<FormFields>
				<FormField label='Email'
					error={errors.email}
					onChange={onChange}
					value={user.email}>
					<TextInput name="email" />
				</FormField>
				<FormField label='Password'
					error={errors.password}
					onChange={onChange}
					value={user.password}>
					<TextInput type="password" name="password" />
				</FormField>
			</FormFields>
			<Footer pad={{"vertical": "medium"}}>
				<Button label='Login'
					type='submit'
					primary/>
			</Footer>
		</Form>
	</Box>
);

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	successMessage: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired
};

export default LoginForm;
