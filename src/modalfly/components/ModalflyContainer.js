import React from 'react';
import './styles.css';

const containerStyle = {
    zIndex: '1000'
}

export function ModalflyContainer(props) {
    return <div id='modalfly-container' style={containerStyle}></div>;
}