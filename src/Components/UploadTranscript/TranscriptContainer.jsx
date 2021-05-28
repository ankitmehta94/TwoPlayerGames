import './EditSummary.css';
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
    TranscriptsArray.forEach((lineText) => {
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
            console.log(existIndex,'<-----------------existIndex') 
            console.log(index, summaryArray.length,'<-----------------index and length')
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
                        <div className="transcriptHighlight" id={'scrollMe'} >
                          {lineText.trim().substring(startIndex, endIndex)}
                        </div>
                      )
                }else{
                    middle = (
                        <div className="transcriptHighlight"  >
                          {lineText.trim().substring(startIndex, endIndex)}
                        </div>
                      )
                }
                const end = lineText.trim().substring(endIndex, summary.length)
                htmlArray.push(
                    <div className={'oneLine'}>{begining}{middle}{end}</div>
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
        console.log(this.props.Transcripts.split('\n'),'<-----------------Transcripts.split')
        const text = this.createHighlightedHTML();
        console.log(text,'<-----------------text')
     return (<div className={'transcripDiv'} >{text}</div>)
    }
  }

export default TranscriptContainer
