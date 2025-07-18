class SweetShop {
  constructor() {
    this.sweets = []; //Create Empty inventory
    
  }

//view all sweets
viewSweets() {
    return this.sweets;
  }

//add sweet
addSweet(sweet) {
    //require fileds for any Sweets
    const requiredFields = ['id', 'name', 'category', 'price', 'quantity'];
   
    for (let field of requiredFields) {
      if (!(field in sweet)) {
        throw new Error("Invalid sweet object");
      }
    }

    //Checking for ID already exists.(Unique ID)
    if (this.sweets.some(s => s.id === sweet.id)) {
      throw new Error("Sweet with this ID already exists.");
    }

    this.sweets.push(sweet);
  }


 //delet sweet
  deleteSweet(id) {
  const index = this.sweets.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error(`Sweet with ID ${id} not found.`);
  }
  this.sweets.splice(index, 1);
}

//search
search(criteria = {}) {
  return this.sweets.filter(sweet => {
    const nameMatch = criteria.name ? sweet.name.toLowerCase().includes(criteria.name.toLowerCase()) : true;
    const categoryMatch = criteria.category ? sweet.category.toLowerCase() === criteria.category.toLowerCase() : true;
    const priceMatch =
      (criteria.minPrice !== undefined ? sweet.price >= criteria.minPrice : true) &&
      (criteria.maxPrice !== undefined ? sweet.price <= criteria.maxPrice : true);
    
    return nameMatch && categoryMatch && priceMatch;
  });
}


//sort
sortBy(field, order = 'asc') {
  const validFields = ['name', 'category', 'price'];
  if (!validFields.includes(field)) {
    throw new Error(`Invalid sort field: ${field}`);
  }

  const sorted = [...this.sweets].sort((a, b) => {
    if (typeof a[field] === 'string') {
      return a[field].localeCompare(b[field]);
    }
    return a[field] - b[field]; // for numbers like price
  });

  return order === 'desc' ? sorted.reverse() : sorted;
}

// purses
purchaseSweet(id, quantity) {
  if (quantity <= 0) {
    throw new Error("Quantity must be a positive number.");
  }

  const sweet = this.sweets.find(s => s.id === id);
  if (!sweet) {
    throw new Error(`Sweet with ID ${id} not found.`);
  }

  if (sweet.quantity < quantity) {
    throw new Error(`Insufficient stock for sweet ID ${id}.`);
  }

  sweet.quantity -= quantity;
  this.totalRevenue += sweet.price * quantity;

}

//restock
restockSweet(id, quantity) {
  if (quantity <= 0) {
    throw new Error("Restock quantity must be a positive number.");
  }

  const sweet = this.sweets.find(s => s.id === id);
  if (!sweet) {
    throw new Error(`Sweet with ID ${id} not found.`);
  }

  sweet.quantity += quantity;
}


//low stock alert
getLowStockItems(threshold = 5) {
  return this.sweets.filter(s => s.quantity < threshold);
}


}

module.exports=SweetShop;