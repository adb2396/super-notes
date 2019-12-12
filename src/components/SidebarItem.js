import React from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { removeHTMLTags } from '../helpers';

const SidebarItem = (props) => {
    
    const { index, note, selectedNoteIndex } = props;

    return (
        <ListGroupItem className="listClick">
            <div onClick={() => props.selectNote( note, index)}>
                <ListGroupItemHeading>
                    { note.title }
                </ListGroupItemHeading>
                <ListGroupItemText>
                    { removeHTMLTags(note.body.substring(0, 30)) + '...' }
                </ListGroupItemText>
            </div>
            <img 
                src="https://img.icons8.com/android/24/000000/trash.png" 
                alt="delete icon" 
                onClick={ () => {
                    if(window.confirm(`Are you sure, you want delete: ${note.title}`)){
                        props.deleteNote(note);
                    }
                }}
            />
        </ListGroupItem>
    );
};

export default SidebarItem;