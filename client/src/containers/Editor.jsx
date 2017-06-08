import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';


class Editor extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.handleDownload = this.handleDownload.bind(this);
    this.handleExport = this.handleExport.bind(this);
  }

  handleDownload () {
    this.dolphin.downloadDiagram();
  }

  handleExport () {
    this.dolphin.exportDiagram();
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    // console.log(this.props)
    this.dolphin = require('./editor_src');
  }

  componentWillReceiveProps(nextProps) {
    this.dolphin.loadDiagram(nextProps.diagram);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <RaisedButton label="Download diagram" onClick={this.handleDownload} primary />
        <RaisedButton label="Export diagram" onClick={this.handleExport} primary />
        <div id="diagram"></div>
      </div>
    );
  }

}

Editor.propTypes = {
  diagram: PropTypes.string.isRequired
};

export default Editor;
