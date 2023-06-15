const url = `https://6471e5116a9370d5a41acc1a.mockapi.io/api/product`;
//giỏ hàng
let cart = new Cart()
//Lấy dữ liệu từ Api 
const fetchData = async () => {
    try {
        let res = await axios({
            url: url,
            method: "GET"
        })
        return res.data;
    }
    catch (error) {
        return error;
    }
}
window.addEventListener("DOMContentLoaded", function () {
    fetchData()
        .then((res) => {
            renderProductList(res);
        })
        .catch((err) => {
            console.log(err)
        })
})
getData();

