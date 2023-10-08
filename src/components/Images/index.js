import React from 'react';
import {forwardRef} from 'react';
const Image = forwardRef(({ ...props },ref)=>{
    return <img ref={ref} {...props} alt='Nam' />;
})
export default Image;