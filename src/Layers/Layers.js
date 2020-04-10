import React from 'react';
import '../animation.css';
import styles from './Layers.module.css';
import { connect } from "react-redux";
import { addLayer, deleteLayer, changeLayer } from '../redux/layers/layers.actions';
import TextLayer from '../TextLayer/TextLayer';
import ImageLayer from '../ImageLayer/Imagelayer';

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
                animations: [
                    {
                        name: 'Fade in',
                        className:  'fade-in'
                    },
                    {
                        name: 'To top',
                        className:  'to-top'
                    }
                ]
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
                animations: [
                    {
                        name: 'Fade in',
                        className:  'fade-in'
                    },
                    {
                        name: 'To top',
                        className:  'to-top'
                    }
                ]
            });
        }
        this.setState({conter: this.state.counter++})
        console.log('count', this.state.counter);

    };

    render() {
        return (
            <>
                <div>
                     <button onClick={()=>this.addLayer('image')} className={styles.button}>1. Add all image layers</button>
                     <br/>
                     <button onClick={()=>this.addLayer('text')} className={styles.button}>2. Add all text layers</button>
                </div>
                <div className={styles.overflow}>
                    <ImageLayer/>
                    <TextLayer/>
                </div>
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
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Layers);