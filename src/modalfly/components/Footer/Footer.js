import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export function Footer(props) {
    const [footerRef, setFooterRef] = useState(null);

    //When component  mounts, set footer reference
    useEffect(() => {
        //Query all footer areas    
        const elements = document.getElementsByClassName('mf-footer-area');
        //No do not set footer reference if elements is empty
        if (elements.length === 0) {
            return;
        }
        //Select the most recent addition, the div with no children
        let footerRef;
        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].hasChildNodes()) footerRef = elements[i];
        }

        var zIndex = Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function(el) {
            return +el.style.zIndex;
          })) + 10;
        footerRef.style.zIndex = zIndex * 2;

        setFooterRef(footerRef);
    }, []);

    if (footerRef) {
        //Render the buttons in the mf-footer div ('footerRef')
        return ReactDOM.createPortal(props.children, footerRef);
    } else {
        return null;
    }
}