export const getSaves = async (userId) => {

    const data = await fetch("http://localhost:5000/saves", {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return await data.json();
}

export const save = async (logicalStacks) => {

    let items = []


    logicalStacks.forEach(stack => {
        items.push({
            "id": stack.itemId,
            "name": stack.itemName,
            "quantity": stack.count,
            "slot": stack.location
        })
    })

    let save = {
        "owner_id": localStorage.getItem("user-id"),
        "inventory_id": new URLSearchParams(window.location.search).get("save"),
        "date": new Date().getTime(),
        "items": items
    }

    const data = await fetch("http://localhost:5000/save", {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: save
    })

    return await data.json();
}

export const getInventory = async () => {

    let inventory_id = new URLSearchParams(window.location.search).get("save")

    const data = await fetch(`http://localhost:5000/inventory/${inventory_id}`, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return await data.json();
}

export const createSave = async (name) => {


    let save = {
        // "owner_id": localStorage.getItem("user-id"),
        "name": name,
        "date": new Date().getTime()
    }

    const data = await fetch("http://localhost:5000/saves/create", {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: save
    })

    return await data.json();
}

export const renameSave = async (name) => {

    let saveId = new URLSearchParams(window.location.search).get("save")

    const data = await fetch(`http://localhost:5000/saves/${saveId}/rename`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: { "name": name }
    })

    return await data.json();
}

export const deleteSave = async (saves, setSaves, saveRemovable) => {

    setSaves(saves.filter(save => save.id !== saveRemovable))

    const data = await fetch(`http://localhost:5000/saves/${saveRemovable}/remove`, {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return await data.json();
}