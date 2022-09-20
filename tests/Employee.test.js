const Employee = require("../lib/employee");

// describe("Employee", () => {
//   describe("Initialization", () => {
//     it("Should have no properties when created with no parameters", () => {
//       const employee = new Employee();

//       expect("name", "id", "email" in employee).toEqual(undefined);
//     });
//   });
// });
test("On initialization, parameters should be undefined", () => {
  const employee = new Employee();

  expect(employee.name).toEqual(undefined);
  expect(employee.id).toEqual(undefined);
  expect(employee.email).toEqual(undefined);
});
