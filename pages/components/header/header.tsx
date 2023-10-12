import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './header.module.scss';
import cartPng from '@/public/brand/cart.png';
import Image from "next/image";

let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    cart_list: [],
    cart_total: 0,
    product_list: [],
});

async function get_shop_cart_list() {
    let res = await api.user.get_shop_cart_list();
    if (res.code !== 0) return;

    data.cart_list = res.result.data;
    data.cart_total = res.result.total;
}

async function get_product_list() {
    let res = await api.product.get_product_list();
    if (res.code !== 0) return;

    data.product_list = res.result.data;
}

function init(queryParams: {}) {
    get_shop_cart_list();
    get_product_list();
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
        <div className={css.container}>
            <span className={css.title}>标题</span>
            <div className={'flexGrow1'}></div>
            <div className={css.cartBox} onClick={() => {
                router.push('/shopCart');
            }}>
                {
                    data.cart_total > 0 ? (
                        <div className={css.number}>{data.cart_total}</div>
                    ) : null
                }
                <div className={css.imgBox}>
                    <Image src={'/brand/cart.png'} alt="" width={24} height={24} className={css.imgItem}/>
                </div>
            </div>
        </div>
    )
});

export default Brand;

