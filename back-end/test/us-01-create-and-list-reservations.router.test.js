const request = require("supertest");

const knex = require("../src/db/connection");
const app = require("../src/app");

describe("Create and list reservations", () => {
  beforeEach(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  });

  describe("GET /reservations/:reservationId", () => {
    test("returns 404 for non-existent id", async () => {
      const response = await request(app)
        .get("/reservations/99")
        .set("Accept", "application/json");

      expect(response.body.error).toContain("99");
      expect(response.status).toBe(404);
    });
  });

  describe("POST /reservations", () => {
    test("returns 400 if data is missing", async () => {
      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ datum: {} });

      expect(response.body.error).toBeDefined();
      expect(response.status).toBe(400);
    });

    test("returns 400 if firstName is missing", async () => {
      const data = {
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "13:30",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("firstName");
      expect(response.status).toBe(400);
    });

    test("returns 400 if firstName is empty", async () => {
      const data = {
        firstName: "",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "13:30",
        people: 1
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("firstName");
      expect(response.status).toBe(400);
    });

    test("returns 400 if lastName is missing", async () => {
      const data = {
        firstName: "first",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "13:30",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("lastName");
      expect(response.status).toBe(400);
    });

    test("returns 400 if lastName is empty", async () => {
      const data = {
        firstName: "first",
        lastName: "",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "13:30",
        people: 1
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("lastName");
      expect(response.status).toBe(400);
    });

    test("returns 400 if mobilePhone is missing", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        reservation_date: "2025-01-01",
        reservation_time: "13:30",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("mobileNumber");
      expect(response.status).toBe(400);
    });

    test("returns 400 if mobilePhone is empty", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "",
        reservation_date: "2025-01-01",
        reservation_time: "13:30",
        people: 1
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("mobileNumber");
      expect(response.status).toBe(400);
    });

    test("returns 400 if reservation_date is missing", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_time: "13:30",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("reservation_date");
      expect(response.status).toBe(400);
    });

    test("returns 400 if reservation_date is empty", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "",
        reservation_time: "13:30",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("reservation_date");
      expect(response.status).toBe(400);
    });
    test("returns 400 if reservation_date is not a date", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "not-a-date",
        reservation_time: "13:30",
        people: 1
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("reservation_date");
      expect(response.status).toBe(400);
    });

    test("returns 400 if reservation_time is missing", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("reservation_time");
      expect(response.status).toBe(400);
    });
    test("returns 400 if reservation_time is empty", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("reservation_time");
      expect(response.status).toBe(400);
    });
    test("returns 400 if reservation_time is not a time", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "not-a-time",
        people: 1,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("reservation_time");
    });

    test("returns 400 if people is missing", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "17:30",
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("people");
      expect(response.status).toBe(400);
    });
    test("returns 400 if people is zero", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "17:30",
        people: 0,
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("people");
      expect(response.status).toBe(400);
    });
    test("returns 400 if people is not a number", async () => {
      const data = {
        firstName: "first",
        lastName: "last",
        mobileNumber: "800-555-1212",
        reservation_date: "2025-01-01",
        reservation_time: "17:30",
        people: "2",
      };

      const response = await request(app)
        .post("/reservations")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).toContain("people");
      expect(response.status).toBe(400);
    });
  });

  describe.only("GET /reservations", () => {
    test("returns all reservations by default", async () => {
      const response = await request(app)
        .get("/reservations")
        .set("Accept", "application/json");

      expect(response.body.data).toHaveLength(2);
      expect(response.status).toBe(200);
    });
    test("returns only reservations matching date query parameter", async () => {
      const response = await request(app)
        .get("/reservations?date=2020-12-30")
        .set("Accept", "application/json");

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].firstName).toBe("Frank");
      expect(response.status).toBe(200);
    });
  })
});
