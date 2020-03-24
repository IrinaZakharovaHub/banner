import React from 'react';
import styles from './Layers.module.css';
import { connect } from "react-redux";
import { addLayer, deleteLayer, changeLayer } from '../redux/layers/layers.actions';

class Layers extends React.Component {


    addLayer = () => {
        this.props.addLayer({
            id: Math.floor(Math.random() * 10000),
            name: '',
            size: '32',
            top: 0,
            left: 0
        });
    };

    deleteLayer = (id) => {
        this.props.deleteLayer(id);
    }

    handleInputChange = (type, e, id) => {
        console.log('hndle ID', id)
        this.props.changeLayer(type, e.target.value, id);
    };

    render() {
        return (
            <>
                <div className=''>
                    <button onClick={this.addLayer} className={styles.button}>Add layer</button>
                </div>
                {this.props.layers.layers &&
                    <div className={styles.overflow}>
                        {this.props.layers.layers.map((el) => {
                            return (
                                <div key={el.id} className={styles.block}>
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
                                </div>
                            )
                        })}
                    </div>
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
        addLayer: (layer) => dispatch(addLayer(layer)),
        deleteLayer: (id) => dispatch(deleteLayer(id)),
        changeLayer: (type, value, id) => dispatch(changeLayer(type,value, id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Layers);