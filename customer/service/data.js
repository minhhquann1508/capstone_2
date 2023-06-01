//Lưu sản phẩm vào localStorage
const saveData = () => {
    let list = cart.list.map((item) => {
        const {id,name,price,img,quantity} = item;
        const total = item.calcTotal();
        return {id,name,price,img,quantity,total};
    })
    let json = JSON.stringify(list);
    localStorage.setItem("cart",json);
}

//Lấy sản phẩm từ localStorage
const getData = () => {
    let json = localStorage.getItem("cart");
    let data = JSON.parse(json);
    if(json !== null) {
        let cartList = data.map((item) => {
            const {id,name,price,img,quantity} = item;
            let product =  new CartItem(id,name,price,img,quantity);
            item.total = CartItem.prototype.calcTotal();
            return product;
        })
        cart.list = cartList;
    }
    else {
        cart.list = [];
    }
    
}

//clear giỏ hàng khi bấm thanh toán
const handlePayEvent = () => {
    if(confirm("Bạn chắc chắn muốn thanh toán hết chứ ?")) {
        localStorage.removeItem("cart");
        getData();
        renderCart();
        alert("Thanh toán thành công");
    }
    else {
        return;
    }
}