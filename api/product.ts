import axios from "@/utils/request";

let productApi = {
    get_product_list(params: any = {}): Promise<any> {
        return axios.get('/product/list', {params});
    },
    get_product_detail(id: number): Promise<any> {
        return axios.get(`/product/${id}`);
    }
}

export default productApi;
