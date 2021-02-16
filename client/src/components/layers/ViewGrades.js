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
            {/* <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>Add New Layer</Button>
            {showAddNewLayer && <CreateLayer hideCreateLayer={hideCreateLayer}/>} */}
           {layer && layer.grade && <HierarchyListView type="grade" data={layer.grade} showDetails={showDetails}/>
            } 
      
        </>
    )
}

export default ViewGrades;