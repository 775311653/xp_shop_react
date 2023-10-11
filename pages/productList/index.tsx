import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import { useRouter } from 'next/router';


let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    invoices: {},
    totalUnpaidAmount: 0,
});

function init(queryParams: {}) {

}

let ProductList = observer(() => {
    history = useHistory();
    router = useRouter();
    queryParams = router.query;
    // console.log(JSON.parse(JSON.stringify(router)));

    useEffect(() => {
        init(queryParams);
    }, []);

    return (
        <div>
            <div>ProductList</div>
        </div>
    )
});

export default ProductList;

