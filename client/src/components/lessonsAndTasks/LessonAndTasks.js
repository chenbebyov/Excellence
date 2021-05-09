import React from 'react';
import EditorialBoard from './EditorialBoard';
import CreateLesson from './CreateLesson';
import LessonView from './LessonView';
import { Menu,Layout } from 'antd';
import { DiffOutlined,SnippetsOutlined } from '@ant-design/icons';
import { Route, Link} from "react-router-dom";
import { useSelector } from 'react-redux';

const { Header, Content, Sider } = Layout;


const rootSubmenuKeys = ['createLessons','EditorialBoard'];

const LessonAndTasks = () => {
    
    const [openKeys, setOpenKeys] = React.useState(['createLessons','EditorialBoard']);
    const { user } = useSelector(state => state.userReducer);


    const onOpenChange = keys => {
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };

    return (
        <>
              <Layout >
                <Sider width={200} theme="light" >
                    <Menu mode="inline" style={{float: 'right'}} openKeys={openKeys} onOpenChange={onOpenChange}>
                            {user.role === 'admin' && 
                                <Menu.Item key="createLessons" icon={<DiffOutlined />}>
                                      <Link to='/lessons/newlesson'>הוספת שיעור חדש</Link>
                              </Menu.Item>
                            }
                             {['admin', 'teacher'].includes(user.role) && 
                                <Menu.Item key="EditorialBoard" icon={<SnippetsOutlined />}>
                                        <Link to='/lessons/lessons'>מערכי שיעור</Link>
                                </Menu.Item>
                            }
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{float: 'right', background: 'white', padding: '30px'}}>
                        <Route path='/lessons/newlesson' component={CreateLesson} exact />
                        <Route path='/lessons/lessons' component={EditorialBoard} exact />
                        <Route path='/lessons/lesson/:id' component={LessonView} exact />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LessonAndTasks;