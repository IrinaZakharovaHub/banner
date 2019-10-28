import React from 'react';
import styles from './App.module.css'
import TextList from '../TextList/TextList.js'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.isMoved = false;
        this.x = 0;
        this.y = 0;
    }

    state = {
        width: 100,
        height: 20,
        sizeValue: '%',
        left: 50,
        top: 50,
        scale: 1,
        x: 0,
        y: 0,
        background: {
            type: 'image',
            resource: 'url(./resources/img.jpg)'
        },
        layers: [
            {
                type: 'image',
                url: 'img.png',
                top: 0,
                left: 0,
                width: 35
            },
            {
                type: 'text',
                text: 'Hello',
                top: 30,
                left: 30,
                fontSize: 12,
                fontFace: ''
            }
        ],
        textId: 0
    };

    transform = () => {
        return {
            width: this.state.width + this.state.sizeValue,
            height: this.state.height + this.state.sizeValue,
            transform: 'scale(' + this.state.scale + ') translateX(' + this.state.x * (1 / this.state.scale) + 'px) translateY(' + this.state.y * (1 / this.state.scale) + 'px)'
        }
    };

    handleChange = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (() => {
            const _ = this;
            return function (e) {
                console.log(e.target.result);
                _.setState({
                    background: {
                        type: 'image',
                        resource: `url(${e.target.result})`
                    }
                });
            };
        })();
        reader.readAsDataURL(file);
    };

    addBackground = (obj) => {
        if (obj.type === 'fill') {
            return {background: obj.resource}
        }
        if (obj.type === 'image') {
            return {
                background: obj.resource,
                backgroundSize: 'contain'
            }
        }
    };

    changeCanvasWidth = (e) => {
        this.setState({
            width: e.target.value
        })
    };

    changeCanvasHeight = (e) => {
      this.setState({
          height: e.target.value
      })
    };

    handleWheel = (e) => {
        const delta = e.deltaY || e.detail;
        if (delta > 0) {
            this.setState({
                scale: this.state.scale + 0.05
            })
        } else {
            this.setState({
                scale: this.state.scale - 0.05
            })
        }

    };

    handleMouseDown = (e) => {
        e.persist();
        this.isMoved = true;
        this.x = e.clientX - this.x;
        this.y = e.clientY - this.y;
    };

    handleMouseMove = (e) => {
        e.persist();
        if (this.isMoved) {
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
    };

    render() {
        const layers = this.state.layers.map((el, i) => {
            return (
                <div key={i}>
                    {el.type}
                </div>
            )
        });
        return (
            <>
                <div className={styles.canvas}
                     onMouseUp={(e) => this.handleMouseUp(e)}
                     onMouseDown={(e) => this.handleMouseDown(e)}
                     onMouseMove={(e) => this.handleMouseMove(e)}
                     onWheel={(e) => this.handleWheel(e)}
                >
                    <div className={styles.bannerWrapper}
                         style={this.transform()}>
                        <div className={styles.background} style={this.addBackground(this.state.background)}>
                            {layers}
                        </div>
                    </div>
                </div>
                <div className={styles.menu}>
                    <div className={styles.menuItem}>
                        <label>
                            <span>
                                 Width
                            </span>
                            <input type="number" value={this.state.width} onChange={(e) => this.changeCanvasWidth(e)} min={1} max={100}/>
                            <span>%</span>
                        </label>
                    </div>
                    <div className={styles.menuItem}>
                        <label>
                            <span>
                                 Height
                            </span>
                            <input type="number" value={this.state.height} onChange={(e) => this.changeCanvasHeight(e)} min={1} max={100}/>
                            <span>%</span>
                        </label>
                    </div>
                    <div className={styles.fileLoader}>
                        <input type="file" onChange={this.handleChange}/>
                    </div>
                </div>
                {/*<button onClick={this.handleClick}>add text</button>*/}
                {/*<TextList list={this.state.texts}/>*/}
            </>
        )
    }
}