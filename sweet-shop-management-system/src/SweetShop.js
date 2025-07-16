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


}

module.exports=SweetShop;