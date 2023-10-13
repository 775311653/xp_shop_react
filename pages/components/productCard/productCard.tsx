import React from 'react';
import {observer} from 'mobx-react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {useLocalObservable} from 'mobx-react-lite';
import css from './productCard.module.scss';
import {Card, Hidden} from "_@mui_material@5.14.13@@mui/material";
import {useRouter} from "next/router";
import Image from "next/image";
import {FavoriteBorder} from "@mui/icons-material";

// @ts-ignore
const ProductCard = observer(({productData, className = ''}) => {
    const data = useLocalObservable(() => ({
        product: productData,
    }));
    const router = useRouter();

    return (
        <Card key={data.product} className={css.productCardBox + ' ' + className} onClick={() => {
            router.push(`/productDetail/${data.product.id}`);
        }}>
            <img src={data.product.main_img_url} alt="" className={css.imgItem}/>
            <div className={css.descBox}>
                <Hidden smDown>
                    <div className={css.productName}>{data.product.name}</div>
                    <div className={css.brandName}>{data.product?.brand?.name}</div>
                </Hidden>
                <Hidden smUp>
                    <div className={css.brandName}>{data.product?.brand?.name}</div>
                    <div className={css.productName}>{data.product.name}</div>
                </Hidden>
                <div className={css.priceBox}>
                    <span className={css.realPrice}>NT${data.product.real_price}</span>
                    {
                        data.product.raw_price ? (
                            <span className={css.rawPrice}>NT${data.product.raw_price}</span>
                        ) : null
                    }
                </div>
                <div className={css.addCartBox}>
                    <div className={css.cartBox}>
                        <Image src={'/brand/cart.png'} alt="" width={20} height={20} className={css.imgCart}/>
                        <div className={css.addStr}>加入</div>
                    </div>
                    <FavoriteBorder className={css.favoriteIcon}/>
                </div>
            </div>
        </Card>
    );
});

export default ProductCard;
