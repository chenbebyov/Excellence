import React from 'react';
import {connect} from 'react-redux';

function Home(props) {

    const {user} = props;

    return (
        <div>
            <h1>connected user {user.name}</h1>
        </div>
    );
}

export default connect(
    (state) => {
        return {
            user : state.user
        }
    },
    null
)(Home);