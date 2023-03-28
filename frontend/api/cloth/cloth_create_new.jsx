import tokenInstance from "../tokens/axios";

export default async function cloth_create_new() {
  const response = await tokenInstance
    .post(`clothes-admin`, {
      title: "New Cloth Title",
      description: "New Cloth Description",
      wearable_part: "TOP",
    })
    .then((res) => {
      return res.data;
    });
  return response;
}
