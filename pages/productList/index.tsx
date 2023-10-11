import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";

let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let data = observable({
    invoices: {},
    totalUnpaidAmount: 0,
});

function init(queryParams: {}) {

}

// let ProductList = observer(() => {
//     history = useHistory();
//     queryParams = commonUtils.query2ObjParams(useLocation().search);
//
//     useEffect(() => {
//         init(queryParams);
//     }, []);
//
//     return (
//         <div>
//             <div>ProductList</div>
//         </div>
//     )
// });


// export default ProductList;
export default function ProductList() {
    return <div>ssss</div>
};
