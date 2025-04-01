import { ref, computed } from "vue";

export function useLocalStorage() {
  const localStorageNotesKey = "notes";
  const localStorageFavoritesKey = "favorites";
  const localStorageTopicsKey = "topics";
  const localStorageTopicsDataKey = "topicsData";

  const notes = ref(getLocalStorageItem(localStorageNotesKey, {}));
  const favorites = ref(getLocalStorageItem(localStorageFavoritesKey, []));
  const topics = ref(getLocalStorageItem(localStorageTopicsKey, []));
  const topicsData = ref(getLocalStorageItem(localStorageTopicsDataKey, {}));

  // Helper function to retrieve and parse localStorage items
  function getLocalStorageItem(key, defaultValue) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error parsing localStorage item:", error);
      return defaultValue; // Return default value on error
    }
  }

  // Helper function to save items to localStorage
  function setLocalStorageItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }


  const saveNote = (reference, note) => {
    notes.value[reference] = note;
    setLocalStorageItem(localStorageNotesKey, notes.value);
  };

  const toggleFavorite = (item) => {
    const isAlreadyFavorite = isItemFavorite(item);

    if (isAlreadyFavorite) {
      favorites.value = favorites.value.filter((fav) => !isItemFavorite(fav));
    } else {
      favorites.value.push(item);
    }
    setLocalStorageItem(localStorageFavoritesKey, favorites.value);
  };

  // Helper function to check if an item is a favorite
  const isItemFavorite = computed(() => (item) => {
    return favorites.value.some(
      (fav) =>
        (fav.reference === item.reference && fav.type === "scripture") ||
        (fav.book === item.book && fav.type === "book")
    );
  });

  const isFavorite = (scripture) => {
    if (!scripture || !scripture.reference) {
      return false; // Return false if scripture or reference is undefined
    }

    return favorites.value.some((fav) => fav.reference === scripture.reference);
  };


  const addToTopic = (scripture, topic) => {
    if (!topicsData.value[topic]) {
      topicsData.value[topic] = [];
    }
    if (!topicsData.value[topic].some((fav) => fav.reference === scripture.reference)) {
      topicsData.value[topic].push(scripture);
      setLocalStorageItem(localStorageTopicsDataKey, topicsData.value);
    }
  };

  const createNewTopic = (newTopicName, currentScriptureForTopic) => {
    newTopicName = newTopicName.trim();
    if (newTopicName !== "") {
      if (!topics.value.includes(newTopicName)) { //Avoid duplicate topics
        topics.value.push(newTopicName);
        setLocalStorageItem(localStorageTopicsKey, topics.value);
      }
      addToTopic(currentScriptureForTopic, newTopicName);
    }
  };

  return {
    notes,
    favorites,
    topics,
    topicsData,
    saveNote,
    toggleFavorite,
    isFavorite,
    addToTopic,
    createNewTopic,
    isItemFavorite, //Expose helper for potential other uses
  };
}
