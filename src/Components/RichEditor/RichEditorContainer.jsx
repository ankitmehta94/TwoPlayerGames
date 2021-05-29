/**
 * Copyright (c) Facebook, Inc. and its affiliates. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 * @format
 */

 import React from 'react';
 import style from './RichEditorContainer/DraftJsPlaygroundContainer.css';
 import 'draft-js/dist/Draft.css';
 import './RichEditorContainer/LoseCss.css';
 import DraftJsRichEditorExample from './RichEditorContainer/DraftJsRichEditorExample';
 import {convertToHTML} from 'draft-convert';
 import PanelGroup from 'react-panelgroup';
 import gkx from 'draft-js/lib/gkx';
 import convertFromHTMLModern from 'draft-js/lib/convertFromHTMLToContentBlocks';
 
 import {
   ContentState,
   EditorState,
   convertFromHTML as convertFromHTMLClassic,
   convertToRaw,
   convertFromRaw,
 } from 'draft-js';
 
 const fromHTML = gkx('draft_refactored_html_importer')
   ? convertFromHTMLModern
   : convertFromHTMLClassic;
 
 const theme = {
   scheme: 'monokai',
   author: 'wimer hazenberg (http://www.monokai.nl)',
   base00: '#000000',
   base01: '#383830',
   base02: '#49483e',
   base03: '#75715e',
   base04: '#a59f85',
   base05: '#f8f8f2',
   base06: '#f5f4f1',
   base07: '#f9f8f5',
   base08: '#f92672',
   base09: '#fd971f',
   base0A: '#f4bf75',
   base0B: '#a6e22e',
   base0C: '#a1efe4',
   base0D: '#66d9ef',
   base0E: '#ae81ff',
   base0F: '#cc6633',
 };
 
 
 const baseHtmlContent = `<ol>
   <li>one</li>
   <li>
     <ul>
       <li>
         <h1>2a</h1>
       </li>
       <li>2b</li>
     </ul>
    </li>
    <li>three</li>
 </ol>
 `;
 

 
 class DraftJsPlaygroundContainer extends React.Component {

   constructor(props) {
     super(props);
     const { SummaryText } = props;
     const baseRawContent = {
        blocks: [],
        entityMap: {},
      };
      const SummaryArray = SummaryText.split('\n')
      console.log(SummaryArray)
      SummaryArray.forEach((line,index) => {
         const val = line.trim();
       if(val){
        baseRawContent.blocks.push({
            key: `me-${index}`,
            text: val,
            type: 'unordered-list-item',
        })
       }
     })
  
     this.BASE_CONTENT = {
        rawContent: JSON.stringify(baseRawContent, null, 2),
        html: baseHtmlContent,
      };
      console.log(this.BASE_CONTENT)
     this.state = {
       mode: 'rawContent',
       editorState: EditorState.createEmpty(),
       codeMirrorValue: this.BASE_CONTENT['rawContent'],
       showAllState: false,
     };
   }
 
   componentDidMount() {
     this.setContent();
   }
   componentWillUnmount() {
    const finalState = convertToRaw(this.state.editorState.getCurrentContent())
    this.props.runWhileLeaving(finalState)
   }
 
   onChange = editorState => {
     this.setState({editorState});
   };
 
   _setContentBlock(content) {
     this.onChange(EditorState.createWithContent(content));
   }
 
   importEditorState = () => {
     const {editorState, mode} = this.state;
     if (mode === 'html') {
       this.setState({
         codeMirrorValue: convertToHTML(editorState.getCurrentContent()),
       });
     } else {
       this.setState({
         codeMirrorValue: JSON.stringify(
           convertToRaw(editorState.getCurrentContent()),
           null,
           2,
         ),
       });
     }
   };
 
   _setHTMLContent(html) {
     const parsedHtml = fromHTML(html);
     if (!parsedHtml) {
       return;
     }
 
     const {contentBlocks, entityMap} = parsedHtml;
     if (!contentBlocks) {
       return;
     }
 
     this._setContentBlock(
       ContentState.createFromBlockArray(contentBlocks, entityMap),
     );
   }
 
   _setRawContent(rawContent) {
     try {
       const parsedJson = JSON.parse(rawContent);
       this._setContentBlock(convertFromRaw(parsedJson));
     } catch (err) {
       alert('The json is invalid');
     }
   }
 
   setContent = () => {
     const {mode, codeMirrorValue} = this.state;
     if (mode === 'html') {
       this._setHTMLContent(codeMirrorValue);
     } else {
       this._setRawContent(codeMirrorValue);
     }
   };
 
   onSelectChange = ({target: {value: mode}}) => {
     this.setState({
       mode,
       codeMirrorValue: this.BASE_CONTENT[mode],
     });
   };
 
   updateCodeMirror = codeMirrorValue => {
     this.setState({codeMirrorValue});
   };
 
   shouldExpandNode = (keyName, data, level) => {
     return ['blockMap', 'root'].some(
       defaultVisibleNode => keyName[0] === defaultVisibleNode,
     );
   };
 
   onExperimentChange = ({target: {value: experimentFlags}}) => {
     if (experimentFlags) {
       window.location.search = `gk_enable=${experimentFlags}`;
     }
   };
 
   render() {
     const {editorState, mode, codeMirrorValue, showAllState} = this.state;
     return (
       <div className={style["container"]}>
         <div className={style["playground-main"]}>
           <PanelGroup borderColor="grey">
             <PanelGroup direction="column" borderColor="grey">
               <div className={style["DraftJsPlaygroundContainer-editor"]}>
                 <DraftJsRichEditorExample
                   className={style["DraftEditor-root"]}
                   editorState={editorState}
                   onChange={this.onChange}
                   placeholder="Summary Not Added"
                 />
               </div>
             </PanelGroup>
           </PanelGroup>
         </div>
       </div>
     );
   }
 }
 
 export default DraftJsPlaygroundContainer;
 