export const saveUserID = (id: string) => {
  localStorage.setItem("userID", id);
};

export const saveAccCreated = (val: number) => {
  localStorage.setItem("accCreated", val.toString());
};

export const clearStorage = () => {
  localStorage.clear();
};
