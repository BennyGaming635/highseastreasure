const locations = [
    { name: "The Swamp of Lost Pens", lat: 51.505, lon: -0.09 },
    { name: "The Island of Eternal Naps", lat: 51.515, lon: -0.1 },
    { name: "The Volcano of Unsolved Puzzles", lat: 51.525, lon: -0.11 },
    { name: "The Mountain of Forgotten Socks", lat: 51.535, lon: -0.12 },
    { name: "The Bridge of Forgotten Apps", lat: 51.545, lon: -0.13 },
    { name: "The Enchanted WiFi Signal", lat: 51.555, lon: -0.14 },
    { name: "The Feathered Taco", lat: 51.565, lon: -0.15 },
    { name: "The Spaghetti Sea Serpent", lat: 51.575, lon: -0.16 }
];

const quests = [
    "Find the Eggplant that outran a cabbage! The talking carrot will guide you.",
    "Retrieve the sacred password from the Bridge of Forgotten Apps.",
    "Defeat the Jellybean Pirates to reach the Spaghetti Sea Serpent.",
    "Solve the riddle of the '404 Error' to unlock the WiFi Signal!",
    "Dance with the Sandwich Wizards to prove you're worthy of the Feathered Taco.",
    "Retrieve the Spaghetti from Mount Keyboard to control the Serpent!"
];

function generateMap() {
    // Get the API key from the input field
    const apiKey = document.getElementById('api-key').value.trim();
    
    if (!apiKey) {
        alert("Please enter your Pixabay API Key!");
        return;
    }

    // Initialize the map centered on a default location
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Set the tile layer for the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Clear previous quests
    document.getElementById('quests').innerHTML = '';

    // Select 3 random locations and quests
    const selectedLocations = locations.sort(() => 0.5 - Math.random()).slice(0, 3);
    const selectedQuests = quests.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Add markers and quests for each location
    selectedLocations.forEach((location, index) => {
        // Fetch image for location from Pixabay API
        fetch(`https://pixabay.com/api/?key=${apiKey}&q=map&image_type=photo&orientation=horizontal`)
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.hits[0]?.webformatURL || 'https://via.placeholder.com/300';

                // Add a marker for the location
                const marker = L.marker([location.lat, location.lon]).addTo(map);
                marker.bindPopup(`<b>${location.name}</b><br><img src="${imageUrl}" alt="Location image" width="200px">`);

                // Append the corresponding quest
                const questDiv = document.createElement('div');
                questDiv.innerHTML = `<h3>${location.name}</h3><p>${selectedQuests[index]}</p>`;
                document.getElementById('quests').appendChild(questDiv);
            })
            .catch(error => {
                console.error("Error fetching data from Pixabay:", error);
                alert("Failed to fetch images from Pixabay. Please check your API key.");
            });
    });
}
