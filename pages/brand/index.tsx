import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";


let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    cart_list: [],
    cart_total: 0,
});

async function get_shop_cart_list() {
    let res = await api.user.get_shop_cart_list();
    if (res.code !== 0) return;

    data.cart_list = res.result.data;
    data.cart_total = res.result.total;
}

function init(queryParams: {}) {
    get_shop_cart_list();
}

let Brand = observer(() => {
    history = useHistory();
    router = useRouter();
    queryParams = router.query;
    // console.log(JSON.parse(JSON.stringify(router)));

    useEffect(() => {
        init(queryParams);
    }, []);

    return (
        <div>
            <div>Brand</div>
            <div>cart_list :{JSON.stringify(data.cart_list[0])}</div>
            <div>cart count :{data.cart_total}</div>
        </div>
    )
});

export default Brand;

