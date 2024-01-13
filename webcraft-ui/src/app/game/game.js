import Stack from './Stack.js';
import { getCraft, generateItem } from '@/services/stack.js';
import { save } from '@/services/saves.js';


const GameScript = (setIsCraftLoading, initialItems, spritesNames) => {

    // Array of all Stacks
    let logicalStacks = []

    // check if box is already in a stack location
    function checkBoxAvailability(boxId, stacks = logicalStacks) {
        let res = true
        stacks.forEach(stack => {
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
    let craftingBox = document.getElementById("box-1001")
    let generatingBox = document.getElementById("box-1000")
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

    function billCraft() {
        // Remove 1 quantity of each ingredient in the crafting table
        for (let i = 1; i < 10; i++) {
            let box = document.getElementById(`box-${i}`)

            if (box.firstChild) {

                let stack = findStackInstance(box.firstChild.dataset.stackId)

                //decrement stack
                if (stack.count > 1) {
                    stack.add(-1)
                    if (stack.count > 1) {
                        box.firstChild.dataset.count = stack.count
                    } else {
                        box.firstChild.dataset.count = ""
                    }
                    //remove stack
                } else {
                    logicalStacks = logicalStacks.filter(function (logicalStack) {
                        return logicalStack.stackId !== stack.stackId
                    })

                    box.firstChild.parentNode.innerHTML = ""
                }
            }
        }
        getCraftResult()
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

                let newStack = stackLogic.split()

                // drag splitted stack
                if (newStack) {
                    logicalStacks.push(newStack)
                    holderBox.appendChild(newStack.view())
                    listenItem(holderBox.firstChild)
                    move(e, newStack, holderBox.firstChild)
                }

                // display old stack count
                if (stackLogic.count > 1) {
                    stack.dataset.count = stackLogic.count

                } else if (stackLogic.count == 1) {
                    stack.dataset.count = ""
                }
                else {
                    //remove old stack from logicalStacks
                    logicalStacks = logicalStacks.filter(function (stack) {
                        return stack.stackId !== stackLogic.stackId
                    })

                    stack.parentNode.innerHTML = ""
                }
            }

            if (stackLogic.location == 1001) {
                billCraft()
            }

            if (stackLogic.location > 0 && stackLogic.location < 10) {
                //stackLogic.location = 0
                getCraftResult()
            }
        })


        // left click actions
        stack.onclick = function (e) {

            // do nothing if we are dragging a stack (to trigger only the box behind and drop the stack)
            if (!currentlyDraggedStack) {
                e.stopPropagation();

                move(e, stackLogic, stack)

                if (stackLogic.location == 1001) {
                    stackLogic.location = 0
                    billCraft()
                }


            } else if (currentlyDraggedStack && currentlyDraggedStack.instance.itemId != stackLogic.itemId) {
                e.stopPropagation();

                let box = stack.parentNode

                box.innerHTML = ""
                currentlyDraggedStack.instance.location = stackLogic.location
                box.appendChild(currentlyDraggedStack.instance.view())
                listenItem(box.firstChild)

                let boxId = stackLogic.location
                stackLogic.location = 0

                currentlyDraggedStack = null
                holderBox.innerHTML = ""
                move(e, stackLogic, stack)

                if (boxId < 10 && boxId > 0) {
                    getCraftResult()
                }
            }


            if (stackLogic.location > 0 && stackLogic.location < 10) {
                getCraftResult()
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
                //currentlyDraggedStack.instance.location = 0
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
            if (currentlyDraggedStack && boxId <= 999) {

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
                    let newStack = new Stack(1, currentlyDraggedStack.instance.itemId, boxId, currentlyDraggedStack.instance.itemName, currentlyDraggedStack.instance.maxItems)
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

                    if (boxId > 0 && boxId < 10) {
                        getCraftResult()
                    }
                }
                if (!currentlyDraggedStack) {
                    saveState()
                }

            } else if (currentlyDraggedStack && boxId == 1002) {
                // move to trash 
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
                saveState()
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


                    if (boxId > 0 && boxId < 10) {
                        getCraftResult()
                    }
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

                if (!currentlyDraggedStack) {
                    saveState()
                }

            } else if (currentlyDraggedStack && boxId == 1001) {
                // TODO

                if (!checkBoxAvailability(1001)) {
                    let currentStack = findStackInstance(craftingBox.firstChild.dataset.stackId)
                    let newstack = currentlyDraggedStack.instance.merge(currentStack)
                    currentlyDraggedStack.view.dataset.count = currentlyDraggedStack.instance.count

                    //remove old stack from logicalStacks
                    logicalStacks = logicalStacks.filter(function (stack) {
                        return stack.stackId !== currentStack.stackId
                    })
                    craftingBox.innerHTML = ""

                    if (newstack) {
                        newstack.location = 1001
                        logicalStacks.push(newstack)
                        craftingBox.appendChild(newstack.view())
                        listenItem(craftingBox.firstChild)
                    } else {
                        getCraftResult()
                        billCraft()
                    }
                }




            } else if (currentlyDraggedStack && boxId == 1002) {
                // move to trash 

                logicalStacks = logicalStacks.filter(function (stack) {
                    return stack.stackId !== currentlyDraggedStack.instance.stackId
                })

                currentlyDraggedStack.view.classList.remove('holding')
                currentlyDraggedStack = null
                holderBox.innerHTML = ''

                saveState()
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

    // Auto generate random items
    setInterval(() => {
        if (!generatingBox.firstChild) {
            generate()
        }
    }, 1000);


    // calls api
    const generate = async () => {


        let getNewStack = await generateItem()

        let newStack = new Stack(getNewStack.quantity, getNewStack.id, 1000, findSprite(getNewStack.name, getNewStack.displayName), getNewStack.stackSize)

        generatingBox.appendChild(newStack.view())
        listenItem(generatingBox.firstChild, newStack)
        logicalStacks.push(newStack)
    }

    const findSprite = (name, displayName) => {

        let clearName = name.toLowerCase().replaceAll("_", '-').replaceAll(" ", '-')

        if (spritesNames.sprites.includes(clearName)) {
            return name
        }

        return displayName
    }

    const emptyCraftingTable = () => {
        logicalStacks = logicalStacks.filter(function (stack) {
            return stack.location !== 1001
        })

        craftingBox.innerHTML = ""
    }

    const getCraftResult = async () => {

        setIsCraftLoading(true)

        //remove old stack from logicalStacks
        if (craftingBox.firstChild) {
            emptyCraftingTable()
        }

        let ingredients = []

        for (let i = 1; i < 10; i++) {
            let box = document.getElementById(`box-${i}`)

            if (box.firstChild) {
                ingredients.push(findStackInstance(box.firstChild.dataset.stackId))
            }
        }

        let getNewStack = await getCraft(ingredients)

        let rand = Math.round(Math.random() * (10000000 - 1000000) + 1000000) * 999

        if (getNewStack && getNewStack.stackSize && getNewStack.id && getNewStack.name) {
            let newStack = new Stack(getNewStack.quantity, getNewStack.id, 1001, findSprite(getNewStack.name, getNewStack.displayName), getNewStack.stackSize, rand)

            craftingBox.appendChild(newStack.view())
            logicalStacks.push(newStack)
            listenItem(craftingBox.firstChild, newStack)
        } else {
            emptyCraftingTable()
        }

        // check if getNewStack is not empty
        setIsCraftLoading(false)
    }

    const saveState = () => {
        save(logicalStacks)
    }

    // Load initial items state
    let id = 0

    if (initialItems.items.length > 0) {
        initialItems.items.forEach((item) => {
            logicalStacks.push(
                new Stack(item.quantity, item.id, item.slot, item.name, item.stackSize, id)
            );
            id--;
        });
    }

    // spawn all stacks on board
    logicalStacks.forEach(stack => {
        document.getElementById(`box-${stack.location}`).appendChild(stack.view())
    });

    stacks = document.getElementsByClassName('item');
    const stackArray = Array.from(stacks);

    stackArray.forEach(stack => {
        listenItem(stack);
    });

}

export default GameScript
