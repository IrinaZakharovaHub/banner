import React from 'react';
import styles from './Menu.module.css';
import {connect} from "react-redux";
import {changeHeight, changeWidth} from '../redux/bannerSize/banner.actions';
import {changeBackground} from '../redux/bannerBackground/bannerBackground.actions';

class Menu extends React.Component {

    state = {
        width: 0,
        height: 0,
        background: {
            type: 'image',
            resource: 'url(./resources/img.jpg)'
        }
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
    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.menuItem}>
                    <label>
                            <span>
                                 Width
                            </span>
                        <input type="number" value={this.props.bannerSize.width}
                               onChange={(e) => this.changeCanvasWidth(e)} min={1} max={100}/>
                        <span>%</span>
                    </label>
                </div>
                <div className={styles.menuItem}>
                    <label>
                            <span>
                                 Height
                            </span>
                        <input type="number" value={this.props.bannerSize.height}
                               onChange={(e) => this.changeCanvasHeight(e)} min={1} max={100}/>
                        <span>%</span>
                    </label>
                </div>
                <div className={styles.fileLoader}>
                    <input type="file" onChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bannerSize: state.bannerSize
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeHeight: (height) => dispatch(changeHeight(height)),
    changeWidth: (width) => dispatch(changeWidth(width)),
    changeBackground: (obj) => dispatch(changeBackground(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);