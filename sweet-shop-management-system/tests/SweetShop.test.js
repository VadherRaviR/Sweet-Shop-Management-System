const SweetShop = require("../src/SweetShop");

describe("Sweet Shop Management System", () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  // 1. Initialization
  describe("Initialization", () => {
    it("starts with an empty inventory", () => {
      expect(shop.viewSweets()).toEqual([]);
    });
  });

  //2.Add Sweet test
  describe("Add Sweets", () => {
    //test for add sweet
    it("adds a new sweet successfully", () => {
      const sweet = {
        id: 1001,
        name: "Kaju Katli",
        category: "Nut-Based",
        price: 50,
        quantity: 20,
      };
      shop.addSweet(sweet);
      const sweets = shop.viewSweets();
      expect(sweets).toHaveLength(1); // if sweets actual length is not match with expected length then test fails.
      expect(sweets[0].name).toBe("Kaju Katli"); // if sweet name is not match then test fails.
    });

    it("throws an error if sweet ID already exists", () => {
      const sweet1 = {
        id: 1001,
        name: "Kaju Katli",
        category: "Nut-Based",
        price: 50,
        quantity: 20,
      };
      const sweet2 = {
        id: 1001,
        name: "Gulab Jamun",
        category: "Milk-Based",
        price: 10,
        quantity: 50,
      };
      shop.addSweet(sweet1);
      expect(() => shop.addSweet(sweet2)).toThrow(
        "Sweet with this ID already exists."
      );  // fails if more then one sweet have same id
    });

    it("throws an error if required fields are missing", () => {
      const invalidSweet = {
        id: 1002,
        name: "Barfi",
        // Missing category, price, quantity
      };
      expect(() => shop.addSweet(invalidSweet)).toThrow("Invalid sweet object");
    });

  });
});
