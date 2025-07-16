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


  // 3. View Sweets
  describe('View Sweets', () => {
    it('returns a list of all added sweets', () => {
      shop.addSweet({
        id: 1001,
        name: "Kaju Katli",
        category: "Nut-Based",
        price: 50,
        quantity: 20
      });
      shop.addSweet({
        id: 1002,
        name: "Gulab Jamun",
        category: "Milk-Based",
        price: 10,
        quantity: 50
      });

      const sweets = shop.viewSweets();
      expect(sweets).toHaveLength(2); //if actual length of sweets is not eqaul to expected length then test fails
    });
  });

 //4. delet Sweets
  describe('Delete Sweets', () => {
  it('removes a sweet by ID', () => {
    const sweet = {
      id: 1001,
      name: "Rasgulla",
      category: "Milk-Based",
      price: 15,
      quantity: 30
    };
    shop.addSweet(sweet);
    
    shop.deleteSweet(1001);
    const sweets = shop.viewSweets();
    expect(sweets.find(s => s.id === 1001)).toBeUndefined();
    expect(sweets.length).toBe(0);
  });

  it('throws an error if sweet ID does not exist', () => {
    expect(() => shop.deleteSweet(999)).toThrow("Sweet with ID 999 not found.");
  });

});


//5.search , sort
describe('Search and Sort', () => {
  beforeEach(() => {
    shop = new SweetShop();

    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 10 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 20 });
    shop.addSweet({ id: 3, name: 'Rasgulla', category: 'Milk-Based', price: 25, quantity: 30 });
    shop.addSweet({ id: 4, name: 'Chocolate Barfi', category: 'Chocolate', price: 70, quantity: 5 });
  });

  // --- Search ---
  it('searches by name (partial match)', () => {
    const results = shop.search({ name: 'Jamun' });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Gulab Jamun');
  });

  it('searches by category', () => {
    const results = shop.search({ category: 'Milk-Based' });
    expect(results).toHaveLength(2);
  });

  it('searches by price range', () => {
    const results = shop.search({ minPrice: 30, maxPrice: 60 });
    expect(results.map(s => s.name)).toEqual(['Kaju Katli', 'Gulab Jamun']);
  });

  // --- Sort ---
  it('sorts by name ascending', () => {
    const sorted = shop.sortBy('name', 'asc');
    expect(sorted.map(s => s.name)).toEqual([
      'Chocolate Barfi',
      'Gulab Jamun',
      'Kaju Katli',
      'Rasgulla'
    ]);
  });

  it('sorts by price descending', () => {
    const sorted = shop.sortBy('price', 'desc');
    expect(sorted.map(s => s.price)).toEqual([70, 50, 30, 25]);
  });

  it('throws error on invalid sort field', () => {
    expect(() => shop.sortBy('invalidField')).toThrow('Invalid sort field: invalidField');
  });
});

//6.pursech
describe('Purchase Sweets', () => {
  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 101, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 50 });
  });

  it('reduces quantity on successful purchase', () => {
    shop.purchaseSweet(101, 10);
    const sweet = shop.viewSweets().find(s => s.id === 101);
    expect(sweet.quantity).toBe(40);
  });

  it('throws error if sweet does not exist', () => {
    expect(() => shop.purchaseSweet(999, 5)).toThrow("Sweet with ID 999 not found.");
  });

  it('throws error if not enough quantity', () => {
    expect(() => shop.purchaseSweet(101, 100)).toThrow("Insufficient stock for sweet ID 101.");
  });

  it('throws error if purchase quantity is zero or negative', () => {
    expect(() => shop.purchaseSweet(101, 0)).toThrow("Quantity must be a positive number.");
    expect(() => shop.purchaseSweet(101, -2)).toThrow("Quantity must be a positive number.");
  });
});


//7.restoke
describe('Restock Sweets', () => {
  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 202, name: 'Barfi', category: 'Milk-Based', price: 20, quantity: 10 });
  });

  it('increases the quantity on restock', () => {
    shop.restockSweet(202, 15);
    const sweet = shop.viewSweets().find(s => s.id === 202);
    expect(sweet.quantity).toBe(25);
  });

  it('throws error if sweet does not exist', () => {
    expect(() => shop.restockSweet(999, 5)).toThrow("Sweet with ID 999 not found.");
  });

  it('throws error if restock quantity is zero or negative', () => {
    expect(() => shop.restockSweet(202, 0)).toThrow("Restock quantity must be a positive number.");
    expect(() => shop.restockSweet(202, -10)).toThrow("Restock quantity must be a positive number.");
  });
});


});
