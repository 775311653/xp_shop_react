import React from 'react';
import {observer} from 'mobx-react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './numberInput.module.scss';
import cartPng from '@/public/brand/cart.png';
import Image from "next/image";

interface NumberInputProps {
    onChange?: (value: number) => void;
    defaultValue?: number;
}

let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    value: 0,
    increment() {
        this.value += 1;
    },

    decrement() {
        //最小值为1
        if (this.value <= 1) return;
        this.value -= 1;
    },

    setValue(newValue: number) {
        this.value = newValue;
    },
});

const NumberInput: React.FC<NumberInputProps> = observer(({onChange, defaultValue = 0}) => {
    const handleValueChange = (newValue: number) => {
        data.setValue(newValue);
        if (onChange) {
            onChange(newValue); // 调用传入的回调函数
        }
    };

    useEffect(() => {
        handleValueChange(defaultValue);
    }, []);

    return (
        <Box display="flex" alignItems="center">
            <Button
                variant="outlined"
                onClick={() => {
                    data.decrement();
                    if (onChange) {
                        onChange(data.value);
                    }
                }}
            >
                -
            </Button>

            <TextField
                type="number"
                value={data.value}
                inputProps={{
                    min: 1,
                    max: 999,
                }}
                onChange={e => handleValueChange(Number(e.target.value))}
                defaultValue={defaultValue}
                variant="standard"
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    width: 43,
                }}
            />

            <Button
                variant="contained"
                onClick={() => {
                    data.increment();
                    if (onChange) {
                        onChange(data.value);
                    }
                }}
            >
                +
            </Button>
        </Box>
    );
});

export default NumberInput;
