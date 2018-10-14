import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components'

const RichTxtEditorWrap = styled.div`
  .demo-editor rdw-editor-main {
    border: 1px solid #f1f1f1;
  }
`


class RichTextArea extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <RichTxtEditorWrap>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </RichTxtEditorWrap>
    )
  }
}

export default RichTextArea