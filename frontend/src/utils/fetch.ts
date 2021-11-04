const fetchPost = ({ path, body }: { path: string; body: any }) => {
  fetch(path, {
    method: "POST",
    headers: {},
    body: body,
  }).then((res) => {
    if (res.status === 200) {
      alert("Upload Succeed");
      window.location.pathname = "/main";
    }
    if (res.status === 500) {
      alert("Upload Failed...");
    }
  });
};
const fetchGet = () => {};

export { fetchPost, fetchGet };
