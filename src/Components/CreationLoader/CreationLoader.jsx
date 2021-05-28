import style from './CreationLoader.css';
import Title from '../Title/Title.jsx'
import { Animated } from 'react-animated-css'
import {Component, Fragment} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SummaryListActions from '../SummaryList/SummaryListActions'
import Loader from '../../Assets/loader.svg'
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
  const LARRAY = [
    'Sending Data to AWS','Removing Disfluency','Extractings Summaries'
  ]
  const TIME_OUT = 4000
class LoaderComponent extends Component{
    componentDidMount(){
        this.runThroughLoader();
    }
    state = {
        'LoadingText': LARRAY[0]
    }
    runThroughLoader = async() => {
        let count = 1;
        while(count < LARRAY.length){
            await sleep(TIME_OUT)
            this.setState({
                'LoadingText': LARRAY[count]
            })
            count += 1
        }
    }
    render(){
      return (<div className={style['loaderContainer']}>
          <h1 className={style['loaderText']}>{this.state.LoadingText}</h1>
          <img className={style['loaderImage']} src={Loader} alt="Feature 03" />
      </div>);
    }
  }

  const mapStateToProps = (state) => {
return {}
  };
  const mapDispatchToProps = (dispatch) => ({
    updateSummaryList: bindActionCreators(SummaryListActions.updateSummaryList, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoaderComponent);
