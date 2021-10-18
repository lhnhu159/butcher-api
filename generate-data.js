const faker = require("faker");
const fs = require("fs");

faker.locale = "en";

console.log(faker.commerce.product());

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

const randomProductList = (categoryList, n) => {
    if(n <= 0) return [];
    const productList = [];

    for(const category of categoryList){
        Array.from(new Array(n)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                image: faker.image.imageUrl(400, 400)
            };
            productList.push(product);
        })
    }

    return productList;
}

(() => {
  const categoryList = randomCategoryList(5);
  const productList = randomProductList(categoryList, 5);
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Neil",
    },
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("general data successfully");
  });
})();
