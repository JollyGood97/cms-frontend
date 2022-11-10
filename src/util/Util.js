export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    console.log("userDetails", user);

    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};

// node js
// export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (user && user.accessToken) {
//       // for Node.js Express back-end
//       return { 'x-access-token': user.accessToken };
//     } else {
//       return {};
//     }
//   }
