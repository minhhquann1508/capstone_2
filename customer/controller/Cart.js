class Cart {
    constructor () {
        this.list = [];
    }
    addNewItemToCart(id,name,price,img,quantity) {
        let findingProduct =  this.list.find((item) => Number(item.id) === Number(id));
        if(findingProduct != undefined) {  
            if(confirm("Sản phẩm này đã có trong giỏ hàng,bạn vẫn muốn thêm chứ ?")) {
                findingProduct.quantity = Number(findingProduct.quantity) + Number(quantity);
                console.log(findingProduct.quantity)
            }
            else {
                return;
            }
        }
        else {
            let product = new CartItem(id,name,price,img,quantity);
            this.list.push(product);
            alert("Thêm sản phẩm thành công");
        }
    }
    deleteCartItem (id) {
        let findingProductIndex =  this.list.findIndex((item) => Number(item.id) === Number(id));
        this.list.splice(findingProductIndex,1);
    }
}
Cart.prototype.calcTotalBill = function () {
    let sum = 0;
    this.list.forEach(item => {
        sum += item. calcTotal();
    });
    return sum;
}