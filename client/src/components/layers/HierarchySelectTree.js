import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';


const { SHOW_PARENT } = TreeSelect;


const HierarchySelectTree = (props) => {

    const {updateHierarchySelection} = props;
    const [treeData, setTreeData] = useState([]);
    const {layers} = useSelector(store => store.layerReducer);
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedIds , setSelectedIds] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        if(layers == null){
            dispatch(getLayers());
        }
        else {
            //TODO: remove options from data-tree when there are no level under group/layer
            let data = layers.map(layer => ({
                title:layer.name, 
                value: layer.name,
                key:layer._id,
                children : layer.grades.map(grade => ({
                    title:grade.name, 
                    value: grade.name,
                    key:grade._id,
                    children : grade.levels.map(level => ({
                        title:level.name, 
                        value: level.name,
                        key:level._id
                    }))
                }))
            }));
            setTreeData(data);
        }
    },[layers])

    useEffect(()=>{
        updateHierarchySelection(selectedIds);
    }, [selectedIds])

    const onChangeHandler = (values, option, data) => {
        setSelectedValues(values);
        setSelectedIds(data.allCheckedNodes.map(item => item.node.key));
    };


    const tProps = {
        treeData,
        value: selectedValues,
        onChange: onChangeHandler,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'בחר רמות',
        style: {
          width: '100%',
        },
    };

    return (
        <TreeSelect {...tProps} />
    )
}

export default HierarchySelectTree;