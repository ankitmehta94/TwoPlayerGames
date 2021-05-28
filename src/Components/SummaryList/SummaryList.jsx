import style from "./SummaryList.css";
import { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import Title from "../Title/Title.jsx";
import { connect } from "react-redux";
import SummaryListActions from "./SummaryListActions";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit } from "@fortawesome/free-solid-svg-icons";

class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAgenda: false,
      textValue: this.props.Agenda,
    };
  }
  showAgendaEdit = () => {
    this.setState({
      editAgenda: true,
    });
  };
  setTextValue = (event) => {
    this.setState({
      textValue: event.target.value,
    });
  };
  saveAgenda = () => {
    this.setState({
      editAgenda: false,
    });
    this.props.updateAgenda(this.state.textValue);
  };
  agendaView = (agendaDiv) => {
    if (this.state.editAgenda) {
      return (
        <Fragment>
          <div className={style["iconDiv"]} onClick={this.saveAgenda}>
            <FontAwesomeIcon icon={faSave} onClick={this.saveAgenda} /> Save
          </div>
          <textarea
            className={style["textAreaCss"]}
            value={this.state.textValue}
            rows={10}
            onChange={(event) => this.setTextValue(event)}
          />
        </Fragment>
      );
    } else {
      return agendaDiv;
    }
  };
  getAgendaDiv = () => {
    return this.state.textValue ? (
      <div className={style["cellList"]}>
        <div className={style["iconDiv"]}>
           <div className={style["iconDiv"]}  onClick={this.showAgendaEdit}> <FontAwesomeIcon icon={faEdit} /> Edit</div> 
          </div>
        <div className={style["CellLine"]}>{this.state.textValue}</div>
      </div>
    ) : (
      <div className={style["noAgendaDiv"]} onClick={this.showAgendaEdit}>
        No Agenda Found. Click Here to add Agenda
      </div>
    );
  }
  render() {
    const agendaDiv = this.getAgendaDiv()
    const view = this.agendaView(agendaDiv);
    return (
      <Fragment>
        <Title titleText={"AGENDA"} />
        {view}
      </Fragment>
    );
  }
}
class ActionItems extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  getActionItems = () => {
    const { SummaryListObject, SummaryKey } = this.props;
    if(SummaryListObject[SummaryKey] && SummaryListObject[SummaryKey].actionItems){
      return SummaryListObject[SummaryKey].actionItems.split('\n').map((line, index) => {
        return <div key={`er-${index}`}>{line}</div>
      })
    }
    return null;
  };
  showActionsItemEdit = () => {
    const { SummaryListObject, SummaryKey, changeContent, updateClickedText } = this.props;
    changeContent("editSummary", {
      SummaryText: SummaryListObject[SummaryKey].actionItems || 'Nope',
      Transcripts: SummaryListObject[SummaryKey].transcript,
      summaryId: 'actionItems',
      titleText: "EDIT ACTION ITEMS",
    });
    updateClickedText('EDIT ACTION ITEMS');
  };
  render(){
    const actionItems = this.getActionItems()
    if(actionItems){
      return (
        <Fragment>
            <Title titleText={"ACTION ITEMS"} />
            
        <div className={style["cellList"]}>
        <div className={style["actionTab"]} ><div className={style["iconDiv"]}>
              <FontAwesomeIcon icon={faEdit} onClick={this.showActionsItemEdit} />Edit
            </div>
            <div className={style["iconDiv"]}>  Send To Jira</div></div>
          <div className={style["CellLine"]}>{actionItems}</div>
        </div>
        </Fragment>
      )
    }
    return null
  }
}
class SummaryList extends Component {
  constructor(props){
    console.log(props,'<-----------------props')
    super(props);
    this.state = {

    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps,'nextProps')
  }
  createList = () => {
    const { SumObj, Transcripts } = this.props;
    // console.log(SummaryListObject);
    // console.log(SumObj, "<-----------------SumObj");
    return Object.keys(SumObj).map((sumKey, sumIndex) => {
      const sum = SumObj[sumKey];
      // console.log(sum, "<-----------------sumKey");
      let htmlArray = sum.summary.split("\n").map((text, index) => {
        console.log(text);
        return (
          <p key={`p-${index}`}>
            {this.createHighlightedHTML(text, sum.summary, sumKey)}
          </p>
        );
      });
      const showSummayEdit = () =>
      this.showSummayEdit(sum.summary, Transcripts, sumKey);
      return (
        <div className={style["CellLine"]} key={`sumIndex-${sumIndex}`}>
          <div className={style["actionTab"]} onClick={showSummayEdit}>
            <div className={style["iconDiv"]}>
            <FontAwesomeIcon icon={faEdit} /> Edit
            </div>
            
          </div>
          {htmlArray}
        </div>
      );
    });
  };
  showSummayEdit = (SummaryText, Transcripts, summaryId) => {
    this.props.changeContent("editSummary", {
      SummaryText,
      Transcripts,
      summaryId,
      titleText: "EDIT SUMMARY",
    });
    this.props.updateClickedText('EDIT SUMMARY');
  };
  showEditSummary = (SummaryText, Transcripts, summaryId, middleText) => {
    this.props.changeContent("editSummary", {
      SummaryText,
      Transcripts,
      summaryId,
      titleText: "EDIT SUMMARY",
    });
    this.props.updateClickedText(middleText);
  };
  createHighlightedHTML = (SummaryText, FullSummary, summaryId) => {
    const { SummaryListObject, SummaryKey } = this.props;
    const SummarySplit = SummaryText.split(":");
    const dialog = SummarySplit[1]?SummarySplit[1]:SummaryText;
    const personName = SummarySplit[1]?SummarySplit[0]:'';
    const htmlArray = [];
    const Transcripts = SummaryListObject[SummaryKey].transcript || '';
    // if (dialog) {
      const existIndex = Transcripts.toLowerCase()
        .trim()
        .indexOf(dialog.toLowerCase().trim());
      if (existIndex > -1) {
        // console.log(dialog, "<-----------------dialog");
        const startIndex = SummaryText.toLowerCase()
          .trim()
          .indexOf(dialog.toLowerCase().trim())//+personName.length;
        const length = dialog.toLowerCase().trim().length;
        const endIndex = startIndex + length;

        // console.log(endIndex,'<-----------------endIndex',SummaryText.substring(startIndex, endIndex))
        // console.log(length,'<-----------------length',SummaryText.substring(endIndex, SummaryText.length))
        // htmlArray.push(SummaryText.substring(0, startIndex).trim());
        const middleText = SummaryText.trim().substring(startIndex, endIndex)
        const showEditSummary = () =>
          this.showEditSummary(FullSummary, Transcripts, summaryId, middleText);
        // htmlArray.push(
        //   <div className="clickMe" onClick={showEditSummary}>
        //     {middleText}
        //   </div>
        // );
        // htmlArray.push(
        //   SummaryText.substring(endIndex, SummaryText.length).trim()
        // );

        if(middleText){
          return (
            <span className={style["oneLine"]}>
              {/* {personName?personName+': ':''} */}
              {SummaryText.trim().substring(0, startIndex)}
              <span className={style["clickMe"]} onClick={showEditSummary}>
                {SummaryText.trim().substring(startIndex, endIndex)}
              </span>
              {SummaryText.trim().substring(endIndex, SummaryText.length)}
            </span>
          );
        }
      } else {
        return <span>{SummaryText}</span>;
      }
      // console.log(LCS(dialog.toLowerCase().trim(), Transcripts.toLowerCase().trim()))
    // }
  };
  getAgenda = () => {
    const { SummaryListObject, SummaryKey } = this.props;
    return SummaryListObject[SummaryKey]?SummaryListObject[SummaryKey].agenda:'';
  };
  render() {
    const SummaryHTML = this.createList();
    const agenda = this.getAgenda();
    const { SummaryListObject, SummaryKey, changeContent,updateClickedText } = this.props;
    return (
      <Animated
        className={style["summaryList"]}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        isVisible={this.props.isVisible}
      >
        <Agenda Agenda={agenda} updateAgenda={this.props.updateAgenda} />
        <Title titleText={"SUMMARIES"} />
        <div className={style["cellList"]}>{SummaryHTML}</div>
        <ActionItems changeContent={changeContent} SummaryListObject={SummaryListObject} SummaryKey={SummaryKey} updateClickedText={updateClickedText}/>
      </Animated>
    );
  }
}

const mapStateToProps = (state) => {
  const { SummaryListReducer = {} } = state;
  
  const { SummaryListObject, SummaryKey, updateKey} = SummaryListReducer;
  console.log(updateKey, "<-----------------updateKey");
  const Transcripts = SummaryListObject[SummaryKey]? SummaryListObject[SummaryKey].transcript : '';
  const SumObj = SummaryListObject[SummaryKey] && SummaryListObject[SummaryKey].summaries ?SummaryListObject[SummaryKey].summaries:{};
  return {
    SummaryListObject: SummaryListObject,
    SummaryKey: SummaryKey,
    Transcripts,SumObj, updateKey
  };
};
const mapDispatchToProps = (dispatch) => {
  // console.log(SummaryListActions, "<-----------------SummaryListActions");
  return {
    updateClickedText: bindActionCreators(
      SummaryListActions.updateClickedText,
      dispatch
    ),
    updateAgenda: bindActionCreators(SummaryListActions.updateAgenda, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryList);
