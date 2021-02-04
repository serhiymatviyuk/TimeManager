import * as React from 'react';
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ProjectTimeEntry } from '../../../models';
import { FormatDateTime } from '../../../helpers';

export interface ITimeEntriesList {
    formData: any,
    delete: Function
}

const TimeEntriesList : React.FC<ITimeEntriesList> = (props: ITimeEntriesList) => {
    const timeEntries: ProjectTimeEntry[] = props.formData.values.projectTimeEntries;
    return (
        <List>
            {
                Boolean(timeEntries?.length)
                ? timeEntries.map((item, index) => 
                    <ListItem key={index}>
                        <ListItemText
                            primary={FormatDateTime(item.startDate)}
                            secondary={FormatDateTime(item.endDate)}
                            />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => props.delete(item)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
                : <ListItem><ListItemText primary='No time added'/></ListItem>
            }
        </List>
    )
};

export default TimeEntriesList;