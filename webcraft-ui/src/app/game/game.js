import Stack from './Stack.js';

export const GameScript = () => {

    // Array of all Stacks
    let logicalStacks = []

    // itemsCount, itemId, location, name, stackidIncrement
    let id = 0
    let fish3 = new Stack(32, 1, 4, "Pufferfish", id)
id++
let fish4 = new Stack(63, 3, 2, "dragon-egg", id)
id++
let fish5 = new Stack(50, 2, 3, "oak_planks", id)

    logicalStacks.push(fish3, fish4, fish5)

    // spawn all stacks on board
    logicalStacks.forEach(stack => {
        document.getElementById(`box-${stack.location}`).appendChild(stack.view())
    });

    // check if box is already in a stack location
    function checkBoxAvailability(boxId) {
        let res = true

        logicalStacks.forEach(stack => {
            if (stack.location == boxId && stack.stackId != currentlyDraggedStack.instance.stackId) {
                res = false
                return
            }
        });
        return res
    }


    let offsetX, offsetY;
    let holderBox = document.getElementById('box-0');
    let boxes = document.getElementsByClassName('box');
    let stacks = document.getElementsByClassName('item');

    // {instance : stack, view : stack.viewOnBoard}
    let currentlyDraggedStack


    function followCursor(e) {
        currentlyDraggedStack.view.style.left = e.clientX - offsetX - 22 + "px";
        currentlyDraggedStack.view.style.top = e.clientY - offsetY - 24 + "px";
    }

    function mouseMov(e) {
        if (currentlyDraggedStack) {
            followCursor(e)
        }
    }


    function listenItem(stack, stackLogic = findStackInstance(stack.dataset.stackId)) {

        // find clicked stack data 
        let currentStackId = stack.dataset.stackId;
        let currentStackInstance = findStackInstance(currentStackId);

        // right click actions
        stack.addEventListener('contextmenu', function (e) {

            // avoid clicking on the box behing the stack
            if (!currentlyDraggedStack) {
                e.stopPropagation();
                e.preventDefault();
            }

            // split stack on simple right click
            if (!currentlyDraggedStack) {

                let newStack = currentStackInstance.split()

                // drag splitted stack
                if (newStack) {
                    logicalStacks.push(newStack)
                    holderBox.appendChild(newStack.view())
                    listenItem(holderBox.firstChild)
                    move(e, newStack, holderBox.firstChild)
                }

                // display old stack count
                if (currentStackInstance.count > 1) {
                    stack.dataset.count = currentStackInstance.count

                } else if (currentStackInstance.count == 1) {
                    stack.dataset.count = ""
                }
                else {
                    //remove old stack from logicalStacks
                    logicalStacks = logicalStacks.filter(function (stack) {
                        return stack.stackId !== currentStackInstance.stackId
                    })

                    stack.parentNode.innerHTML = ""
                }
            }
        })


        // left click actions
        stack.onclick = function (e) {
            // do nothing if we are dragging a stack (to trigger only the box behind and drop the stack)
            if (!currentlyDraggedStack) {
                e.stopPropagation();
                move(e, stackLogic, stack)

            } else if (currentlyDraggedStack && currentlyDraggedStack.instance.itemId != currentStackInstance.itemId) {
                e.stopPropagation();

                let box = stack.parentNode

                box.innerHTML = ""
                currentlyDraggedStack.instance.location = currentStackInstance.location
                box.appendChild(currentlyDraggedStack.instance.view())
                listenItem(box.firstChild)

                currentStackInstance.location = 0

                currentlyDraggedStack = null
                holderBox.innerHTML = ""
                move(e, currentStackInstance, stack)
            }
        }
    }


    function move(e, stack, currentStackViewOnBoard) {

        if (!currentlyDraggedStack) {

            currentlyDraggedStack = { "instance": stack, "view": currentStackViewOnBoard };

            // if stack is from a box on board 
            if (currentStackViewOnBoard.parentNode) {

                currentStackViewOnBoard.parentNode.innerHTML = '';
                holderBox.appendChild(currentlyDraggedStack.view);

            } else {
                holderBox.appendChild(currentlyDraggedStack.view)
            }

            // move Stack
            currentlyDraggedStack.view.classList.add('holding');
            offsetX = currentlyDraggedStack.view.getBoundingClientRect().left;
            offsetY = currentlyDraggedStack.view.getBoundingClientRect().top;

            document.addEventListener('mousemove', mouseMov);
            followCursor(e)
        }
    }

    for (let box of boxes) {
        let boxId = box.id.split("-")[1]

        // right click actions
        box.addEventListener('contextmenu', function (e) {
            if (currentlyDraggedStack) {

                if (box.firstChild && findStackInstance(box.firstChild.dataset.stackId).itemId == currentlyDraggedStack.instance.itemId) {

                    let currentStack = findStackInstance(box.firstChild.dataset.stackId)
                    // increment current stack
                    let diff = currentStack.add(1)
                    box.firstChild.dataset.count = currentStack.count

                    if (currentlyDraggedStack.instance.count > 1) {

                        // decrement dragged stack
                        currentlyDraggedStack.instance.add(diff)

                        if (currentlyDraggedStack.instance.count > 1) {
                            currentlyDraggedStack.view.dataset.count = currentlyDraggedStack.instance.count
                        } else {
                            currentlyDraggedStack.view.dataset.count = ""
                        }
                    } else {

                        //remove old stack from logicalStacks
                        logicalStacks = logicalStacks.filter(function (stack) {
                            return stack.stackId !== currentlyDraggedStack.instance.stackId
                        })

                        currentlyDraggedStack.view.parentNode.innerHTML = ""
                        currentlyDraggedStack = null
                    }
                } else if (!box.firstChild) {

                    // create a new stack
                    let newStack = new Stack(1, currentlyDraggedStack.instance.itemId, boxId, currentlyDraggedStack.instance.itemName)
                    logicalStacks.push(newStack)
                    box.appendChild(newStack.view())
                    listenItem(box.firstChild, newStack)

                    if (currentlyDraggedStack.instance.count > 1) {
                        // decrement dragged stack
                        currentlyDraggedStack.instance.add(-1)
                        if (currentlyDraggedStack.instance.count > 1) {
                            currentlyDraggedStack.view.dataset.count = currentlyDraggedStack.instance.count
                        } else {
                            currentlyDraggedStack.view.dataset.count = ""
                        }
                    } else {
                        //remove old stack from logicalStacks
                        logicalStacks = logicalStacks.filter(function (stack) {
                            return stack.stackId !== currentlyDraggedStack.instance.stackId
                        })

                        currentlyDraggedStack.view.parentNode.innerHTML = ""
                        currentlyDraggedStack = null
                    }
                }
            }
        })

        // left click actions
        box.onclick = function (e) {

            // drop the dragged stack inthe box
            if (currentlyDraggedStack && boxId <= 999) {
                if (checkBoxAvailability(boxId)) {

                    currentlyDraggedStack.view.classList.remove('holding')
                    box.appendChild(holderBox.firstChild)

                    currentlyDraggedStack.instance.location = parseInt(boxId)

                    currentlyDraggedStack = null
                    holderBox.innerHTML = ''

                } else {
                    let initialChildView = box.firstChild
                    let initialChildInstace = findStackInstance(initialChildView.dataset.stackId)

                    //remove old stack from logicalStacks
                    logicalStacks = logicalStacks.filter(function (stack) {
                        return stack.stackId !== currentlyDraggedStack.instance.stackId
                    })

                    //merge stacks
                    let newStack = initialChildInstace.merge(currentlyDraggedStack.instance)
                    initialChildView.dataset.count = initialChildInstace.count

                    //whipe old stack
                    currentlyDraggedStack = null
                    holderBox.innerHTML = ''

                    //manage new stack properties
                    if (newStack) {
                        logicalStacks.push(newStack)
                        holderBox.appendChild(newStack.view())
                        listenItem(holderBox.firstChild)
                        move(e, newStack, holderBox.firstChild)
                    }
                }


                box.firstChild.style.inset = "0"
            }
        };
    }

    function findStackInstance(stackId) {

        for (let stackInstance of logicalStacks) {
            if (stackInstance.stackId == stackId) {

                return stackInstance;
            }
        }
        return null
    }


    for (let stack of stacks) {
        listenItem(stack)
    }

}