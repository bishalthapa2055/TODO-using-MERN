import request from "supertest";
import { app } from "../../app";
import "../setup";

describe("For patch methods", () => {
  it("should be defined", async () => {
    expect(app.patch).toBeDefined();
  });
  it("should return 200 after sucessfull update", async () => {
    const todoData = {
      title: "hello nepal",
      description: "You are welcome in nepal",
    };
    //for create command

    const todoCreate = await request(app).post("/api/v1/todo").send(todoData);
    expect(todoCreate.statusCode).toBe(200);
    expect(todoCreate.body.status).toBeTruthy();
    expect(todoCreate.body.data).toHaveProperty("id");

    // for update command
    const updateData = {
      title: "welcome nepal",
      description: "hey there are you are there",
      status: "completed",
    };
    // console.log(await userCreate.body.data.id);
    const response = await request(app)
      .patch(`/api/v1/todo/${todoCreate.body.data.id}`)
      .send(updateData);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBeTruthy();
    expect(response.body.message).toBe("sucessfully updated todo");
    expect(response.body).toBeDefined();
    expect(response.body.updatedData).toHaveProperty("id");
    expect(response.body.updatedData.title).toBe(updateData.title);
    expect(response.body.updatedData.description).toBe(updateData.description);
  });
  it("should return 400 if not valid object id is provided", async () => {
    const notId = "6416741d80a1ccd678999922";
    const updataData = {
      title: "nepal nepal",
      description: "hello there i am here",
      status: "completed",
    };
    const res = await request(app)
      .patch(`/api/v1/todo/${notId}`)
      .send(updataData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Todo Unavailable");
    expect(res.body.status).toBeFalsy();
  });
});
