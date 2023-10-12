import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {NextRouter, useRouter} from 'next/router';
import api from "@/api";
import css from './header.module.scss';
import cartPng from '@/public/brand/cart.png';
import Image from "next/image";
import {Button, Dialog, Input} from "@mui/material";

let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router: NextRouter;
let data: any = observable({
    cart_list: [],
    cart_total: 0,
    product_list: [],
    is_show_dialog: false,
    user_id: 1,
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
    data.user_id = window.localStorage.getItem('user_id') || 1;
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
            <Button onClick={() => {
                data.is_show_dialog = true;
            }}>切换用户</Button>
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
            <Dialog open={data.is_show_dialog} onClose={() => {
            }}>
                <div>
                    <div>切换用户</div>
                    <Input
                        type={'number'}
                        placeholder={'请输入用户id'} value={data.user_id} onChange={(e) => {
                        data.user_id = e.target.value;
                    }}></Input>
                    <div>由于没写用户功能，这里直接切换用户id,表示该用户已登录。</div>
                    <Button onClick={() => {
                        data.is_show_dialog = false;
                        window.localStorage.setItem('user_id', data.user_id);
                        router.reload();
                    }}>确定</Button>
                </div>
            </Dialog>
        </div>
    )
});

export default Brand;

