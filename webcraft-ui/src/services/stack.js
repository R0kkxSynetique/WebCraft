export const getCraft = async (ingredients) => {

    let formattedIngredients = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
    }


    ingredients.forEach(stack => {
        formattedIngredients[stack.location] = stack.itemId
    });

    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/reciepe`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(formattedIngredients)
    })

    return await data.json();
}

export const generateItem = async ()=> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/item/random`, {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'}),
    })

    return await data.json();
}