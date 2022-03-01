export interface WttrIn {
	current_condition: [
		{
			temp_C: string;
			weatherCode: string;
		},
	];
	weather: [
		{
			astronomy: [
				{
					sunrise: string;
					sunset: string;
				},
			];
		},
	];
}

export async function weather(city: string): Promise<WttrIn> {
	return fetch(`https://wttr.in/${city}?format=j1&lang=en`).then((resp) =>
		resp.json(),
	);
}
