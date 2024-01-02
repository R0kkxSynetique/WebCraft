import Stack from './Stack.js';
import { getCraft } from '@/services/stack.js';

export const GameScript = (setIsCraftLoading) => {


    // Array of all Stacks
    let logicalStacks = []

    // itemsCount, itemId, location, name, stackidIncrement
    let id = 0
    let fish3 = new Stack(32, 1, 4, "Pufferfish", id)
    id--
    let fish4 = new Stack(63, 3, 2, "dragon-egg", id)
    id--
    let fish5 = new Stack(50, 2, 3, "oak_planks", id)

    logicalStacks.push(fish3, fish4, fish5)

    // spawn all stacks on board
    logicalStacks.forEach(stack => {
        document.getElementById(`box-${stack.location}`).appendChild(stack.view())
    });

    console.log(logicalStacks)


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
    let craftingBox = document.getElementById("box-1001")
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

        // if (stackLogic && stackLogic.stackId) {
        //     if (!logicalStacks.some(stack => stack.id === stackLogic.stackId)){
        //         // logicalStacks.push(stackLogic)
        //     }
        // }



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

            if (stackLogic.location > 0 && stackLogic.location < 10) {
                getCraftResult()
            }
        })


        // left click actions
        stack.onclick = function (e) {

            console.log(logicalStacks)

            // do nothing if we are dragging a stack (to trigger only the box behind and drop the stack)
            if (!currentlyDraggedStack) {
                e.stopPropagation();
                move(e, stackLogic, stack)

            } else if (currentlyDraggedStack && currentlyDraggedStack.instance.itemId != stackLogic.itemId) {
                e.stopPropagation();

                let box = stack.parentNode

                box.innerHTML = ""
                currentlyDraggedStack.instance.location = stackLogic.location
                box.appendChild(currentlyDraggedStack.instance.view())
                listenItem(box.firstChild)

                stackLogic.location = 0

                currentlyDraggedStack = null
                holderBox.innerHTML = ""
                move(e, stackLogic, stack)
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
            }
        })

        // left click actions
        box.onclick = function (e) {
            console.log(logicalStacks)
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

            } else if (currentlyDraggedStack && boxId == 1002) {
                // move to trash 
                logicalStacks = logicalStacks.filter(function (stack) {
                    return stack.stackId !== currentlyDraggedStack.instance.stackId
                })

                currentlyDraggedStack.view.classList.remove('holding')
                currentlyDraggedStack = null
                holderBox.innerHTML = ''


                if (boxId > 0 && boxId < 10) {
                    getCraftResult()
                }
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






    // calls api

    const getCraftResult = async () => {

        setIsCraftLoading(true)
        // Remove current craft result

        //remove old stack from logicalStacks
        if (craftingBox.firstChild) {

            logicalStacks = logicalStacks.filter(function (stack) {
                return stack.location !== 1001
            })

            craftingBox.innerHTML = ""
        }




        let ingredients = []

        logicalStacks.forEach(stack => {
            if (stack.location > 0 ** stack.location < 10) {
                ingredients.push(stack)
            }
        });

        let getNewStack = await getCraft(ingredients)

        // itemsCount, itemId, location, name
        let newStack = new Stack(getNewStack.stackSize, getNewStack.id, 1001, getNewStack.name)
        craftingBox.appendChild(newStack.view())


        listenItem(craftingBox.firstChild, newStack)
        logicalStacks.push(newStack)
        setIsCraftLoading(false)
    }



    const saveState = () => {
        console.log("save")
    }
}

