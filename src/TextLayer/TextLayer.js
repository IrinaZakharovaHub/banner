import React from 'react';
import '../animation.css';
import styles from '../Layers/Layers.module.css';
import { connect } from "react-redux";
import { deleteLayer, changeLayer, restart } from '../redux/layers/layers.actions';

class TextLayer extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {}
    }

    static getDerivedStateFromProps(props) {
        if (props.layers.restart === true) {
            props.restart(false);
            props.layers.layers.forEach(el=>{
                if (el.className) {
                    props.changeLayer('class','', el.id);
                    setTimeout(()=>{
                        props.changeLayer('class', el.className, el.id);
                    },10);
                }
            })
            
        }
    }

    deleteLayer = (id) => {
        this.props.deleteLayer(id);
    }

    handleInputChange = (type, e, id) => {
        console.log('hndle ID', id)
        this.props.changeLayer(type, e.target.value, id);
    };

    addClass = (className, id) => {
        this.props.changeLayer('class','', id);
        setTimeout(()=>{
             this.props.changeLayer('class',className, id);
        },10);
        this.props.restart(false);
    }

    render() {
        const textLayers = this.props.layers.layers.filter(el=> {
            return el.type === 'text'
        })
        return (
            <>
                {
                textLayers &&
                    textLayers.map((el) => {
                            return (
                                <div key={el.id} className={styles.block} style={{order: el.order}}>
                                    <div className={styles.delete} onClick={()=>this.deleteLayer(el.id)}>
                                        X 
                                    </div> 
                                    <div className={styles.row}>
                                        <label className={styles.label}>
                                            <div >
                                                Font size:
                                            </div>
                                            <input className={[styles.input, styles.small].join(' ')} type="number" onChange={(e) => this.handleInputChange('size', e, el.id)} value={el.size} />
                                            px
                                        </label>
                                        <label>
                                            <div className={styles.label}>
                                                Text:
                                            </div>
                                            <input className={styles.input} type="text" onChange={(e) => this.handleInputChange('name', e, el.id)} value={el.name} />
                                        </label>
                                    </div>
                                    <div className={styles.row}>
                                    <label className={styles.label}>
                                            <div >
                                               Top:
                                            </div>
                                            <input className={[styles.input, styles.small].join(' ')} type="number" onChange={(e) => this.handleInputChange('top', e, el.id)} value={el.top} />
                                            px
                                        </label>
                                        <label>
                                            <div className={styles.label}>
                                                Left:
                                            </div>
                                            <input className={[styles.input, styles.small].join(' ')} type="number" onChange={(e) => this.handleInputChange('left', e, el.id)} value={el.left} />
                                            px
                                        </label>
                                    </div>
                                    <div className={styles.row}>
                                        <label>
                                            <div className={styles.label}>
                                            Font-family:
                                            </div>
                                            <input className={styles.input} type="text" onChange={(e) => this.handleInputChange('font-family', e, el.id)} value={el.family}  list="fonts"/>
                                            <datalist id="fonts">
                                                <option value="Arial, Helvetica, sans-serif" />
                                                <option value="'Arial Black', Gadget, sans-serif" />
                                                <option value="'Comic Sans MS', cursive" />
                                                <option value="'Courier New', Courier, monospace" />
                                                <option value="Georgia, serif" />
                                                <option value="Impact,Charcoal, sans-serif" />
                                                <option value="'Lucida Console', Monaco, monospace" />
                                                <option value="Tahoma, Geneva, sans-serif" />
                                                <option value="'Times New Roman', Times, serif" />
                                                <option value="Verdana, Geneva, sans-serif" />
                                            </datalist>
                                        </label>
                                    </div>
                                    <div className={styles.row}>
                                        <label>
                                            <div className={styles.label}>
                                            Color:
                                            </div>
                                            <input className={styles.input} type="color" onChange={(e) => this.handleInputChange('color', e, el.id)} value={el.color} />
                                        </label>
                                    </div>
                                    <div className={styles.row}>
                                         <div className={styles.label}>
                                             Animation:
                                         </div>
                                    </div>
                                    <div className={styles.row}> 
                                        {
                                              el.animations.map(animation=> {
                                                return (

                                                    <button key={animation.className} className={[styles.buttonAnimation, ` ${el.className  === animation.className ? ' active' : null}`].join(' ')} 
                                                        onClick={()=>this.addClass(animation.className, el.id )}>
                                                    {animation.name}
                                                </button>  
                                                )
                                            })
                                        }
                                        <button className={styles.remove} onClick={()=>this.addClass('', el.id )}>Remove animation</button>
                                    </div>
                                </div>
                            )
                        })
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        layers: state.layers,
        restart: state.restart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteLayer: (id) => dispatch(deleteLayer(id)),
        changeLayer: (type, value, id) => dispatch(changeLayer(type,value, id)),
        restart: (bool)=> dispatch(restart(bool))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TextLayer);