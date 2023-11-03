function readLogin() {
  axios
    .post("../controller/login.read.php")
    .then(function (response) {
      console.log(response.data);
      if (!response.data) {
        window.location.href = "index.php";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteLogin() {
  axios
    .post("../controller/login.delete.php")
    .then(function (response) {
      console.log(response);
      if (response.data) {
        window.location.href = "index.php";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

readLogin();

window.onbeforeunload = function () {
  readLogin();
};
