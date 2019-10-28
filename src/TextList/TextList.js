import React from 'react';

class TextList extends React.Component {
    render() {
        const list = this.props.list.map(el => {
            return <div key={el.id}>
                <div className="row">
                    Title: <input type="text"/>
                </div>
                <div className="row">
                    Size: <input type="text"/>
                </div>
                <div className="row">
                    Position: <input type="text"/>
                </div>
            </div>
        });
        return (
            <div> {list} </div>
        )
    }
}

export default TextList;