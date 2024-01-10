export const getSaves = async(userId) => {

    const data = await fetch("http://localhost:5000/saves", {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'}),
    })

    return await data.json();
}