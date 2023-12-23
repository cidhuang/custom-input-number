import "./CustomInputNumber.scss"

// react
import React, { useEffect, useState, useRef } from 'react';

const CustomInputNumber = (props) => {

    return (
        <div className="flex">
            <div className="btn">
                -
            </div>
            <input type="number" className="content" defaultValue="2"></input>
            <div className="btn">
                +
            </div>
        </div>
    );
};

export default CustomInputNumber
