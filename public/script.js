const apiBase = "https://hackops-backend.onrender.com/api/v1/users/";

// SIGNUP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    try {
      const res = await axios.post(
        `${apiBase}/auth/signup`,
        { name, email, password, passwordConfirm },
        { withCredentials: true }
      );
      document.getElementById("signupMessage").textContent =
        "Signup successful!";

      console.log(res.data);
      window.location.href = "login.html";
    } catch (err) {
      document.getElementById("signupMessage").textContent =
        err.response.data.message;
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await axios.post(
        `${apiBase}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      document.getElementById("loginMessage").textContent = "Login successful!";
      console.log(res.data);
      window.location.href = "users.html";
    } catch (err) {
      document.getElementById("loginMessage").textContent =
        err.response.data.message;
    }
  });
}

// GET ALL USERS
const getUsersBtn = document.getElementById("getUsersBtn");
if (getUsersBtn) {
  getUsersBtn.addEventListener("click", async () => {
    try {
      const res = await axios.get(apiBase, { withCredentials: true }); // sends cookie automatically
      const usersList = document.getElementById("usersList");
      usersList.innerHTML = "";
      res.data.data.users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        usersList.appendChild(li);
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}
