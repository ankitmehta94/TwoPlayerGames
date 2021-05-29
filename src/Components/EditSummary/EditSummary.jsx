import style from './EditSummary.css';
import Title from '../Title/Title.jsx'
import TranscriptContainer from './TranscriptContainer.jsx'
import { Animated } from 'react-animated-css'
import {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SummaryListActions from '../SummaryList/SummaryListActions'
import RichEditorContainer from '../RichEditor/RichEditorContainer'
import {ANIMATION_DURATION} from '../../Constants/configConstants'
class EditSummary extends Component{
  constructor(props){
    super(props)
    // console.log(editorState,'<-----------------editorState')
    this.state = {
      // mode: 'rawContent',
      // editorState: editorState,

      textValue: this.props.SummaryText,
    };
  }
  setTextValue = (event) => {
    this.setState({
      textValue:event.target.value
    })
  }
  navigateTo = async() => {
    const {changeContent} = this.props;
    await changeContent('summaryList',{})
  }
  saveEditedText = (editorJson) => {
      console.log(editorJson)
      const textValue = editorJson.blocks.map((block) => {
        console.log(block)
        return block['text']
      }).join('\n')
      function hashCode(string) {
        var hash = 0, i, chr;
        if (string.length === 0) return hash;
        for (i = 0; i < string.length; i++) {
          chr   = string.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      };
      const {changeContent, summaryId, updateSummaryList, updateActionItems} = this.props;
      console.log(hashCode(textValue),'<-----------------this.props.changeContent')
      if(summaryId !== 'actionItems'){
        updateSummaryList({
          summaryId: summaryId,
          newSummaryText: textValue,
          updateKey:hashCode(textValue),
        })
      }else{
        updateActionItems(textValue)
      }
  }
    render(){
      console.log("here")
    //  const {editorState} = this.state;
    console.log(this.props.isVisible,'<-----------------this.props.isVisible, navigateTo')
      return (<Animated className={style['editSummary']} animationIn="bounceInLeft" animationOut="bounceOutLeft" isVisible={this.props.isVisible}>
            <Title titleText={this.props.titleText} navigateTo={this.navigateTo}/>
          <TranscriptContainer Transcripts={this.props.Transcripts} summary={this.state.textValue} clickedText={this.props.clickedText}/>
          {/* <textarea className={style['textAreaCss']} value={this.state.textValue} rows={15} onChange={(event) => this.setTextValue(event)}/> */}
          {/* <RichEditor SummaryText={this.props.SummaryText} editorState={editorState} summaryId={this.props.summaryId} onChange={(e)=>{console.log(e)}} /> */}
          <RichEditorContainer SummaryText={this.props.SummaryText} runWhileLeaving={this.saveEditedText}/>
      </Animated>);
    }
  }

  const mapStateToProps = (state) => {
    const { SummaryListReducer = {} } = state;
    // console.log(SummaryListReducer, "<-----------------SummaryListReducer");
    const {clickedText} = SummaryListReducer
    return {
      clickedText
    }
  };
  const mapDispatchToProps = (dispatch) => ({
    updateSummaryList: bindActionCreators(SummaryListActions.updateSummaryList, dispatch),
    updateActionItems: bindActionCreators(SummaryListActions.updateActionItems, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditSummary);
