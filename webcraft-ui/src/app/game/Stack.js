
class Stack {

    constructor(itemsCount, itemId, location, name, idIncrement = 0) {

        this.location = location;
        this._stackId = Date.now() + idIncrement;
        this._itemId = itemId;
        this._itemsCount = itemsCount;
        this.itemName = name;
        
        this.class = `icon-minecraft-${this.itemName.toLowerCase().replaceAll("_", '-').replaceAll(" ", '-')}`
    }

    get stackId() {
        return this._stackId;
    }

    get count() {
        return this._itemsCount;
    }

    get itemId() {
        return this._itemId;
    }

    view() {

        
        let stackHtml = `<div data-count="${this._itemsCount > 1 ? this._itemsCount : ""}" data-stack-id="${this._stackId}" class="item">a</div>`
         stackHtml = `<div data-count="${this._itemsCount > 1 ? this._itemsCount : ""}" data-stack-id="${this._stackId}" class="item icon-minecraft ${this.class}"></div>`
        
        return document.createRange().createContextualFragment(stackHtml)
    }

    add(count) {
        if (this._itemsCount + count <= 64) {
            this._itemsCount += count;
            return -1 * count
        }
    }

    remove() {
        this._itemsCount -= 1;
    }

    merge(stack) {

        if (this._itemId !== stack.itemId) {
            return stack;
        }

        if (this._itemsCount + stack.count > 64) {
            let newStack = new Stack(this._itemsCount + stack.count - 64, this._itemId, 0, this.itemName);
            this._itemsCount = 64;
            return newStack;

        } else {
            this._itemsCount += stack.count;
        }

    }

    split() {
        let newStackCount = Math.ceil(this.count / 2);
        let oldStackCount = this._itemsCount - newStackCount

        this._itemsCount = oldStackCount;

        return new Stack(newStackCount, this._itemId, 0, this.itemName);
    }
}

export default Stack;
