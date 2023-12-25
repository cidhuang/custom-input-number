import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import CustomInputNumber from '../CustomInputNumber/CustomInputNumber';

import "./Room.scss"

// react
import React, { useEffect, useState } from 'react';

const Room = ({
    max = 4,
    name = uuidv4(),
    disabled = false,
    adult0 = 1,
    child0 = 0,
    onChange = (e) => { }
}) => {
    const [adult, setAdult] = useState(adult0);
    const [child, setChild] = useState(child0);

    useEffect(() => {
        setAdult(adult0);
    }, [adult0]);

    useEffect(() => {
        setChild(child0);
    }, [child0]);

    useEffect(() => {
        onChange({ name: name, adult: adult, child: child });
    }, [adult, child]);

    function handleChangeAdult(e) {
        setAdult(parseFloat(e.target.value));
    }

    function handleChangeChild(e) {
        setChild(parseFloat(e.target.value));
    }

    return (
        <div className="Room">
            <div className="RoomTitle">
                房間：{adult + child}人
            </div>
            <div className="RoomFlex">
                <div className="RoomLabel">
                    <div>大人</div>
                    <div className="RoomAge">年齡 20+</div>
                </div>
                <div className="RoomInput">
                    <CustomInputNumber
                        min={1}
                        max={max - child}
                        step={1}
                        name={name + "-adult"}
                        value={adult}
                        disabled={disabled}
                        onChange={handleChangeAdult}
                    />
                </div>
            </div>
            <div></div>
            <div className="RoomFlex">
                <div className="RoomLabel">
                    小孩
                </div>
                <div className="RoomInput">
                    <CustomInputNumber
                        min={0}
                        max={max - adult}
                        step={1}
                        name={name + "-child"}
                        value={child}
                        disabled={disabled}
                        onChange={handleChangeChild}
                    />
                </div>
            </div>
        </div>
    );
};

Room.propTypes = {
    max: PropTypes.number,
    name: PropTypes.string,
    adult0: PropTypes.number,
    child0: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Room
