import React from 'react';
import Auth from '../modules/Auth';
import Editor from './Editor.jsx';

import Toast from 'grommet/components/Toast';
import Box from 'grommet/components/Box';

class Create extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      isNotificationVisible: !Auth.isUserAuthenticated()
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/dashboard');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       secretData: xhr.response.message
    //     });
    //   }
    // });
    // xhr.send();
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {
          !Auth.isUserAuthenticated() ? (
            <Toast status='warning'>
              Вам нужно зарегистрироваться, чтобы сохранять диаграммы у нас. Тем не менее, вы можете сохранить диаграмму к себе.
            </Toast>
          ) : (
            null
          )
        }
        <Editor diagram={''} />
      </div>
    );
  }

}

export default Create;
