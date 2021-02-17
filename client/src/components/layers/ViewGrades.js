import React from 'react';
import HierarchyListView from './HierarchyListView';
import { useHistory } from 'react-router-dom';


const ViewGrades = (props) => {

    const history = useHistory();
    const {layer} = history.location.state;

    const showDetails = (grade) => {
        debugger
        console.log(grade);
        history.push({
            pathname: `/level`,
            state: { grade },
        });
    }

    return (
        <>      
        
            <h1>Grades</h1>
           {layer && layer.grades && 
                <HierarchyListView 
                    type="grade" 
                    layerId={layer._id} 
                    showDetails={showDetails}
                />
            } 
      
        </>
    )
}

export default ViewGrades;