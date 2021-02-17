import React from 'react';
import HierarchyListView from './HierarchyListView';
import { useHistory } from 'react-router-dom';


const ViewLevels = (props) => {

    const history = useHistory();
    const {grade} = history.location.state;

    const showDetails = (level) => {
        debugger
        console.log(level);
    }

    return (
        <>      
        
            <h1>Levels</h1>
           {grade && grade.levels && 
                <HierarchyListView 
                    type="level" 
                    showDetails={showDetails}
                    gradeId={grade._id}
                />
            } 
      
        </>
    )
}

export default ViewLevels;