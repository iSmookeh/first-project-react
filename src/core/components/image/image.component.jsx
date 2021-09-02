import React from 'react';

const Component = (props) => {
    console.log(props);
    return (
        <div style={{...props, background:`linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 21%, rgba(38, 38, 38, 0.5) 88%),url(${props.image})`}}/> 
    );
}

export default Component;
