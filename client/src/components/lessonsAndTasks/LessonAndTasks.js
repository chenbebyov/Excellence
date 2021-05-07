import React from 'react';
import EditorialBoard from './EditorialBoard';
import CreateLesson from './CreateLesson';
import { Menu,Layout } from 'antd';
import { DiffOutlined,SnippetsOutlined } from '@ant-design/icons';
import { Route, Link} from "react-router-dom";

const { Header, Content, Sider } = Layout;


const rootSubmenuKeys = ['createLessons','EditorialBoard'];

const LessonAndTasks = () => {
    
    const [openKeys, setOpenKeys] = React.useState(['createLessons','EditorialBoard']);

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
                            <Menu.Item key="createLessons" icon={<DiffOutlined />}>
                                  <Link to='/lessons/newlesson'>הוספת שיעור חדש</Link>
                           </Menu.Item>
                           <Menu.Item key="EditorialBoard" icon={<SnippetsOutlined />}>
                                  <Link to='/lessons/lessons'>מערכי שיעור</Link>
                           </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{float: 'right', background: 'transparent', padding: '30px'}}>
                        <Route path='/lessons/newlesson' component={CreateLesson} exact />
                        <Route path='/lessons/lessons' component={EditorialBoard} exact />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LessonAndTasks;