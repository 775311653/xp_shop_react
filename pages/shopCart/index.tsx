import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './shopCart.module.scss';
import Image from "next/image";
import {Button, Card} from "@mui/material";
import {Big} from "big.js";
import NumberInput from "@/pages/components/numberInput/numberInput";
import Message from "@/pages/components/message/message";

let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    cart_list: [],
    cart_total: 0,
    product_list: [],
    all_price: 0,
});

async function get_shop_cart_list() {
    let res = await api.user.get_shop_cart_list();
    if (res.code !== 0) return;

    data.cart_list = res.result.data;
    data.cart_total = res.result.total;
    refreshAllPrice();
}

async function get_product_list() {
    let res = await api.product.get_product_list();
    if (res.code !== 0) return;

    data.product_list = res.result.data;
}

async function refreshAllPrice() {
    let all_price = new Big(0);
    data.cart_list.forEach((item: any) => {
        console.log('shop_cart_item', JSON.parse(JSON.stringify(item)));
        let item_cart_shop_price = new Big(item.productSpecification.price);
        let item_quantity = new Big(item.count);
        let item_cart_shop_total_price = item_cart_shop_price.mul(item_quantity);
        all_price = all_price.add(item_cart_shop_total_price);
    });
    data.all_price = all_price.toNumber();
}

async function onChangeShopCartCount(item: any, count: number) {
    if (item.count === count) return;
    let res = await api.user.update_shop_cart({id: item.id, count: count});
    if (res.code !== 0) return;

    Message.success("修改成功");
    get_shop_cart_list();
}

async function delete_shop_cart(item: any) {
    let res = await api.user.delete_shop_cart({id: item.id});
    if (res.code !== 0) return;

    Message.success("刪除成功");
    get_shop_cart_list();
}

function init(queryParams: {}) {
    get_shop_cart_list();
}

function menuLayout(step: number, type: string) {
    let titleCN = "";
    let titleEN = "";
    switch (step) {
        case 1:
            titleCN = "確認購買清單";
            titleEN = "CHECK ORDER";
            break;
        case 2:
            titleCN = "填寫運送資料";
            titleEN = "WRITE THE ADD";
            break;
        case 3:
            titleCN = "購物完成";
            titleEN = "IT’S OK!";
            break;
    }
    return (
        <div className={css.menuItem}>
            <div className={css.numCircle}>{step}</div>
            <div className={css.menuTitleBox}>
                <div className={css.titleEn}>{titleEN}</div>
                <div className={css.titleCN}>{titleCN}</div>
            </div>
            {
                step != 3 ? (
                    <div className={css.line}></div>
                ) : null
            }
        </div>
    )
}

let ShopCart = observer(() => {
    history = useHistory();
    router = useRouter();
    queryParams = router.query;
    // console.log(JSON.parse(JSON.stringify(router)));

    useEffect(() => {
        init(queryParams);
    }, []);

    return (
        <div className={css.container}>
            <div className={css.menuBox}>
                {[
                    {step: 1, type: 'select'},
                    {step: 2, type: 'unSelect'},
                    {step: 3, type: 'unSelect'}
                ].map((item, index) => {
                    return menuLayout(item.step, item.type);
                })}
            </div>
            <div>
                {commonUtils.isEmpty(data.cart_list) ? (
                    <Card className={css.noDataBox}>
                        <div className={'flexGrow1'}></div>
                        <img src={'/brand/cart.png'} alt="" width={40} height={40} className={css.centerImg}/>
                        <div className={css.title}>購物車內尚無商品，趕快去選購吧！</div>
                        <Button variant="contained" color="primary"
                                className={css.btnBuy}
                                onClick={() => {
                                    router.push('/brand');
                                }}>
                            <Image src={'/productDetail/whiteShopCart.svg'} alt="" width={20} height={20}
                                   className={css.imgItem}/>
                            去選購
                        </Button>
                    </Card>
                ) : (
                    <div className={css.middleBox}>
                        {data.cart_list.map((shop_cart: any, index) => {
                            return (
                                <Card key={index} className={css.shopCartItem}>
                                    <img src={shop_cart.product.main_img_url} alt="" width={141} height={141}
                                         className={css.imgItem}/>
                                    <div className={css.contentBox}>
                                        <div className={css.leftBox}>
                                            <div className={css.title}>{shop_cart.product.name}</div>
                                            <div
                                                className={css.specTitle}>{shop_cart.specOptions.map((option: any, index: number) => {
                                                return `${option.specification.name} ${option.value}${index === shop_cart.specOptions.length - 1 ? '' : ', '}`
                                            })}</div>

                                            <div className={'flexGrow1'}></div>
                                            <div className={css.priceBox}>
                                                {shop_cart.product.raw_price ? (
                                                    <div className={css.rawPrice}>NT${shop_cart.product.raw_price}</div>
                                                ) : null}
                                                <div
                                                    className={css.realPrice}>NT${shop_cart.productSpecification.price} x {shop_cart.count}</div>
                                                <div
                                                    className={css.sumPrice}>NT${Big(shop_cart.productSpecification.price).mul(shop_cart.count).toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className={'flexGrow1'}></div>
                                        <div className={css.rightBox}>
                                            <div className={css.closeImg} onClick={() => {
                                                delete_shop_cart(shop_cart);
                                            }}>
                                                <Image src={'/shopCart/close.svg'} alt="" width={16} height={16}/>
                                            </div>
                                            <div className={'flexGrow1'}></div>
                                            <NumberInput key={shop_cart.id} defaultValue={shop_cart.count}
                                                         onChange={(count) => {
                                                             onChangeShopCartCount(shop_cart, count);
                                                         }}/>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                        <div className={css.sumBox}>
                            <Card className={css.cardSum}>
                                <div className={css.title}>總計</div>
                                <div className={css.price}>NT${data.all_price}</div>
                            </Card>
                            <Button variant="contained" color="primary"
                                    className={css.btnPay}
                                    onClick={() => {
                                        Message.info("結帳去");
                                    }}>
                                <Image src={'/productDetail/whiteShopCart.svg'} alt="" width={20} height={20}/>
                                結帳去
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
});

export default ShopCart;

