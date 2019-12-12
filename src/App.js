import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const firebase = require("firebase");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  }

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }
  
  newNote = async (title) => {
    const note = { 
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        ...note,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIdx = this.state.notes.indexOf(
      this.state.notes.filter(note => note.id === newID)[0]
    )
    this.setState({ 
      selectedNote: this.state.notes[newNoteIdx],
      selectedNoteIndex: newNoteIdx
    })    
  }

  deleteNote = async (note) => {
    const noteIdx = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) })
    if( this.state.selectedNoteIndex === noteIdx ){
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null 
      })
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex -1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ notes });
      });
  }

  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Container className="p-0" fluid>
          <Row className="no-gutters h-100">
            <Col style={{ backgroundColor: '#e4e0ff', height: window.outerHeight, borderRight: '5px solid #c9c9c9' }} sm="2">
              <Sidebar 
                selectedNoteIndex={this.state.selectedNoteIndex}
                notes={this.state.notes}
                deleteNote={this.deleteNote}
                selectNote={this.selectNote}
                newNote={this.newNote}
              />
            </Col>
            <Col style={{ height: window.outerHeight }} sm="10">
              {this.state.selectedNote ? 
                <Editor 
                  noteUpdate={this.noteUpdate}
                  selectedNote={this.state.selectedNote}
                  selectedNoteIndex={this.state.selectedNoteIndex}
                  notes={this.state.notes}
                />: null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
