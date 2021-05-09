import React from 'react';
import { Menu,Layout } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import '../../css/Library.css';
import { AlignRightOutlined, ReadOutlined, BarChartOutlined } from '@ant-design/icons';
import BookList from './BookList';
import CreateBorrow from './CreateBorrow';
import CreateNewBook from './CreateNewBook';
import BorrowBookList from './BorrowBookList';
import BookStatistic from './BookStatistic';
import { Route, Link} from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const rootSubmenuKeys = ['borrows', 'books', 'statistics'];


const Library = () => {

    const [openKeys, setOpenKeys] = React.useState(['borrows', 'books', 'statistics']);

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
            <Layout>
                <Sider width={200} theme="light">
                    <Menu mode="inline" style={{float: 'right'}} openKeys={openKeys} onOpenChange={onOpenChange}>
                        <SubMenu key="borrows" icon={<AlignRightOutlined />} title="השאלת ספרים">
                            <Menu.Item key="borrowing books">
                                <Link to='/library/borrows'>רשימת השאלות</Link>
                            </Menu.Item>
                            <Menu.Item key="add new borrow">
                                <Link to='/library/borrows/add'>הוספת השאלה חדשה</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="books" icon={<ReadOutlined />} title="ספרים">
                            <Menu.Item key="book list">
                                <Link to='/library/books'>רשימת ספרים</Link>
                            </Menu.Item>
                            <Menu.Item key="add new book">
                                <Link to='/library/books/add'>הוספת ספר חדש</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="statistics" icon={<BarChartOutlined />}>
                            <Link to='/library/statistics'>סטטיסטיקה</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{float: 'right', background: 'white', padding: '30px 10px'}}>

                        <Route path='/library/books' component={BookList} exact />
                        <Route path='/library/books/add' component={CreateNewBook} exact />
                        <Route path='/library/borrows' component={BorrowBookList} exact/>
                        <Route path='/library/borrows/add' component={CreateBorrow} exact/>
                        <Route path='/library/statistics' component={BookStatistic} exact/>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default Library;