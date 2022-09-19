const { it } = require("node:test");
const { describe } = require("yargs");
const Employee = require("../lib/employee");

describe("Employee", () => {
  describe("Initialization", () => {
    it("Should have no properties when created with no parameters", () => {
      const employee = new Employee();

      expect("name", "id", "email" in employee).toEqual(undefined);
    });
  });
});
