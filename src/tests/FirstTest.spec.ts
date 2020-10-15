import { User } from "@models/User";

test("it should be ok", () => {
  const user = new User();

  user.name = "Claysllan";

  expect(user.name).toEqual("Claysllan");
});
