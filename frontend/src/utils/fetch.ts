const fetchPost = ({ path, body }: { path: string; body: any }) => {
  console.log(body.get("title"));
  fetch(path, {
    method: "POST",
    headers: {},
    body: body,
  });
};
const fetchGet = () => {};

export { fetchPost, fetchGet };
