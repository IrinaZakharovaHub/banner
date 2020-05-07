import React from 'react';
import '../animation.css';
import styles from './Layers.module.css';
import { connect } from "react-redux";
import { addLayer, deleteLayer, changeLayer, restart } from '../redux/layers/layers.actions';
import TextLayer from '../TextLayer/TextLayer';
import ImageLayer from '../ImageLayer/Imagelayer';
import {animations} from '../helpers/animations';

class Layers extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        counter: 0
    };


    addLayer = (type) => {
        if (type === 'text') {
                this.props.addLayer({
                type: 'text',
                id: Math.floor(Math.random() * 10000),
                name: '',
                size: '32',
                top: 0,
                left: 0,
                className: '',
                order: `${this.state.counter}`,
                animations
            });
        }
        if (type === 'image') {
            this.props.addLayer({
                type: 'image',
                id: Math.floor(Math.random() * 10000),
                image: '',
                top: 0,
                left: 0,
                className: '',
                order: this.state.counter,
                animations
            });
        }
        this.setState({conter: this.state.counter++})
        console.log('count', this.state.counter);
    };

    restart  = () => {
      this.props.restart(true);
    }

    render() {
        return (
            <>
                <div>
                     <button onClick={()=>this.addLayer('image')} className={styles.button}> Add image</button>
                     <br/>
                     <button onClick={()=>this.addLayer('text')} className={styles.button}>Add text </button>
                </div>
                <div className={styles.overflow}>
                    <ImageLayer/>
                    <TextLayer/>
                </div>
                <button onClick={this.restart}>
                    RESTART
                </button>
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
        restart: (bool)=> dispatch(restart(bool))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Layers);