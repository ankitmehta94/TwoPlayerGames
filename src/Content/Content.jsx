import style from "./Content.css";
import { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import SummaryList from "../Components/SummaryList/SummaryList.jsx";
import EditSummary from "../Components/EditSummary/EditSummary.jsx";
import { bindActionCreators } from "redux";
import {ANIMATION_DURATION} from '../Constants/configConstants';
import CreationLoader from '../Components/CreationLoader/CreationLoader'
import SummaryListActions from '../Components/SummaryList/SummaryListActions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const setContent = (MainComponent, props) => {
  class Main extends Component {
    render() {
      return <MainComponent {...props} />;
    }
  }
  return Main;
};
class NoComponent extends Component {
  render() {
    return null;
  }
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   
const contentDictionary = {
  summaryList: SummaryList,
  editSummary: EditSummary,
  emptyComponent: NoComponent,
  creationLoader: CreationLoader
};
class Content extends Component {
  constructor(props){
    super(props)
    const {creationLoader} = props;
    this.state = {
      incomingComponent: NoComponent,
      mainContent: creationLoader?contentDictionary['creationLoader']:contentDictionary['summaryList'],
      titleText: "SUMMARIES",
      contentProps: {},
      prevComponent: 'emptyComponent',
      mainVisible: true,
      incomingVisible: false,
    };
    console.log(this.state.mainContent,'<-----------------this.state.mainContent',creationLoader)
  }
  componentDidMount(){
    this.getSummaryObject()
 
  }
  fireErrorSwal = async() => {
   
      MySwal.fire({
        title: <h1>Model Under Maintainance</h1>,
        confirmButtonText:
      'Go to our Demo Page',
      }).then(() => {
        const { history } = this.props
        history.push(`/id:dummySummary`)
      })
  }
  getSummaryObject = async() => {
    const { location, getSummaryObject } = this.props
    const {pathname} = location;
    await getSummaryObject(pathname);
  }
  
  componentDidUpdate(prevProps){
  const {creationLoader, error, location} = this.props;
  console.log(creationLoader,'<-----------------creationLoader')
    if(creationLoader && creationLoader !== prevProps.creationLoader){
      console.log('***************************************')
      this.changeMainContent('creationLoader',{})
    }
    if(!creationLoader && creationLoader !== prevProps.creationLoader){
      console.log('***************************************')
      this.changeMainContent('summaryList',{})
    }
    
    if(error && error !== prevProps.error){
      this.fireErrorSwal()
    }
    const { pathname } = location;
    console.log(pathname, location)
    const specificCondition = pathname.indexOf(`id:dummySummary`) > -1
    if(pathname && pathname !== prevProps.location.pathname && specificCondition){
      this.getSummaryObject()
    }
}
  changeMainContent = async(contentId, contentProps) => {
    console.log(contentId, contentProps);
    const prevComponent = this.state.mainContent
    let mainContent = null
    // const incomingComponent = setContent(incomingComponent,{})
    // await sleep(ANIMATION_DURATION)
    // mainContent = setContent(contentDictionary[this.state.prevComponent], {...contentProps,changeContent:this.changeMainContent, isVisible:false });
    // this.setState({
     
    //   mainContent: mainContent,
    //   mainVisible: false,
    //   // prevComponent: contentId,
    // })
    mainContent = setContent(contentDictionary[contentId], {...contentProps,changeContent:this.changeMainContent, isVisible:true });
    this.setState({
      titleText: contentProps.titleText,
      // incomingComponent: NoComponent,
      mainContent: mainContent,
      mainVisible: true,
    });
    // await sleep(ANIMATION_DURATION)
    // this.setState({
    //   mainVisible: true,
    // });
}
  navigateTo = () => {};
  render() {
    const {mainContent, mainVisible} = this.state
    const ContentComponent = mainContent;
    console.log(mainVisible,'mainVisible')
    return (
      <main className={style['mainDiv']}>
        <div className={style["main_container"]}>
          <ContentComponent
            changeContent={this.changeMainContent}
            // isVisible={this.state.mainVisible}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { SummaryListReducer = {} } = state;
  // console.log(SummaryListReducer, "<-----------------SummaryListReducer");
  const { SummaryListObject, SummaryKey, creationLoader, error } = SummaryListReducer;
  return {
    SummaryListObject: SummaryListObject,
    SummaryKey: SummaryKey,
    creationLoader: creationLoader,
    error:error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSummaryObject: bindActionCreators(SummaryListActions.getSummaryObject, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));
