export const saveDataToLocalStorage = async (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // console.log("Error saving data:", error);
  }
};

export const getDataFromLocalStorage = async (key) => {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (error) {
    // console.log("Error retrieving data:", error);
    return null;
  }
};

export const deleteDataFromLocalStorage = async (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // console.log("Error deleting data:", error);
  }
};
