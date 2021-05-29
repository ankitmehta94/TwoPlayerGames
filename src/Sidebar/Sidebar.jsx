
import style from './Sidebar.css';
import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from '../Assets/brelogo.svg'
import SidebarActions from './SidebarActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from '../Utilities/classNameUtil'
const { updateSummaryKey } = SidebarActions
  class MeetingLink extends Component {
    onClick = () => {
      const {name, onMeetinClick, disable} = this.props;
      if(!disable)
        onMeetinClick(name)
     
    }
render(){
  const {name, active} = this.props;
  let activeClass = '';
  if(active){
    activeClass = 'active_menu_link'
  }
  return (
    <div className={classNames([style["sidebar__link"],style[activeClass]])}>
    <i className="fa fa-home"></i>
    <a href="#" onClick={this.onClick}>{name}</a>
  </div>
  )
}
}


class Sidebar extends Component {
  createMeetingList = () => {
    const { SummaryListObject, SummaryKey, updateSummaryKey, clickedText } = this.props;
    // const SumObj = SummaryListObject[SummaryKey].summaries
    const disable = clickedText?true:false
    const htmlArray =  Object.keys(SummaryListObject).map((sumKey, sumIndex) => {
      const active = SummaryKey === sumKey
      return <MeetingLink key={sumKey} name={sumKey} active={active} onMeetinClick={updateSummaryKey} disable={disable}/>
    });
    return (<Fragment>{htmlArray}</Fragment>)
  }
  render(){
    const Meetings = this.createMeetingList()
    const responsiveClass = this.props.sidebarOpen?'sidebar_responsive':''
    return (
      <div className={classNames([style[responsiveClass],style["sidebar"]])} >
        <div className={style['sidebar__title']}>
          <div className={style['sidebar__img']}>
            <img className={style['sidebar__logo']} src={logo} alt="logo" />
            <h1>Breviz</h1>
            <div></div>
            <div className={style['sidebar_cross']}>  <FontAwesomeIcon size="lg" icon={faTimes}  style={{color:'#2568c3'}} onClick={this.props.closeSidebar}/></div>
          </div>
        </div>
  
        <div className={style["sidebar__menu"]}>
      {Meetings}
        </div>
      </div>)
  }
}

const mapStateToProps = (state) => {
  const { SummaryListReducer = {} } = state;
  const {SummaryListObject, SummaryKey, clickedText} = SummaryListReducer
  return {
    SummaryListObject: SummaryListObject,
    SummaryKey: SummaryKey,
    clickedText: clickedText,

  }
};
const mapDispatchToProps = (dispatch) => ({
  updateSummaryKey: bindActionCreators(updateSummaryKey, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

