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
    const [guest1, setGuest1] = useState(guest);
    const [room1, setRoom1] = useState(room);
    const [disabled, setDisabled] = useState(false);
    const [result, setResult] = useState([]);
    const [maxes, setMaxes] = useState([]);
    const [guestLeft, setGuestLeft] = useState(guest);

    useEffect(() => {
        if (guest < room) {
            return new Error('There will be empty room.');
        }
        if (guest > room * 4) {
            return new Error('Rooms cannot contain all guests!');
        }
        setGuest1(guest);
        setRoom1(room);
        setDisabled(guest == room);
        let tmp = [];
        let tmp2 = [];
        for (let i = 0; i < room; i++) {
            tmp.push({ adult: 1, child: 0 });
            tmp2.push(Math.min(4, guest - room + 1));
        }
        setResult(tmp);
        setMaxes(tmp2);
        setGuestLeft(guest - room);
        onChange(tmp);
    }, [guest, room]);

    function handleRoomChange(index, e) {
        if (e.adult === result[index].adult && e.child === result[index].child) {
            return;
        }

        result[index] = { adult: e.adult, child: e.child };
        setResult(result);

        let tmp1 = guest1;
        for (let i = 0; i < room1; i++) {
            tmp1 -= result[i].adult;
            tmp1 -= result[i].child;
        }
        setGuestLeft(tmp1);

        let tmp2 = [];
        for (let i = 0; i < room1; i++) {
            let total = result[i].adult + result[i].child;
            tmp2.push(Math.min(4, tmp1 + total));
        }
        setMaxes(tmp2);

        onChange(result);
    }

    return (
        <div className="RoomAllocation">
            <div className="c">
                住客人數：{guest1}人 / {room1}房
            </div>
            <div className="RoomAllocationGuestLeft">
                尚未分配人數：{guestLeft}人
            </div>
            {
                result.map((room, index, array) => {
                    return (
                        <div key={name + '-' + index}>
                            <Room
                                max={maxes[index]}
                                name={name + '-' + index}
                                adult0={result[index].adult}
                                child0={result[index].child}
                                disabled={disabled}
                                onChange={(e) => handleRoomChange(index, e)}
                            />
                            {
                                (index !== (result.length - 1)) &&
                                <hr className="RoomAllocationHR" />
                            }
                        </div>
                    );
                })
            }
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
