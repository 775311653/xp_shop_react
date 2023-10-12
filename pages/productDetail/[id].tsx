import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './productDetail.module.scss';
import Image from "next/image";
import {Card, MenuItem, Select} from "@mui/material";
import NumberInput from "@/pages/components/numberInput/numberInput";
import Button from "@mui/material/Button";

let commonUtils = require("@/utils/Common.js");
let queryParams: any = {};
let history;
let router;
let data: any = observable({
    cart_list: [],
    cart_total: 0,
    product_list: [],
    product_detail: {},
    form_data: {
        specifications: [],
    },
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

async function get_product_detail() {
    if (!queryParams.id) return;
    let res = await api.product.get_product_detail(queryParams.id);
    if (res.code !== 0) return;

    data.product_detail = res.result;
}

function init(queryParams: {}) {
    get_shop_cart_list();
    get_product_list();
    get_product_detail();
}

let Brand = observer(() => {
    history = useHistory();
    router = useRouter();
    queryParams = router.query;

    useEffect(() => {
        init(queryParams);
    }, [queryParams.id]);

    if (!queryParams.id || commonUtils.isEmpty(data.product_detail)) {
        return (
            <div>
                没有该商品
            </div>
        )
    }
    return (
        <div className={css.container}>
            <div className={css.leftBox}>
                {data.product_detail.img_urls?.map((item: any) => {
                    return (
                        <img src={item} key={item} alt="" width={628} height={628} className={css.imgItem}/>
                    )
                })}
            </div>
            <div className={css.rightBox}>
                <div className={css.menuName}>首頁 / {data.product_detail.brand.name} /
                    <span className={'bold'}>{data.product_detail.name}</span></div>
                <div className={css.productName}>{data.product_detail.name}</div>
                <div className={css.num000}>0000000000</div>
                <div className={css.brandName}>Brand品牌｜{data.product_detail.brand.name}</div>
                <div className={css.introTitle1}>｜產品介紹｜</div>
                <div className={css.intro}>{data.product_detail.intro}</div>
                <div className={css.readMore}>閱讀更多</div>
                <div className={css.deliveryDate}>Expected delivery 預計出貨日｜<span>7~14</span>天</div>
                {
                    data.product_detail.specifications?.map((item: any) => {
                        return (
                            <div key={item.id} className={css.specBox}>
                                <div className={css.specTitle}>{item.name}</div>
                                <Select
                                    sx={{
                                        width: {
                                            xs: '200px',
                                            sm: '302px',
                                        },
                                        height: '40px',
                                    }}
                                    value={item.options[0].id}
                                    onChange={(value) => {
                                        data.form_data.specifications[item.id] = value;
                                    }}>
                                    {
                                        item.options?.map((item: any) => {
                                            return (
                                                <MenuItem key={item} value={item.id}>{item.value}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        )
                    })
                }
                <div className={css.rawPrice}>NT${data.product_detail.raw_price}</div>
                <div className={css.priceBox}>
                    <div className={css.price}>NT${data.product_detail.real_price}</div>
                    <NumberInput/>
                </div>
                <Button variant="contained" className={css.addCartBtn}>
                    <Image src={'/productDetail/whiteShopCart.svg'} alt="" width={20} height={20}/>
                    加入購物車
                </Button>
                <div className={css.tagBox}>
                    {data.product_detail.tags?.map((item: any) => {
                        return (
                            <div key={item.id} className={css.tag}>#{item.name}</div>
                        )
                    })}
                </div>
                <div className={css.prodDescTitle}>商品簡介</div>
                <div className={css.line}></div>
                <div className={css.prodDesc}>{data.product_detail.detail}</div>
            </div>
        </div>
    )
});

export default Brand;

