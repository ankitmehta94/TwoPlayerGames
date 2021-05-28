import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import InputModalBody from '../Components/SummaryType/InputModalBody'


const MySwal = withReactContent(Swal)
const readFileContent = function(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

const openInputModal = async function(setParamValues) {
  await MySwal.fire({
    title: <h1>Choose Type of Summary</h1>,
    html: <InputModalBody setStateValue={setParamValues} />,
    confirmButtonText:
  'Summarize my Transcript',
  })
}
const  setNameOfTranscript = function(input) {
    let fakePath = input.value;
    let pathArray = fakePath.split("\\");
    const { setFileName  } = this.props;
    const name = pathArray[2]?pathArray[2].split('.')[0]:false
    const { history } = this.props;
    if(name){
      setFileName(name)
      history.push(`${name}/id:loading`)
    }
    return name
  }
const sendOtterTranscript = async function(event) {
    await this.readFileAndSend(event,'abstractive')
  }
const  readFileAndSend = async function(event){
    await openInputModal(this.setParamValues)
    const input = event.target;
    if(this.setNameOfTranscript(input)){
      const { sendTranscriptText, history  } = this.props;
      const text =  await this.readFileContent(input.files[0])
      const type = this.state.type || 'abstractive';
      const chunkSize = this.state.chunkSize || 3;
      sendTranscriptText(text,type,chunkSize,history);
    }
  }
  const setParamValues = function(key, value){
    console.log(this)
    this.setState({
      [key]:value
    })
  }
const  sendZoomTranscript = async function(event) {
    await this.readFileAndSend(event)
    // await this.readFileAndSend(event,'abstractive')
  }
const Utils = {sendZoomTranscript,readFileContent, sendOtterTranscript, setNameOfTranscript, readFileAndSend, setParamValues}
  export default Utils