import React from 'react';
import styles from './Constructor.module.css';

class Constructor extends React.Component {
    getInnerHtml = () => {
        const banner = document.getElementById('getBanner');
        document.execCommand('copy', false, banner.innerHTML);
            var textArea = document.createElement("textarea");
            textArea.value = banner.innerHTML;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
          
            try {
              const successful = document.execCommand('copy');
              const msg = successful ? 'successful' : 'unsuccessful';
              console.log('Copying text command was ' + msg);
            } catch (err) {
              console.log('Oops, unable to copy');
            }
            document.body.removeChild(textArea);
    }

    render() {
        return (
            <div> 
                <button type="button" onClick={this.getInnerHtml} className={styles.button}>
                        COPY MY BANNER!
                </button>
            </div>
        )
    }
}

export default Constructor;