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
import {Big} from "big.js";

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
        spec_options: new Set(),
        unit_price: 0,
        quantity: 1,
        total_price: 0,
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
    data.product_detail.specifications.forEach((item: any) => {
        on_change_specification_option(item.options[0]);
    });

}

async function on_change_specification_option(select_spec_option: any) {
    // let select_spec_option = e.target.value;
    // 同一个规格，只能选择一个规格选项
    // 1. 先删除同一个规格下的所有规格选项
    data.form_data.spec_options.forEach((item: any) => {
        console.log('item.specificationId', item, select_spec_option);
        if (item.specificationId == select_spec_option.specificationId) {
            data.form_data.spec_options.delete(item);
        }
    });
    data.form_data.spec_options.add(select_spec_option);

    //通过用户选择的规格选项，找到对应的价格，在product_specifications中找，符合用户选择的规格选项的价格，只能是一样的
    data.unit_price = data.product_detail.product_specifications.find((item: any) => {
        console.log('item.specification_option_ids', JSON.parse(JSON.stringify(item.specification_option_ids)), JSON.parse(JSON.stringify(data.form_data.spec_options)));
        if (item.specification_option_ids.length !== data.form_data.spec_options.size) {
            return false;
        }
        let spec_option_ids = Array.from(data.form_data.spec_options).map((item: any) => {
            return Number(item.id)
        });
        for (const spec_option_id of item.specification_option_ids) {
            if (!spec_option_ids.includes(spec_option_id)) {
                return false;
            }
        }
        return true;
    })?.price ?? 0;
    data.form_data.total_price = new Big(data.unit_price).mul(data.form_data.quantity).toFixed(2);
}

async function on_change_quantity(quantity: any) {
    data.form_data.quantity = quantity;
    data.form_data.total_price = new Big(data.unit_price).mul(data.form_data.quantity).toFixed(2);
}

async function add_shop_cart() {
    // let res = await api.user.add_shop_cart({
    //     product_id: queryParams.id,
    //     quantity: data.form_data.quantity,
    //     spec_options: data.form_data.spec_options,
    // });
    // if (res.code !== 0) return;
    //
    // get_shop_cart_list();
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
                                    defaultValue={item.options[0]}
                                    onChange={(e) => {
                                        // let option_id = e.target.value;
                                        // let option = item.options.find((item: any) => {
                                        //     return item.id == option_id;
                                        // });
                                        on_change_specification_option(e.target.value);
                                    }}>
                                    {
                                        item.options?.map((option: any) => {
                                            return (
                                                <MenuItem key={option.id} value={option}>{option.value}</MenuItem>
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
                    <div className={css.price}>NT${data.form_data.total_price}</div>
                    <NumberInput
                        defaultValue={data.form_data.quantity}
                        onChange={(count) => {
                            on_change_quantity(count)
                        }}/>
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

