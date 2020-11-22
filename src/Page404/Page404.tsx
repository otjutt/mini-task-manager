import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

interface RootState {
    isOn: boolean
}

interface OwnProps {

}

class Page404 extends React.Component {

    componentDidMount() {
        document.body.removeAttribute('class');
        document.body.classList.add('component-page-home');
    }

    render() {
        return (
            <React.Fragment>
                <h1>404!</h1>
            </React.Fragment>
        );
    }
}



const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page404));
