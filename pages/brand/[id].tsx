import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './brand.module.scss';
import Image from "next/image";
import {Card, Hidden} from "@mui/material";
import SearchInput from "@/pages/components/searchButton/searchInput";
import {MenuItem, Select} from "_@mui_material@5.14.13@@mui/material";

let commonUtils = require("@/utils/Common.js");
let queryParams: any = {
    id: 1,
};
let history;
let router;
let data: any = observable({
    cart_list: [],
    cart_total: 0,
    product_list: [],
    sort_array: [{
        label: '依價格多到少排序',
        value: 'DESC',
    }, {
        label: '依價格少到多排序',
        value: 'ASC',
    }],
    form_data: {},
});

async function get_shop_cart_list() {
    let res = await api.user.get_shop_cart_list();
    if (res.code !== 0) return;

    data.cart_list = res.result.data;
    data.cart_total = res.result.total;
}

async function get_product_list(params: any = {}) {
    if (!queryParams.id) {
        params.brand_id = queryParams.id;
    }
    let res = await api.product.get_product_list(params);
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
    }, [queryParams.id]);

    return (
        <div className={css.container}>
            <Hidden smDown>
                <div className={css.topBox}>
                    <div className={css.titleBox}><span className={css.title}>首页</span>/</div>
                </div>
                <Image src={'/brand/banner.png'} alt="" width={1440} height={400} className={css.banner}
                       objectFit={'scale-down'}/>
            </Hidden>
            <Hidden smUp>
                <SearchInput className={css.searchBox} onSearchInput={(searchStr: any) => {
                    data.form_data.product_name = searchStr;
                    get_product_list(data.form_data);
                }}/>
                <Select
                    sx={{
                        height: '40px',
                    }}
                    className={css.selectBox}
                    defaultValue={data.sort_array[0].value}>
                    {
                        data.sort_array?.map((sort: any) => {
                            return (
                                <MenuItem
                                    key={sort.label}
                                    value={sort.value}
                                    onClick={() => {
                                        data.form_data.real_price_sort = sort.value;
                                        get_product_list(data.form_data);
                                    }}
                                >{sort.label}</MenuItem>
                            )
                        })
                    }
                </Select>
            </Hidden>
            <div className={css.productListBox}>
                {
                    data.product_list.map((item: any) => {
                        return (
                            <Card key={item} className={css.productCardBox} onClick={() => {
                                router.push(`/productDetail/${item.id}`);
                            }}>
                                <img src={item.main_img_url} alt="" className={css.imgItem}/>
                                <div className={css.descBox}>
                                    <Hidden smDown>
                                        <div className={css.productName}>{item.name}</div>
                                        <div className={css.brandName}>{item?.brand?.name}</div>
                                    </Hidden>
                                    <Hidden smUp>
                                        <div className={css.brandName}>{item?.brand?.name}</div>
                                        <div className={css.productName}>{item.name}</div>
                                    </Hidden>
                                    <div className={css.priceBox}>
                                        <span className={css.realPrice}>NT${item.real_price}</span>
                                        {
                                            item.raw_price ? (
                                                <span className={css.rawPrice}>NT${item.raw_price}</span>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
});

export default Brand;

