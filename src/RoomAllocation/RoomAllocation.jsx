import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import Room from '../Room/Room';

import "./RoomAllocation.scss"

// react
import React, { useEffect, useState } from 'react';

const RoomAllocation = ({
    guest,
    room,
    name = uuidv4(),
    onChange = (e) => { }
}) => {
    const [disabled, setDisabled] = useState(false);
    const [result, setResult] = useState([]);
    const [guestLeft, setGuestLeft] = useState(guest);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (guest === room) {
            setDisabled(true);
        }
        setInitialized(true);
    }, []);

    function handleRoomChange(index, e) {
        result[index] = { adult: e.adult, child: e.child };
        setResult(result);
        let tmp = guest;
        result.map((r) => {
            tmp -= r.adult;
            tmp -= r.child;
        });
        setGuestLeft(tmp);
        if (initialized) {
            onChange(result);
        }
    }

    function getMax(index) {
        if (!initialized) {
            return 4;
        }
        let total = result[index].adult + result[index].child;
        return Math.min(4, guestLeft + total);
    }

    const rooms = Array.from({ length: room }, (_, index) => {
        return (
            <div key={name + '-' + index}>
                <Room
                    max={getMax(index)}
                    name={name + '-' + index}
                    disabled={disabled}
                    onChange={(e) => handleRoomChange(index, e)}
                />
                {
                    (index !== (room - 1)) &&
                    <div>
                        ---
                    </div>
                }
            </div>
        );
    });

    return (
        <div className="RoomAllocation">
            <div className="RoomAllocationTitle">
                住客人數：{guest}人 / {room}房
            </div>
            <div className="RoomAllocationGuestLeft">
                尚未分配人數：{guestLeft}人
            </div>
            {rooms}
        </div>
    );
};

RoomAllocation.propTypes = {
    guest: PropTypes.number,
    room: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    customProp: function (props) {
        if (props["guest"] < props["room"]) {
            return new Error('There will be empty room.');
        }
        if (props["guest"] > props["room"] * 4) {
            return new Error('Rooms cannot contain all guests!');
        }
    }
};

export default RoomAllocation
