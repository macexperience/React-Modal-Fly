//Modal-Fly default style
export const mfDefaultStyle = {
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.11)',
    width: '500px',
    display: 'grid',
    gridTemplateColumns: '2fr 14fr 2fr',
    gridTemplateRows: '70px auto 10px 80px',
    fontSize: '1em',
    minHeight: '35%',
    background: 'white',
    overflowX: 'hidden'
};
export const mfSmallStyle = { width: '300px' };
export const mfMediumStyle = { width: '500px' };
export const mfLargeStyle = { width: '800px' };
export const mfXLStyle = { width: '1140px' };

export const headerArea = {
    gridColumn: '1/4',
    gridRow: '1/2',
    background: '#ebebeb',
    borderRadius: '5px 5px 0 0',
    padding: '20px'
};

export const headerH3 = {
    margin: 0,
    padding: 0,
    fontSize: '1.7em',
    color: 'rgba(0,0,0,.7)'
};

export const closeBtn = {
    height: '25px',
    width: '25px',
    background: 'grey',
    textAlign: 'center'
};

/* Content Area */
export const contentArea = {
    gridColumn: '2/3',
    gridRow: '2/3',
    paddingTop: '20px',
    paddingBottom: '20px'
};


/* Progress Area */
export const progressArea = {
    gridColumn: '2/3',
    gridRow: '3/4',
    textAlign: 'center'   
};
export const progressDots = {
    height: '6px',
    width: '6px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
    marginLeft: '3px',
    marginRight: '3px'
};
export const activeProgressDot = {
    backgroundColor: 'black'
};


/* Footer Area */
export const footerArea = {
    gridColumn: '1/4',
    gridRow: '4/5',
    padding: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
};
export const footerLeft = { justifyContent: 'flex-start'};
export const footerCenter = { justifyContent: 'center'};
export const footerRight = { justifyContent: 'flex-end'};
export const footerSpaceBetween = { justifyContent: 'space-between'};
export const footerSpaceAround = { justifyContent: 'space-around'};
export const footerSpaceEvenly = { justifyContent: 'space-evenly'};


/* Close Modal Icon */
export const closeIcon = {
    gridColumn: '3/4',
    gridRow: '1/2',
    textAlign: 'center',
    lineHeight: '68px',
    color: '#aaa',
    fontSize: '26px',
    cursor: 'pointer'
};
export const closeIconHover = {
    color: '#606870',
    textDecoration: 'none',
    cursor: 'pointer'
};



