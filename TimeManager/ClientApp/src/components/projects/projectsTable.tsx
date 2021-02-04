import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { IAppState, Project } from '../../models';
import { useSelector } from 'react-redux';
import ProjectTableRow from './projectTableRow';
import { makeStyles } from '@material-ui/core';
import EmptyProjectsTableRow from './emptyProjectsTableRow';

const useTableStyles = makeStyles({
    modalCloseBtn: {
        float:'right', width: '30px', height: '30px'
    },
});

const ProjectsTable: React.FC = () => {
    const projects = useSelector<IAppState, Project[]>((state) => state.projects.projects);

    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Project</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Total Time (H)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    Boolean(projects) && projects.length 
                    ? projects.map((project) => (<ProjectTableRow key={project.id} row={project} />))
                    : <EmptyProjectsTableRow/>
                }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProjectsTable;