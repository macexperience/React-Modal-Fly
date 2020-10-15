import React, { useEffect, useState, useRef } from 'react';
import * as styles from '../styles/styles';

export function ModalflyContainer(props) {
    //show/hide overlay state hook
    const [showOverlay, setShowOverlay] = useState(false);
    let conRef = useRef();
    //Show/hide overlay div if there is at least one child.
    useEffect(() => {
        if (conRef.current.childElementCount > 0) {
            setShowOverlay(true);
        } else {
            setShowOverlay(false);
        }
    });
    //Create overlay div
    const overlay = (<div id='modalfly-overlay' style={styles.mfOverlay}></div>);

    return (
        <>
            {showOverlay ? overlay : null}
            <div ref={conRef} className='modalflycontainer' id='modalfly-container' style={styles.mfContainer}></div>
        </>
    );
}