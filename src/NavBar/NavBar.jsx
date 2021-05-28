
import style from './NavBar.css';
import {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faBars, faUpload } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import UploadActions from '../Components/UploadTranscript/UploadActions'
import UploadUtils from '../Utilities/UploadUtils'
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
// import SummaryListActions from '../SummaryList/SummaryListActions'

class NavBar extends Component{
  constructor(props){
    super(props);
    this.sendZoomTranscript = UploadUtils.sendZoomTranscript.bind(this)
    this.readFileContent = UploadUtils.readFileContent.bind(this)
    this.sendOtterTranscript = UploadUtils.sendOtterTranscript.bind(this)
    this.setNameOfTranscript = UploadUtils.setNameOfTranscript.bind(this)
    this.readFileAndSend = UploadUtils.readFileAndSend.bind(this)
    this.setParamValues = UploadUtils.setParamValues.bind(this)
  }
  render(){
    const { sidebarOpen, openSidebar } = this.props
    return (
      <nav className={style['navbar']}>
        <div className={style['nav_icon']} onClick={() => openSidebar()}>
        <FontAwesomeIcon size="lg" icon={faBars}  style={{color:'#2568c3'}}/>
        </div>
        <div className={style['navbar__left']}>
        </div>
        <div className={style['navbar__right']}>
        <a href="#!">
          <label><FontAwesomeIcon size="lg" icon={faUpload}  style={{color:'#2568c3'}}/>
          <input className={style['hidden-file-input']} type={'file'} onChange={this.sendZoomTranscript} />
          </label>
          
          </a>
          <a href="#!">
          <FontAwesomeIcon size="lg" icon={faUserAstronaut}  style={{color:'#2568c3'}}/>
          </a>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const { SummaryListReducer = {} } = state;
  // console.log(SummaryListReducer, "<-----------------SummaryListReducer");
  const { clickedText } = SummaryListReducer;
  return {
    clickedText,
  };
};
const mapDispatchToProps = (dispatch) => ({
  sendAndSetTranscriptJSON: bindActionCreators(
    UploadActions.sendAndSetTranscriptJSON,
    dispatch
  ),
  sendTranscriptText: bindActionCreators(
    UploadActions.sendTranscriptText,
    dispatch
  ),
  setFileName: bindActionCreators(
    UploadActions.setFileName,
    dispatch
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
