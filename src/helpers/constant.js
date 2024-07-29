export const STATUS = ["Alive", "Dead", "unknown"];

export const GENDER = ["male","female","genderless","unknown"];

export const SPECIES = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ];

// Extracts episode IDs from a character object
export const getEpisodeIds = (character) => {
  if (!character?.episode) return ''; // Handle cases where episode might be undefined or null
  return character.episode.map(url => url.split('/').pop()).join(',');
};

// Extracts location ID from a character object
export const getLocationId = (character) => {
  if (!character?.location?.url) return ''; // Handle cases where location or url might be undefined or null
  return character.location.url.split('/').pop();
};

// Extracts resident IDs from a location object
export const getResidentIds = (location) => {
  if (!location?.residents) return ''; // Handle cases where residents might be undefined or null
  return location?.residents.map(url => url.split('/').pop()).join(',');
};

// Extracts character IDs from an episode object
export const getCharacterIds = (episode) => {
  if (!episode?.characters) return ''; // Handle cases where characters might be undefined or null
  return episode.characters.map(url => url.split('/').pop()).join(',');
};

