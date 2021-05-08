import React from 'react';
import PropTypes from 'prop-types';

class SongListApp extends React.Component {
  static propTypes = {
    nodeConnected: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div>
        {this.props.nodeConnected ? '✅ ALL GOOD' : '❌ not connected'}
        hey
      </div>
    );
  }
}

export default SongListApp;
