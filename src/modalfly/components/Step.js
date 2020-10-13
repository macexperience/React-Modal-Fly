import React from 'react';

export function Step(props) {
    return (
        <div title={props.title} className={props.className} style={props.style}>
            {props.children}
        </div>
    );
};