import React from "react";
import { Button, Input, ListGroup } from "reactstrap";
import SidebarItem from "./SidebarItem";

class Sidebar extends React.Component {
    

    state = { addingNote: false, title: null };

    newNoteBtnClick = () => {
        this.setState({ addingNote: !this.state.addingNote, title: null });
    }

    updateTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({
            title: null,
            addingNote: false
        })
    }

    selectNote = (note, index) => {
        this.props.selectNote( note, index);
    }

    deleteNote = (note) => {
        this.props.deleteNote( note );
    }

    renderNoteInput = () => {
        if(this.state.addingNote) {
            return (
                <div>
                    <Input 
                        type="text" 
                        placeholder="Enter Note title" 
                        onKeyUp={(e) => this.updateTitle(e)}
                    />
                    <Button
                        color="secondary"
                        onClick={this.newNote}
                        style={{ width: '100%' }}
                    >
                        Submit Note
                    </Button>
                </div>
            )
        } else return null;
    }

    renderNotes = () => {
        if( this.props.notes ) {
            return this.props.notes.map((note, index) => {
                return (
                    <div key={index}>
                        <SidebarItem 
                            note={note}
                            index={index}
                            selectedNoteIndex={this.props.selectedNoteIndex}
                            selectNote={this.selectNote}
                            deleteNote={this.deleteNote}
                        />
                    </div>
                )
            });
        } else {
           return <div></div>
        }
    }

    render() {
        
        return (
            <div>
                <Button 
                    color="primary" 
                    onClick={this.newNoteBtnClick}
                    style={{ width: '100%' }}
                >
                    { this.state.addingNote ? 'Cancel' : 'New Note' }
                </Button>
                { this.renderNoteInput() }
                <ListGroup>
                    { this.renderNotes() }
                </ListGroup>
            </div>
        );
  }
}

export default Sidebar;
