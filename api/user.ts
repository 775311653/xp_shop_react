import axios from "@/utils/request";

let userApi = {
    get_shop_cart_list(params: any = {}): Promise<any> {
        params.user_id = localStorage.getItem('user_id') ?? 1;
        return axios.get('/shopCart/list', {params});
    },
    add_shop_cart(params: any = {}): Promise<any> {
        params.user_id = localStorage.getItem('user_id') ?? 1;
        return axios.post('/shopCart', params);
    }
}

export default userApi;
