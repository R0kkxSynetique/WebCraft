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

    const data = await fetch("http://localhost:5000/reciepe", {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: formattedIngredients
    })

    return await data.json();
}