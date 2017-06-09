import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import TextInput from 'grommet/components/TextInput';
import Box from 'grommet/components/Box';

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
        Hello there!
      </Heading>
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
        <Button label='Submit'
          type='submit'
          primary={true}/>
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
