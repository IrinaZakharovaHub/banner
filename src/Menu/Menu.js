import React from 'react';
import styles from './Menu.module.css';
import {connect} from "react-redux";
import {changeHeight, changeWidth} from '../redux/bannerSize/banner.actions';
import {changeBackground} from '../redux/bannerBackground/bannerBackground.actions';
import Layers from '../Layers/Layers';
import Constructor from '../Constructor/Constructor';

class Menu extends React.Component {

    state = {
        width: 0,
        height: 0,
        background: this.props.bannerBackground.background,
        inputValue: ''
    };

    handleChange = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (() => {
            const _ = this;
            return function (e) {
                _.setState({
                    background: {
                        type: 'image',
                        resource: `url(${e.target.result})`
                    }
                });
                _.props.changeBackground({
                    type: 'image',
                    resource: `url(${e.target.result})`
                })
            };
        })();
        reader.readAsDataURL(file);
    };


    changeCanvasWidth = (e) => {
        this.setState({
            width: e.target.value
        });
        this.props.changeWidth(e.target.value)
    };

    changeCanvasHeight = (e) => {
        this.setState({
            height: e.target.value
        });
        this.props.changeHeight(e.target.value)
    };

    addLayer = () => {
        if (this.state.inputValue) {
            this.props.addLayer({'name': this.state.inputValue});
            this.setState({
                inputValue: ''
            });
        }
    };

    handleInputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    };

    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.menuItem}>
                    <label>
                            <span>
                                 Width
                            </span>
                        <input type="number" value={this.props.bannerSize.width}
                               onChange={(e) => this.changeCanvasWidth(e)} min={1} max={1200}/>
                        <span>px</span>
                    </label>
                </div>
                <div className={styles.menuItem}>
                    <label>
                            <span>
                                 Height
                            </span>
                        <input type="number" value={this.props.bannerSize.height}
                               onChange={(e) => this.changeCanvasHeight(e)} min={1} max={900}/>
                        <span>px</span>
                    </label>
                </div>
                <div className={styles.fileLoader}>
                    <input type="file" onChange={this.handleChange}/>
                </div>
                <Layers/>
                <Constructor/>
                <div>----------------</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bannerSize: state.bannerSize,
        bannerBackground: state.bannerBackground
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        changeHeight: (height) => dispatch(changeHeight(height)),
        changeWidth: (width) => dispatch(changeWidth(width)),
        changeBackground: (obj) => dispatch(changeBackground(obj))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Menu);