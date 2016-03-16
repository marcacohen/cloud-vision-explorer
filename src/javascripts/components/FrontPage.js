import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToolboxApp from 'react-toolbox/lib/app'
import ImageView from './ImageView'
import RenderView from './RenderView'
import InfoLink from './InfoLink'
import ClusterLabel from './ClusterLabel'
import Sidebar from './Sidebar'
import Button from 'react-toolbox/lib/button'
import _ from 'lodash'
import * as sidebarActionCreators from '../actions/sidebar'
import 'stylesheets/main'
import 'stylesheets/FrontPage'
import {EventEmitter} from 'fbemitter'

const emitter = new EventEmitter()

const style = {
  infoLink: {
    position: 'absolute',
    top: '12vh',
    left: '2vh',
    width: '20vh'
  },
  clusterLabel: {
    position: 'absolute',
    bottom: '1vh',
    left: '2vh',
  }
}

class FrontPage extends Component {
  static get propTypes() {
    return {
      sidebar: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired
    }
  }

  render() {
    const { sidebar, dispatch } = this.props
    const sidebarBounds = bindActionCreators(sidebarActionCreators, dispatch)

    return (
      <div >
        <ToolboxApp>
          <ClusterLabel style={style.clusterLabel} emitter={emitter} />
          <InfoLink style={style.infoLink} emitter={emitter} />
          <ImageView emitter={emitter} />
          <Sidebar sidebar={sidebar} emitter={emitter} {...sidebarBounds} />
          <RenderView emitter={emitter} />
        </ToolboxApp>        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { sidebar: state.sidebar }
}
export default connect(mapStateToProps)(FrontPage)
