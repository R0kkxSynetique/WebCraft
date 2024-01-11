export const getSaves = async (userId) => {

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/saves`, {
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

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/save`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: save
    })

    return await data.json();
}

export const getInventory = async () => {

    let inventory_id = new URLSearchParams(window.location.search).get("save")

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/inventory/${inventory_id}`, {
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

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/saves/create`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: save
    })

    return await data.json();
}

export const renameSave = async (name) => {

    let saveId = new URLSearchParams(window.location.search).get("save")

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/saves/${saveId}/rename`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: { "name": name }
    })

    return await data.json();
}

export const deleteSave = async (saves, setSaves, saveRemovable) => {

    setSaves(saves.filter(save => save.id !== saveRemovable))

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/saves/${saveRemovable}/remove`, {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return await data.json();
}