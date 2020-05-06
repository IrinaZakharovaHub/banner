import React from 'react';
import {connect} from "react-redux";
import {changeHeight, changeWidth} from '../redux/bannerSize/banner.actions'
import Menu from '../Menu/Menu';
import Canvas from '../Canvas/Canvas';


class App extends React.Component {

    render() {
        return (
            <>
                <Canvas/>
                <Menu/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bannerSize: state.bannerSize,
        bannerBackground: state.bannerBackground,
        layers: state.layers
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeHeight: (height) => dispatch(changeHeight(height)),
    changeWidth: (width) => dispatch(changeWidth(width))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);