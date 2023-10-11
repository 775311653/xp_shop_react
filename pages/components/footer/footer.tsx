import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './footer.module.scss';
import cartPng from '@/public/brand/cart.png';
import Image from "next/image";
import Link from "_next@12.3.4@next/link";

let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    cart_list: [],
    cart_total: 0,
    product_list: [],
});

function init(queryParams: {}) {
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
            <div>
                <div>homchoo.com 關於家的想像 唯有獨一無二的記憶</div>
                <div>
                    <div>地址：台中市南屯區文心南路39號</div>
                    <div>Email：service@homchoo.com</div>
                    <div>連絡電話：04-24966116</div>
                </div>
                <div className={'flexGrow1'}></div>
                <div>
                    <div>
                        <div>SHOPPING</div>
                        <Link href={'/'}><a className={'link'}>購物須知</a></Link>
                        <Link href={'/'}><a className={'link'}>常見問題Q&A</a></Link>
                        <Link href={'/'}><a className={'link'}>優惠碼使用規則</a></Link>
                    </div>
                    <div>
                        <div>CUSTOMER</div>
                        <Link href={'/'}><a className={'link'}>會員制度說明</a></Link>
                        <Link href={'/'}><a className={'link'}>隱私權政策</a></Link>
                        <Link href={'/'}><a className={'link'}>合作聯繫homchoo</a></Link>
                    </div>
                    <div>
                        <div>FOLLOWUS</div>
                        <Link href={'/'}><a className={'link'}>Facebook</a></Link>
                        <Link href={'/'}><a className={'link'}>Instagram</a></Link>
                        <Link href={'/'}><a className={'link'}>Line@</a></Link>
                    </div>
                </div>
            </div>
            <div>版權所有 © homchoo | 觀境設計股份有限公司 FISHBONE Design Co., Ltd. All rights reserved.</div>
        </div>
    )
});

export default Brand;

