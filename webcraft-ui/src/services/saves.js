// export const getSaves = async () => {

//     let userId = localStorage.getItem("user-id")


//     const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/inventory/${userId}`, {
//         method: 'GET',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//     })

//     console.log(await data.json())

//     return await data.json();
// }


export const getSaves = async () => {

    let userId = localStorage.getItem("user-id")

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/inventory/${userId}`, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })

        if (!response.ok) {
            if(response.status === 404) {
                return []
            }

            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching saves:', error);
    }
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
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(save)
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

    let userId = localStorage.getItem("user-id")

    let save = {
        "name": name.toString(),
        "date": new Date().getTime().toString()
    }

    console.log(save)

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/inventory/${userId}/create`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(save)
    })

    return await data.json();
}

export const renameSave = async (name) => {

    let saveId = new URLSearchParams(window.location.search).get("save")

    const data = await fetch(`http://localhost:5000/saves/${saveId}/rename`, {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({"name": name })
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