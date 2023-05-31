class CartItem {
    constructor (id,name,price,img,quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quantity = quantity
    }
}
CartItem.prototype.calcTotal = function () {
    return this.price * this.quantity;
}