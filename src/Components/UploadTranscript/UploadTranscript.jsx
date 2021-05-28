import "./UploadTranscript.css";
import Title from "../Title/Title.jsx";
import { Animated } from "react-animated-css";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UploadActions from "./UploadActions";
import PreprocessingUtils from "./PreprocessingUtils.js";
console.log(UploadActions, "<-----------------UploadActions");

// import RichEditor from '../RichEditor/RichEditor'
// import {
//   ContentState,
//   EditorState,
//   // convertFromHTML as convertFromHTMLClassic,
//   // convertToRaw,
//   // convertFromRaw,
// } from 'draft-js';
// import convertFromHTMLModern from 'draft-js/lib/convertFromHTMLToContentBlocks';
// import gkx from 'draft-js/lib/gkx';
// import {convertToHTML} from 'draft-convert';
// const fromHTML = gkx('draft_refactored_html_importer')
//   ? convertFromHTMLModern
//   : convertFromHTMLClassic;

class UploadTranscript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: this.props.SummaryText,
      buttonOutterClass: "",
    };
  }
  setTextValue = (event) => {
    this.setState({
      textValue: event.target.value,
    });
  };
  onFileUploadChange = () => {
    this.setState({
      buttonOutterClass: "file_uploading",
    });
    setTimeout(() => {
      this.setState({
        buttonOutterClass: this.state.buttonOutterClass + " file_uploaded",
      });
    }, 3000);
  };
  uploadFile = async () => {
    const { sendAndSetTranscriptJSON } = this.props;
    await sendAndSetTranscriptJSON([]);
  };
  navigateTo = () => {
    const {
      changeContent,
      summaryId,
      updateSummaryList,
      updateActionItems,
    } = this.props;
    console.log(this.props, "<-----------------this.props.changeContent");
    changeContent("summaryList", {});
    if (summaryId !== "actionItems") {
      updateSummaryList({
        summaryId: summaryId,
        newSummaryText: this.state.textValue,
      });
    } else {
      updateActionItems(this.state.textValue);
    }
  };
  render() {
    const { buttonOutterClass } = this.state;
    console.log("here");
    return (
      <Animated
        className={"editSummary"}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        isVisible={this.props.isVisible}
      >
        <main className={"main_full"}>
          <div className={"container"}>
            <div className={"panel"}>
              <div className={"button_outer " + buttonOutterClass}>
                <div className={"btn_upload"}>
                  Upload Transcript
                  <input
                    type="file"
                    id="upload_file"
                    name=""
                    onChange={this.onFileUploadChange}
                  />
                </div>
                <div className={"processing_bar"}></div>
                <div className={"success_box"}></div>
              </div>
            </div>
            <div className={"error_msg"}></div>
            <div className={"uploaded_file_view"} id="uploaded_view">
              <span className={"file_remove"}>X</span>
            </div>
          </div>
        </main>
      </Animated>
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

});

export default connect(mapStateToProps, mapDispatchToProps)(UploadTranscript);
