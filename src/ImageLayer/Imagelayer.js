import React from 'react';
import '../animation.css';
import styles from '../Layers/Layers.module.css';
import { connect } from "react-redux";
import { deleteLayer, changeLayer } from '../redux/layers/layers.actions';

class ImageLayer extends React.Component {

    deleteLayer = (id) => {
        this.props.deleteLayer(id);
    }

    handleInputChange = (type, e, id) => {
        this.props.changeLayer(type, e.target.value, id);
    };

    addClass = (className, id) => {
        this.props.changeLayer('class','', id);
        setTimeout(()=>{
             this.props.changeLayer('class',className, id);
        },10);
    }

    handleFileChange = (type, e, id) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (() => {
            const _ = this;
            return function (e) {
                _.props.changeLayer(type,e.target.result, id);
            };
        })();
        reader.readAsDataURL(file);
    };
   
    render() {
        const imageLayers = this.props.layers.layers.filter(el=> {
            return el.type === 'image'
        })
        return (
            <>
                {imageLayers &&
                    imageLayers.map((el) => {
                        return (
                            <div key={el.id} className={styles.block} style={{order: el.order}}>
                                <div className={styles.delete} onClick={()=>this.deleteLayer(el.id)}>
                                    X 
                                </div> 
                                <div className={styles.row}>
                                    <label className={styles.label}>
                                        <div >
                                            Image:
                                        </div>
                                        <div className={styles.loader}>
                                             <input className={[styles.input].join(' ')} type="file" onChange={(e) => this.handleFileChange('image', e, el.id)}/>
                                        </div>
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
                                        <div className={styles.label}>
                                            Animation:
                                        </div>
                                </div>
                                <div className={styles.row}> 
                                
                                    {
                                            el.animations.map(animation=> {
                                            return (
                                                <button key={animation.className} className={[styles.buttonAnimation, ` ${el.className  === animation.className ? ' active' : null}`].join(' ')}  onClick={()=>this.addClass(animation.className, el.id )}>
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
        layers: state.layers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteLayer: (id) => dispatch(deleteLayer(id)),
        changeLayer: (type, value, id) => dispatch(changeLayer(type,value, id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ImageLayer);