import React from 'react';
import './App.css';
import { AiOutlineExpandAlt, AiFillTool} from "react-icons/ai";

const marked = require('marked');
marked.setOptions({
  breaks: true
})

const renderer = new marked.Renderer();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.maximizeEditor = this.maximizeEditor.bind(this);
    this.maximizePreview = this.maximizePreview.bind(this);
  }
  handleChange(event){
    this.setState({
      text: event.target.value
    })
  }
  maximizeEditor(){
    this.setState({
      editorMaximized: !this.state.editorMaximized
    })
  }
  maximizePreview(){
    this.setState({
      previewMaximized: !this.state.previewMaximized
    })
  }
  render(){
    const classes = this.state.editorMaximized
      ? ["editorMaximized", "previewWrapper", "border border-dark boxMaximized", "previewBox  border border-dark"] 
      : this.state.previewMaximized 
      ? ["editorWrapper", "previewMaximized", "border border-dark textbox", "previewBoxMaximized  border border-dark"]
      : ["editorWrapper", "previewWrapper", "border border-dark textbox", "previewBox  border border-dark"]
    return (
      <div className="App">
        {!this.state.previewMaximized ? 
        <div className={classes[0]}>
        <div className="editorBox">
          <Toolbar onClick={this.maximizeEditor} text="Editor"/>
          <Editor boxExpand={classes} markdown={this.state.text} onChange={this.handleChange}/>
        </div>
        </div>
        : null
        }
        {!this.state.editorMaximized ? 
        <div className={classes[1]}>
          <div className="previewBox">
            <Toolbar onClick={this.maximizePreview} text="Preview"/>
            <Preview boxExpand={classes} markdown={this.state.text}/>
        </div>
        </div>
        : null
          }
      </div>
    );
  }
}

const Toolbar = props => {
  return (
    <div className="toolbar editor border-top border-right border-left border-dark">
      <div>
        <AiFillTool size="1.3em"/>
        {props.text}
        </div>
      <AiOutlineExpandAlt className="expandIcon" onClick={props.onClick} size="1.5em"/>
    </div>
  )
}

const Editor = props => {
    return (
        <textarea className={props.boxExpand[2]} id="editor" type="text" onChange={props.onChange} value={props.markdown}></textarea>
    )
}

const Preview = props => {
  return (
      <div className={props.boxExpand[3]}>
         <div 
         dangerouslySetInnerHTML={{
         __html: marked(props.markdown, { renderer: renderer })
         }}
        id='preview' />
        </div>
  )
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

export default App;
