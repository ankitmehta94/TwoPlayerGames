import style from './EditSummary.css';
import {Component} from 'react';




class TranscriptContainer extends Component{
    componentDidMount(){
        setTimeout(() => {
            const element = document.getElementById('scrollMe');
            if(element)
                element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        },500)
    }
  createHighlightedHTML = () => {
    const { Transcripts, summary } = this.props;
    const htmlArray = []
        // console.log(text);
    const TranscriptsArray = Transcripts.split('\n');
    TranscriptsArray.forEach((lineText,lineIndex) => {
        let flag = false;
        const summaryArray = summary.split("\n")
        for (let index = 0; index < summaryArray.length; index++) {
            const text = summaryArray[index];
            const SummarySplit = text.split(":");
            const dialog = SummarySplit[1];
            if(dialog){
                const existIndex = lineText.toLowerCase()
            .trim()
            .indexOf(dialog.toLowerCase().trim());
            if (existIndex > -1) {
                // console.log(SummaryText, "<-----------------SummaryText");
                // console.log(dialog, "<-----------------dialog");
                const startIndex = existIndex;
                // console.log(startIndex,'<----------------startIndex',SummaryText.substring(0, startIndex))
                const length = dialog.toLowerCase().trim().length;
                const endIndex = startIndex + length;
                // console.log(dialog, "Kamariya")
                // console.log( this.props.clickedText, "None",)
                const begining = lineText.trim().substring(0, startIndex)
                let middle = null
                if(this.props.clickedText ===  dialog.trim()){
                    middle = (
                        <div className={style["transcriptHighlight"]} id={'scrollMe'} >
                          {lineText.trim().substring(startIndex, endIndex)}
                        </div>
                      )
                }else{
                    middle = (
                        <div className={style["transcriptHighlight"]}  >
                          {lineText.trim().substring(startIndex, endIndex)}
                        </div>
                      )
                }
                const end = lineText.trim().substring(endIndex, summary.length)
                console.log(style['oneLine'])
                htmlArray.push(
                    <div key={`ui-${lineIndex}`} className={style['oneLine']}>{begining}{middle}{end}</div>
                );
                htmlArray.push(
                    <br/>
                );
                flag = true;
                }
               
            }else{
            }
 
   
        }
        if(!flag){
            htmlArray.push(
                lineText.trim()
            );
            htmlArray.push(
                <br/>
            );
            htmlArray.push(
                <br/>
            );
        }
    })
     
    return htmlArray
    
    
  };
  setTextValue = (event) => {
    this.setState({
      textValue:event.target.value
    })
  }
    render(){
        const text = this.createHighlightedHTML();
     return (<div className={style['transcripDiv']} >{text}</div>)
    }
  }

export default TranscriptContainer
