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
        this.value -= 1;
    },

    setValue(newValue: number) {
        this.value = newValue;
    },
});
const NumberInput = observer(() => {
    return (
        <Box display="flex" alignItems="center">
            <Button
                variant="outlined"
                onClick={() => data.decrement()}
            >
                -
            </Button>

            <TextField
                type="number"
                value={data.value}
                onChange={e => data.setValue(Number(e.target.value))}
                variant="standard"
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    width: 43,
                }}
            />

            <Button
                variant="contained"
                onClick={() => data.increment()}
            >
                +
            </Button>
        </Box>
    );
});

export default NumberInput;
