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
            {/* <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>Add New Layer</Button>
            {showAddNewLayer && <CreateLayer hideCreateLayer={hideCreateLayer}/>} */}
           {grade && grade.levels && <HierarchyListView type="grade" data={grade.levels} showDetails={showDetails}/>
            } 
      
        </>
    )
}

export default ViewLevels;