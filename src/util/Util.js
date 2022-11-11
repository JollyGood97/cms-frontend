export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    console.log("userDetails", user);

    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
