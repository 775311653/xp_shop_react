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
import {Alert, Snackbar} from "@mui/material";

let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    open: false,
    message: "",
    severity: 'info' as "info" | "error" | "warning" | "success",
    showMessage(msg: string, severityType: "info" | "error" | "warning" | "success" = "info") {
        this.message = msg;
        this.severity = severityType;
        this.open = true;
    },
    closeMessage() {
        this.open = false;
    }
});

const ToastComponent = observer(() => {
    return (
        <Snackbar open={data.open} autoHideDuration={3000} onClose={() => data.closeMessage()}>
            <Alert onClose={() => data.closeMessage()} severity={data.severity} variant="filled">
                {data.message}
            </Alert>
        </Snackbar>
    )
});

const Message = {
    info: (msg: string) => data.showMessage(msg, "info"),
    error: (msg: string) => data.showMessage(msg, "error"),
    warning: (msg: string) => data.showMessage(msg, "warning"),
    success: (msg: string) => data.showMessage(msg, "success"),
    Component: ToastComponent
};

export default Message;
