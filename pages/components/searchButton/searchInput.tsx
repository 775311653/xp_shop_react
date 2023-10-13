import React from 'react';
import {observer} from 'mobx-react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {observable} from "mobx";
import {useLocalObservable} from 'mobx-react-lite';


import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './searchInput.module.scss';
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

// @ts-ignore
const SearchInput = observer(({onSearchInput}) => {
    const data = useLocalObservable(() => ({
        inputValue: "",
    }));

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        data.inputValue = value;
    };

    const handleSearch = () => {
        if (onSearchInput) {
            onSearchInput(data.inputValue);
        }
    };

    return (
        <div>
            <TextField
                value={data.inputValue}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
            >
                Search
            </Button>
        </div>
    );
});

export default SearchInput;
