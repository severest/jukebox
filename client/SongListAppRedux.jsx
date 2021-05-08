import { connect } from 'react-redux';

import SongListApp from './SongListApp';

const mapStateToProps = state => ({
  nodeConnected: state.node.nodeConnected,
});

export default connect(mapStateToProps)(SongListApp);
