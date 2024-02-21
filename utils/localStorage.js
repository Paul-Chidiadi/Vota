export const saveDataToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // console.log("Error saving data:", error);
  }
};

export const getDataFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (error) {
    // console.log("Error retrieving data:", error);
    return null;
  }
};

export const deleteDataFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // console.log("Error deleting data:", error);
  }
};
