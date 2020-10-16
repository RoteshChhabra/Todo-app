import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Todo=(props)=>{
  // console.log(props);
return (
  <div className='content-container'>
<ListItem>
                  <ListItemText
                    primary={props.todo.text}
                    secondary='complete'
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={props.onRemove}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
</div>

)

};

export default Todo;

             