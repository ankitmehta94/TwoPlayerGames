import style from "./InputModalBody.css";
import { Component } from "react";

class InputModalBody extends Component {
  summaryChange  = (event) => {
    console.log(event.target.value)
    const type = event.target.value
    this.props.setStateValue('type',type)
  }
  chunkSizeChange  = (event) => {
    console.log(event.target.value)
    const chunkSize = event.target.value
    this.props.setStateValue('chunkSize',chunkSize)
  }
  render() {
    return (
      <div>
        <div className={style["chooseRadio"]} onChange={this.summaryChange}>
          <div className={style["radioDiv"]}>
            <label for="summaryType">Extractive Summary (Model Under Maintainance)</label>
            <input type="radio" name="summaryType" value="extractive" />
          </div>
          <div className={style["radioDiv"]}>
            <label for="summaryType">Abstractive Summary</label>
            <input

              type="radio"
              name="summaryType"
              value="abstractive"
              defaultChecked
            />
          </div>
        </div>
        {/* <div className={style["summaryName"]}>
          <label>Chunk Size</label>
          <input type="number" onChange={this.chunkSizeChange} />
        </div> */}
      </div>
    );
  }
}

export default InputModalBody;
