// import { Modal, Button,Layout } from 'antd';
// import Login from '../components/Login';
// import Register from '../components/Register';

// class App extends React.Component {
//   state = {loading: false,visible: false};

//   showModal = () => {this.setState({visible: true});};

//   handleOk = () => {
//     this.setState({ loading: true });
//     setTimeout(() => {
//       this.setState({ loading: false, visible: false });
//     }, 3000);
//   };

//   handleCancel = () => {this.setState({ visible: false });};

//   render() {
//     const { visible, loading } = this.state;
//     return (
//       <>
//         <Button type="primary" onClick={this.showModal}>Sign in</Button>
//         <Modal
//           visible={visible}
//           title="Login/Register"
//           onOk={this.handleOk}
//           onCancel={this.handleCancel}
//           footer={[
//             <Button key="back" onClick={this.handleCancel}> Return </Button>,
//             <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}> Submit</Button> ]} 
//         >
//         ReactDOM.render(
//         <Layout>
//            <Login></Login>
//            <Register></Register>
//         </Layout>,
//         mountNode,
//         );
//         </Modal>
//       </>
//     );
//   }
// }

// ReactDOM.render(<App />, mountNode);




// // const {  } = Layout;

