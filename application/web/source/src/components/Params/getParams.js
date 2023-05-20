export default function getParams(query) {
  const params = new URL(window.location.href).searchParams;
  return params.get(query);
}

export function getQuizIdParam() {
  return getParams("quiz_id");
}
