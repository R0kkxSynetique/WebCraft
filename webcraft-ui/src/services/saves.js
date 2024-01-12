export const getSaves = async () => {
	let userId = localStorage.getItem("user-id");

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/user/${userId}/saves`,
			{
				method: "GET",
				headers: new Headers({ "Content-Type": "application/json" }),
			}
		);

		if (!response.ok) {
			if (response.status === 404) {
				return [];
			}

			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching saves:", error);
	}
};

export const save = async (logicalStacks) => {
	let items = [];
	let saveId = new URLSearchParams(window.location.search).get("save");

	logicalStacks.forEach((stack) => {
		items.push({
			id: stack.itemId,
			name: stack.itemName,
			quantity: stack.count,
			slot: stack.location,
		});
	});

	let save = {
		save_id: saveId,
		items: items,
        date: new Date().getTime().toString(),
	};

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/inventory/save`,
		{
			method: "PATCH",
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify(save),
		}
	);

	return await data.json();
};

export const getInventory = async () => {
	let userId = localStorage.getItem("user-id");

	let inventory_id = new URLSearchParams(window.location.search).get("save");

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/user/${userId}/inventory/${inventory_id}`,
		{
			method: "GET",
			headers: new Headers({ "Content-Type": "application/json" }),
		}
	);

	return await data.json();
};

export const createSave = async (name) => {
	let userId = localStorage.getItem("user-id");

	let save = {
		name: name.toString(),
		date: new Date().getTime().toString(),
		owner_id: userId.toString(),
	};

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/user/inventory/create`,
		{
			method: "POST",
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify(save),
		}
	);

	return await data.json();
};

export const renameSave = async (name) => {
	let saveId = new URLSearchParams(window.location.search).get("save");

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/save/rename`,
		{
			method: "PATCH",
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify({ name: name, save_id: saveId }),
		}
	);

	return await data.json();
};

export const deleteSave = async (saves, setSaves, saveRemovable) => {
	setSaves(saves.filter((save) => save.id !== saveRemovable));

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_BASE_API_LINK}/save/delete`,
		{
			method: "DELETE",
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify({ save_id: saveRemovable }),
		}
	);

	return await data.json();
};
