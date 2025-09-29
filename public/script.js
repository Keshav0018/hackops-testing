const apiBase = "/api/v1/users";

// ---------------- SIGNUP ----------------
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

      // Redirect to login page
      window.location.href = "login.html";
    } catch (err) {
      // Handle cases when err.response is undefined
      const message =
        err.response?.data?.message || "Signup failed. Try again!";
      document.getElementById("signupMessage").textContent = message;
    }
  });
}

// ---------------- LOGIN ----------------
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

      // Redirect to users page
      window.location.href = "users.html";
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Try again!";
      document.getElementById("loginMessage").textContent = message;
    }
  });
}

// ---------------- GET ALL USERS ----------------
const getUsersBtn = document.getElementById("getUsersBtn");
if (getUsersBtn) {
  getUsersBtn.addEventListener("click", async () => {
    try {
      const res = await axios.get(apiBase, { withCredentials: true });
      const usersList = document.getElementById("usersList");
      usersList.innerHTML = "";

      res.data.data.users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        usersList.appendChild(li);
      });
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch users!";
      alert(message);
    }
  });
}
