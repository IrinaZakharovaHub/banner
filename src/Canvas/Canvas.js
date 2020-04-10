import React from 'react';
import styles from './Canvas.module.css';
import {connect} from "react-redux";
import {changeHeight, changeWidth} from '../redux/bannerSize/banner.actions'


class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.isMoved = false;
        this.x = 0;
        this.y = 0;
    }

    state = {
        sizeValue: 'px',
        scale: 1,
        x: 0,
        y: 0
    };

    transformScale = () => {
        return {
            transform: 'scale(' + this.state.scale + ')'
        }
    };

    transformPosition = () => {
        return {
            transform: 'translateX(' + this.state.x * (1 / this.state.scale) + 'px) translateY(' + this.state.y * (1 / this.state.scale) + 'px)'
        }
    };

    getBannerSizes = () => {
        const width = this.props.bannerSize.width;
        const height = this.props.bannerSize.height;
        return {
            width: width + this.state.sizeValue,
            height: height + this.state.sizeValue
        }
    };

    handleWheel = (e) => {
        const delta = e.deltaY || e.detail;

        if (delta > 0) {
            if (this.state.scale >= 2) {
                this.setState({
                    scale: 2
                })
            } else {
                this.setState({
                    scale: this.state.scale + 0.05
                });
            }
        } else {
            if (this.state.scale <= 1) {
                this.setState({
                    scale: 1
                })
            } else {
                this.setState({
                    scale: this.state.scale - 0.05
                });
            }
        }

    };

    handleMouseDown = (e) => {
        e.persist();
        this.isMoved = true;
        this.x = e.clientX - this.x;
        this.y = e.clientY - this.y;
        console.log('START', this.x, this.y)
    };

    handleMouseMove = (e) => {
        e.persist();
        console.log('this', this.x, this.y);
        console.log('client',e.clientX,e.clientY);
        const width = this.canvas.current.offsetWidth;
        const height = this.canvas.current.offsetHeight;
        if (this.isMoved && (e.clientX > 100 && e.clientX < width - 100 && e.clientY > 100 && e.clientY < height - 100)) {
            this.setState({
                x: e.clientX - this.x,
                y: e.clientY - this.y
            });
        }
    };

    handleMouseUp = (e) => {
        e.persist();
        this.isMoved = false;
        this.x = e.clientX - this.x;
        this.y = e.clientY - this.y;
        console.log('END', this.x, this.y);
    };

    addBackground = (obj) => {
        if (obj.type === 'fill') {
            return {
                background: obj.resource,
                width: '100%',
                height: '100%',
            }
        }
        if (obj.type === 'image') {
            return {
                background: obj.resource,
                backgroundSize: 'contain',
                width: '100%',
                height: '100%',
            }
        }
    };

    render() {
        return (
            <>
                <div className={styles.canvas}
                     onWheel={(e) => this.handleWheel(e)}
                     style={this.transformScale()}
                >
                    <div  id='getBanner' className={styles.transparentCanvas}
                        //  onMouseUp={(e) => this.handleMouseUp(e)}
                        //  onMouseDown={(e) => this.handleMouseDown(e)}
                        //  onMouseMove={(e) => this.handleMouseMove(e)}
                        //  style={this.transformPosition()}
                         ref={this.canvas}
                    >
                        <div className={styles.bannerWrapper + ' bannerWrapper'}
                             style={{...this.getBannerSizes(), position: 'relative', overflow: 'hidden'}}
                        >
                            <div className={styles.background} style={this.addBackground(this.props.bannerBackground.background)}>
                                {
                                    this.props.layers.layers && this.props.layers.layers.map((el, i) => {
                                        if (el.type === 'image') {
                                            return (
                                                <img key={i} style={{
                                                    position: 'absolute', 
                                                    top: `${el.top}px`,
                                                    left: `${el.left}px`,
                                                    }}
                                                    src={el.image}
                                                    className={el.className}
                                                    />
                                              
                                            )
                                        }
                                        if (el.type === 'text') {
                                            return (
                                           <div key={i} style={{
                                               position: 'absolute', 
                                               fontSize: `${el.size}px`,
                                               top: `${el.top}px`,
                                               left: `${el.left}px`,
                                               fontFamily: `${el.family}`,
                                               color: el.color
                                               }}
                                               className={el.className}
                                               >
                                               {el.name}
                                           </div>
                                       )}
                                       
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);