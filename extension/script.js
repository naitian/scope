const videoPlayer = document.querySelector('#movie_player > div.html5-video-container > video');

const init = () => {
    document.head.innerHTML += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
};

const toggleButtonSearch = () => {
    const input = document.querySelector('#scope-search > input');
    const button = document.querySelector('#scope-search > button');
    input.classList.toggle('active');
    button.classList.toggle('active');
    input.focus();
};

class FuzzySearch {
    constructor () {
        this.keywords = this.fetchKeywords();
        this.fuse = this.initFuse(this.keywords);
    }

    fetchKeywords () {
        let terms = {
            'Nature': [3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 36.0, 42.0, 45.0, 63.0, 66.0, 87.0, 93.0, 96.0, 99.0, 105.0, 114.0, 117.0, 159.0],
            'Weed': [75.0],
            'Mosque': [135.0],
            'Mammal': [30.0, 33.0, 39.0, 45.0, 48.0, 78.0, 81.0, 84.0, 87.0, 105.0, 108.0, 111.0, 129.0, 156.0],
            'Sycamore': [12.0, 24.0, 75.0],
            'Night': [0.0, 66.0, 138.0],
            'Forest': [6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 66.0, 159.0],
            'Anther': [72.0],
            'Pottery': [75.0, 132.0, 138.0],
            'Crab': [141.0],
            'Coyote': [105.0, 129.0],
            'Arachnid': [123.0],
            'Snorkeling': [84.0],
            'Ground': [42.0, 69.0, 99.0, 123.0, 132.0, 147.0],
            'Hedge': [9.0],
            'Person': [39.0, 69.0, 84.0, 165.0],
            'Vessel': [87.0],
            'Lighting': [138.0, 162.0, 165.0],
            'Ruins': [135.0],
            'Zoo': [126.0],
            'Sea': [36.0, 63.0, 87.0, 99.0, 114.0, 117.0],
            'Jaguar': [156.0],
            'Neighborhood': [135.0],
            'Beak': [57.0, 60.0, 72.0, 102.0],
            'Antelope': [108.0],
            'Arch': [51.0],
            'Farm': [96.0],
            'Wilderness': [99.0],
            'Navy': [87.0],
            'Cactus': [120.0],
            'Sprout': [66.0],
            'Architecture': [51.0, 60.0, 135.0],
            'Flower Bouquet': [75.0],
            'Pizza': [141.0],
            'Outdoors': [0.0, 3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 36.0, 39.0, 42.0, 45.0, 51.0, 63.0, 66.0, 75.0, 78.0, 81.0, 87.0, 93.0, 96.0, 99.0, 105.0, 114.0, 117.0, 123.0, 132.0, 138.0, 141.0, 156.0, 159.0],
            'Heron': [54.0, 150.0],
            'Flying': [57.0],
            'Text': [165.0],
            'Urban': [51.0, 60.0, 135.0, 138.0],
            'Lasagna': [141.0],
            'Swallow': [54.0, 57.0],
            'Ostrich': [93.0],
            'Spotlight': [162.0, 165.0],
            'Coast': [36.0],
            'Tree': [6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 66.0, 75.0, 138.0, 159.0],
            'Crane Bird': [54.0, 150.0],
            'Leaf': [24.0, 72.0],
            'Temple': [135.0],
            'Surfing': [114.0],
            'Steeple': [60.0],
            'Winter': [39.0, 42.0, 81.0],
            'Gemstone': [99.0],
            'Animal': [30.0, 33.0, 36.0, 39.0, 42.0, 45.0, 48.0, 51.0, 54.0, 57.0, 60.0, 63.0, 72.0, 78.0, 81.0, 84.0, 87.0, 93.0, 102.0, 105.0, 108.0, 111.0, 114.0, 123.0, 126.0, 129.0, 141.0, 144.0, 150.0, 156.0],
            'Reptile': [36.0, 87.0],
            'Landscape': [87.0],
            'Watercraft': [87.0],
            'People': [39.0],
            'Swimming': [84.0],
            'Swamp': [156.0, 159.0],
            'Snow': [39.0, 42.0, 81.0],
            'Goose': [39.0],
            'Stream': [99.0],
            'Land': [6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 66.0, 156.0, 159.0],
            'Fir': [9.0, 12.0, 138.0],
            'Gazelle': [108.0],
            'Arctic': [39.0, 42.0, 81.0],
            'Human': [39.0, 69.0, 84.0, 165.0],
            'Cat': [30.0],
            'Cow': [39.0],
            'Church': [135.0],
            'Spire': [60.0],
            'Sky': [3.0],
            'Dirt Road': [9.0],
            'Downtown': [135.0, 138.0],
            'Arched': [51.0],
            'Dessert': [105.0],
            'Vine': [75.0],
            'Wood': [51.0],
            'Scenery': [87.0],
            'Potted Plant': [75.0, 132.0, 138.0],
            'Ocean': [36.0, 63.0, 87.0, 99.0, 114.0, 117.0],
            'Hawk': [60.0],
            'Rock': [69.0, 99.0, 117.0],
            'Food': [105.0, 141.0],
            'Gardening': [75.0],
            'Yew': [9.0, 12.0, 24.0],
            'Trademark': [165.0],
            'Siamese': [30.0],
            'Jewelry': [99.0],
            'Crocus': [132.0],
            'Housing': [135.0],
            'Insect': [123.0],
            'Algae': [12.0],
            'Dahlia': [132.0],
            'Monastery': [135.0],
            'Accipiter': [60.0],
            'Fungus': [66.0, 69.0],
            'Pet': [30.0, 81.0, 84.0, 108.0],
            'Astronomy': [162.0, 165.0],
            'Town': [51.0, 135.0, 138.0],
            'King Penguin': [39.0, 42.0, 114.0],
            'Military': [87.0],
            'Seafood': [141.0],
            'Vault Ceiling': [51.0],
            'Sand': [36.0, 39.0],
            'Herbs': [132.0],
            'Pine': [9.0, 12.0, 24.0],
            'Harbor': [87.0],
            'Vase': [75.0, 132.0, 138.0],
            'Stained Wood': [51.0],
            'Horse': [48.0, 111.0],
            'Castle': [135.0],
            'Word': [165.0],
            'Paper': [165.0],
            'Brochure': [165.0],
            'Puffer': [63.0],
            'Daisy': [132.0],
            'City': [51.0, 135.0, 138.0],
            'Hardwood': [51.0],
            'Molding': [51.0],
            'Hole': [117.0, 126.0],
            'Aster': [132.0],
            'Vegetation': [6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 66.0, 75.0, 129.0, 132.0, 156.0, 159.0],
            'Cloud': [3.0],
            'Wildlife': [33.0, 45.0, 78.0, 87.0, 108.0, 156.0],
            'Cake': [105.0],
            'Blackbird': [57.0],
            'Fort': [135.0],
            'Buzzard': [60.0],
            'Water': [36.0, 63.0, 84.0, 87.0, 99.0, 114.0, 117.0, 156.0, 159.0, 162.0],
            'Dome': [135.0],
            'LED': [162.0, 165.0],
            'Seagull': [42.0, 60.0],
            'Pillar': [135.0],
            'Bush': [9.0, 12.0, 24.0, 75.0, 129.0, 132.0],
            'Grove': [12.0, 21.0, 24.0],
            'Rural': [96.0],
            'Adventure': [51.0],
            'Flower': [72.0, 75.0, 132.0, 138.0, 153.0],
            'Fog': [87.0],
            'Crocodile': [87.0],
            'Arecaceae': [24.0],
            'Diamond': [99.0],
            'Carnation': [75.0, 132.0],
            'Field': [45.0, 93.0, 96.0, 147.0],
            'Blossom': [72.0, 75.0, 132.0, 138.0, 153.0],
            'Plant': [6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 54.0, 66.0, 69.0, 72.0, 75.0, 78.0, 93.0, 96.0, 120.0, 123.0, 129.0, 132.0, 138.0, 141.0, 150.0, 153.0, 156.0, 159.0],
            'Sport': [51.0, 84.0, 114.0],
            'Countryside': [6.0, 12.0, 96.0],
            'Spider': [123.0],
            'Tsunami': [99.0],
            'Modern Art': [99.0, 138.0],
            'Ivy': [138.0],
            'Cattle': [39.0],
            'Mountain': [3.0, 6.0, 42.0, 117.0],
            'Ocelot': [156.0],
            'Birch': [24.0],
            'Fireworks': [138.0],
            'Ardeidae': [54.0, 150.0],
            'Creek': [99.0],
            'Sparrow': [102.0],
            'Sea Life': [36.0, 63.0, 141.0],
            'Torte': [105.0],
            'Diver': [84.0],
            'Street': [51.0],
            'Road': [9.0, 51.0],
            'Penguin': [39.0, 42.0, 114.0],
            'Hummingbird': [72.0],
            'Savanna': [45.0, 93.0],
            'Pasta': [141.0],
            'Elephant': [45.0],
            'Art': [99.0, 138.0],
            'Reed': [93.0],
            'Colt Horse': [48.0],
            'Space': [162.0, 165.0],
            'Palm Tree': [24.0],
            'Alligator': [87.0],
            'Waterfowl': [39.0, 54.0, 81.0, 150.0],
            'Sign': [165.0],
            'Moss': [9.0, 12.0, 21.0, 24.0, 66.0, 132.0, 141.0, 159.0],
            'Mushroom': [66.0, 69.0],
            'Foxglove': [132.0],
            'Tower': [60.0],
            'Maple Leaf': [72.0],
            'Shrine': [135.0],
            'Cathedral': [135.0],
            'Fence': [9.0],
            'Transportation': [87.0],
            'Oak': [12.0, 24.0, 75.0],
            'Ship': [87.0],
            'Gravel': [9.0],
            'Worship': [135.0],
            'Flamingo': [144.0],
            'Ranch': [96.0],
            'Garden': [75.0],
            'Path': [12.0, 24.0],
            'Logo': [165.0],
            'Anhinga': [102.0],
            'Beach': [36.0],
            'Spruce': [9.0, 12.0],
            'Brick': [51.0],
            'Conifer': [9.0, 12.0, 24.0, 138.0],
            'Pasture': [96.0],
            'Ant': [123.0],
            'Rainforest': [6.0, 9.0, 12.0, 18.0, 21.0, 24.0, 159.0],
            'Outer Space': [162.0, 165.0],
            'Toy': [75.0],
            'Agelaius': [57.0],
            'Alps': [3.0, 6.0, 42.0, 117.0],
            'Adorable': [30.0, 78.0],
            'Flyer': [165.0],
            'Flower Arrangement': [75.0, 138.0],
            'Cumulus': [3.0],
            'Grazing': [96.0],
            'Grass': [9.0, 54.0, 93.0, 96.0, 132.0, 150.0, 156.0, 159.0],
            'Eagle': [102.0],
            'Plaza': [135.0],
            'Audience': [165.0],
            'Diving': [84.0],
            'Turtle': [36.0],
            'Leopard': [156.0],
            'Column': [135.0],
            'Weather': [3.0, 87.0],
            'Jungle': [9.0, 12.0, 18.0, 21.0, 24.0, 66.0, 159.0],
            'Desert': [105.0],
            'Bee Eater': [54.0, 57.0, 150.0],
            'Valley': [6.0],
            'Sunlight': [15.0, 27.0, 162.0],
            'Bird': [39.0, 42.0, 51.0, 54.0, 57.0, 60.0, 72.0, 81.0, 93.0, 102.0, 114.0, 144.0, 150.0],
            'Canine': [81.0, 84.0, 105.0, 108.0, 129.0],
            'Duck': [81.0],
            'Aquilegia': [72.0],
            'Tortoise': [36.0],
            'Speech': [165.0],
            'Stallion': [111.0],
            'Lynx': [87.0],
            'Fish': [63.0],
            'Reef': [63.0],
            'Climbing': [51.0],
            'Grassland': [45.0, 93.0, 96.0],
            'Cherry Blossom': [75.0, 153.0],
            'Parthenon': [135.0],
            'Dog': [81.0, 84.0, 108.0],
            'Flora': [6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 54.0, 66.0, 69.0, 72.0, 75.0, 78.0, 93.0, 96.0, 120.0, 123.0, 129.0, 132.0, 138.0, 141.0, 150.0, 153.0, 156.0, 159.0],
            'Marsh': [156.0, 159.0],
            'Daisies': [132.0],
            'Planter': [132.0],
            'Destroyer': [87.0],
            'Soil': [36.0, 39.0, 42.0, 66.0, 69.0, 99.0, 105.0, 120.0, 123.0, 132.0, 147.0],
            'Crowd': [39.0, 69.0, 165.0],
            'Invertebrate': [123.0, 141.0],
            'Alleyway': [51.0],
            'House': [135.0],
            'Port': [87.0],
            'Sports': [84.0, 114.0],
            'Alley': [51.0],
            'Abyssinian': [30.0],
            'Ornament': [75.0, 99.0],
            'Monkey': [78.0],
            'Kite Bird': [51.0, 60.0],
            'Rubble': [99.0, 123.0],
            'Meadow': [96.0],
            'Town Square': [135.0],
            'Leisure Activities': [51.0],
            'Abies': [9.0, 12.0, 138.0],
            'Building': [51.0, 60.0, 135.0, 138.0],
            'Panther': [156.0],
            'Ice': [39.0, 42.0, 81.0],
            'Golden Retriever': [108.0],
            'Sea Waves': [99.0, 114.0, 117.0],
            'Giraffe': [33.0],
            'Universe': [162.0, 165.0],
            'Thistle': [132.0],
            'Collie': [81.0],
            'Jar': [75.0, 132.0, 138.0],
            'Lilac': [75.0],
            'Terrier': [84.0],
            'Poster': [165.0]
        };
        return terms;
    }

    initFuse (keywords) {
        return new Fuse(keywords);
    }
}

const filter = (term, response) => {
    return response(['hello', 'goodbye']);
};

const suggest = (e) => {
    term = e.target.value;
    console.log(term);
    const suggestions = [];

    for (let term in terms) {
    }

    suggestions_output = document.querySelector('#scope-search #search-suggestions');
    if (suggestions.length > 0) {
        suggestions_output.classList.remove('empty');
        e.target.classList.add('suggestions');
        suggestions_output.innerText = term;
    } else {
        suggestions_output.classList.add('empty');
        e.target.classList.remove('suggestions');
        suggestions_output.innerText = '';
    }
};

const addButton = () => {
    console.log('adding button');
    const container = document.querySelector('#top');
    const scopeContainer = document.createElement('div');

    scopeContainer.id = 'scope-search';
    scopeContainer.innerHTML = `
        <button><i class="material-icons">search</i></button>
        <input type="text" id="search-input" />
        <div id="search-suggestions" class="empty"></div>
    `;

    let button = scopeContainer.querySelector('button');
    button.addEventListener('click', toggleButtonSearch);

    let input = scopeContainer.querySelector('#scope-search > #search-input');
    input.addEventListener('keyup', suggest);

    container.insertBefore(scopeContainer, container.children[1]);
};

const tryInit = () => {
    var poll = window.setInterval(() => {
        if (document.querySelector('#top')) {
            window.clearInterval(poll);
            init();
            addButton();
        }
    }, 100);
};

tryInit();

// document.body.onload = () => {
//     init();
//     addButton();
// };
