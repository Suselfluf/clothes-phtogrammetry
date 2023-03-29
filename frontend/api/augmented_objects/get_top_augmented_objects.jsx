import tokenInstance from "../tokens/axios";

export default async function get_augmented_objects(wearable_part) {
  const response = await tokenInstance
    .post(`workshop/`, {
      //   access_token: localStorage.getItem("access_token"),
      wearable_part: wearable_part,
    })
    .then((res) => {
      return res.data;
    });
  return response;
}
