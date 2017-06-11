import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';
import Sidebar from 'grommet/components/Sidebar';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Animate from 'grommet/components/Animate';
import Split from 'grommet/components/Split';
import Paragraph from 'grommet/components/Paragraph';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';


class Editor extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      addNodeActive: false,
      node: {
        id: 4,
        name: '',
        position: {
          x: 300,
          y: 300
        },
        attributes: [],
        methods: []
      }
    };
    this.downloadDiagram = this.downloadDiagram.bind(this);
    this.exportDiagram = this.exportDiagram.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleOpenAddElementLayer = this.handleOpenAddElementLayer.bind(this);
    this.handleCloseLayers = this.handleCloseLayers.bind(this);
    this.handleNodeAdd = this.handleNodeAdd.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    // console.log(this.props)
    this.dolphin = require('./editor_src');
    this.dolphin.loadDiagram(this.dolphin.fixtures);
    // let handler = this.handleNodeClick;
    // this.dolphin.diagram.on('clicked', function (e) {
    //   handler(e)
    // })
  }

  handleNodeClick(e) {
    // let child = e.detail.child;
    // console.log(this.dolphin.store)
    // if(child.getType() == 'DiagramNode') {
    //   // this.dolphin.removeElement(this.dolphin.store, child.blueprint.id)
    // } else {
    //   // this.dolphin.removeConnection(this.dolphin.store, child.blueprint.id)
    // }
  }

  componentWillReceiveProps(nextProps) {
    // this.dolphin.loadDiagram(nextProps.diagram);
  }

  loadDiagram(e) {
    e.preventDefault();
  }

  saveDiagram(e) {
    e.preventDefault();
  }

  handleNodeAdd(e) {
    e.preventDefault();

  }

  handleInput(e) {
    switch(e.target.name) {
      case 'attr_scope':
        break;
    }
  }

  handleCloseLayers(e) {
    e.preventDefault();
    this.setState({
      addNodeActive: false
    })
  }

  handleOpenAddElementLayer(e) {
    e.preventDefault();
    this.setState({
      addNodeActive: true
    });
  }

  exportDiagram(e) {
    e.preventDefault();
    this.dolphin.exportDiagram();
  }

  downloadDiagram(e) {
    e.preventDefault();
    this.dolphin.downloadDiagram();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {
          this.state.addNodeActive ? (
            <Layer align='center'
              closer={true}>
              <Box pad="medium">
                <Anchor onClick={this.handleCloseLayers}>Close</Anchor><br />
                <Form onSubmit={this.handleNodeAdd}>
                  <FormField label='Name'>
                    <TextInput name="name" />
                  </FormField>
                  <FormField label='Type'>
                    <TextInput name="type" />
                  </FormField>
                  <Box>
                    Attributes
                    <FormField label='Scope'>
                      <TextInput name="attr_scope" onChange={this.handleInput}/>
                    </FormField>
                    <FormField label='Name'>
                      <TextInput name="attr_name" onChange={this.handleInput}/>
                    </FormField>
                    <FormField label='Type'>
                      <TextInput name="attr_type" onChange={this.handleInput}/>
                    </FormField>
                    <FormField label='Value'>
                      <TextInput name="attr_value" onChange={this.handleInput}/>
                    </FormField>
                  </Box>
                  <Footer pad={{'vertical': 'medium'}}>
                    <Button label='Add'
                      type='submit'
                      primary/>
                  </Footer>
                </Form>
              </Box>
            </Layer>
          ) : null
        }
        <Split flex='right'
          separator={false}>
          <Animate 
          visible={true}
          enter={{"animation": "slide-right", "duration": 300}}
          keep={true}>
            <Sidebar size='small'>
              <Box flex='grow'
                justify='start'>
                <Menu primary>
                  {Auth.isUserAuthenticated() ? (
                    <Anchor href='#' onClick={this.saveDiagram}>
                      Сохранить
                    </Anchor>
                  ) : (
                    null
                  )}
                  <Anchor href='#' onClick={this.loadDiagram}>
                    Открыть
                  </Anchor>
                  <Anchor href='#' onClick={this.exportDiagram}>
                    Экспорт в SVG
                  </Anchor>
                  <Anchor href='#' onClick={this.downloadDiagram}>
                    Скачать
                  </Anchor>
                </Menu>
                <Box pad="small">
                  <Paragraph>
                    Добавить элемент:&nbsp;
                    <Anchor onClick={this.handleOpenAddElementLayer}>
                      Нажмите сюда
                    </Anchor>
                    <br />
                    Удалить элемент: Alt + мышь<br />
                    <br />
                    Соединение: Ctrl + потянуть<br />
                    Разорвать: Alt + мышь<br />
                  </Paragraph>
                </Box>
              </Box>
            </Sidebar>
          </Animate>
          <Box justify='center'
            align='center'>
            <div id="diagram"></div>
          </Box>
        </Split>
      </div>
    );
  }
}

Editor.propTypes = {
  diagram: PropTypes.string.isRequired
};

export default Editor;
