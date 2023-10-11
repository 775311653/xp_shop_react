import axios from "@/utils/request";

let productApi = {
    get_product_list(params: any = {}): Promise<any> {
        return axios.get('/product/list', {params});
    }
}

export default productApi;
