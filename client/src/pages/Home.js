import React from 'react';
import {connect} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import { Modal, Button ,Layout} from 'antd';

function Home(props) {

    const {user} = props;

    return (
        <>
            {user.firstName && <h1>connected user: {user.firstName}</h1>}
            {!user.firstName && <><Login/><Register/></>}
        </>
    );
}

state = {loading: false,visible: false};

showModal = () => {this.setState({visible: true});};

handleOk = () => {
  this.setState({ loading: true });
  setTimeout(() => {
    this.setState({ loading: false, visible: false });
  }, 3000);
};

handleCancel = () => {this.setState({ visible: false });};

render()
  const { visible, loading } = this.state;
  return (
    <>
      <Button type="primary" onClick={this.showModal}>Sign in</Button>
      <Modal
        visible={visible}
        title="Login/Register"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}> Return </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}> Submit</Button> ]} 
      >

      <Layout>
         <Login></Login>
         <Register></Register>
      </Layout>

      </Modal>
    </>
  );
}

  export default ReactDOM.render(<Home />, mountNode);

// export default connect(
//     (state) => {
//         return {
//             user : state.userReducer.user
//         }
//     },
//     null
// )(Home);