import React from "react";
import { Input, Container } from 'reactstrap';
import ReactQuill from "react-quill";
import debounce from "../helpers";

class Editor extends React.Component {

  state = { text: "", title: "", id: "" };

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500);

  updateTitle = async (title) => {
    await this.setState({ title });
    this.update();
  }

  componentDidMount() {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    })
  }

  componentDidUpdate() {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      })
    }
  }

  render() {
    return (
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#bcc7e3' }}>
          <img src="https://img.icons8.com/material-rounded/20/476282/edit.png" alt="edit icon" />
          <span className="d-inline-block">
            <input 
              type="text" 
              style={{ border: 'none', outline: 'none', width: '350px', backgroundColor: '#bcc7e3', color: 'black' }}
              placeholder="Note title"
              value={this.state.title ? this.state.title : ''}
              onChange={(e) => this.updateTitle(e.target.value)}
            />
          </span>
        </div>
        <ReactQuill
            style={{ height: '100%' }}
            value={this.state.text}
            onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }
}

export default Editor;
