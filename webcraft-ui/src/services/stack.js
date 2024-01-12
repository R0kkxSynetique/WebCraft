export const getCraft = async (ingredients) => {

    let tmpFormat = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
    }

    ingredients.forEach(stack => {
        tmpFormat[stack.location] = stack.itemId
    });

    
    let formattedIngredients = {"ingredients" : [[tmpFormat[1], tmpFormat[2], tmpFormat[3]], [tmpFormat[4], tmpFormat[5], tmpFormat[6]], [tmpFormat[7], tmpFormat[8], tmpFormat[9]]]}
    //let formattedIngredients = {"ingredients" : ['coucou']}


    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/recipe/result`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(formattedIngredients)
    })

    return await data.json();
}

export const generateItem = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/item/random`, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return await data.json();
}