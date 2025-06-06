describe('End Point : Products', () => {
    it('Should return a list of products', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.products[0].title').should('equal', "Essence Mascara Lash Princess")
    });

    it('Should return product details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products/1',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.id').should('equal', 1)

    });

    it('Should return products based on search query', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products/search?q=phone',
        }).as('search')

        cy.get('@search').its('status').should('equal', 200)
        cy.get('@search').its('body.products[0].title').should('equal', "Apple AirPods Max Silver")

    });

     it('Should return products with limit and skip parameters applied', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products',
            qs: {
                limit: 10,
                skip: 10,
                select: 'title,price'
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.products').should('have.length',10)
    });

     it('Should sorting products by title', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products',
            qs: {
                sortBy: "title",
                order: "asc"
            }
        }).as('sort')

        cy.get('@sort').its('status').should('equal', 200)
        cy.get('@sort').its('body.products[0].title').should('equal',"300 Touring")
    });

    it('Should return all product categories', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products/categories',
        }).as('category')

        cy.get('@category').its('status').should('equal', 200)
        cy.get('@category').its('body[0].slug').should('equal', "beauty")

    });

        it('Should return all product category list', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products/category-list',
        }).as('category')

        cy.get('@category').its('status').should('equal', 200)
        cy.get('@category').its('body').should('include', "furniture")

    });

    it('Should return products for a specific category', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products/category/smartphones',
        }).as('smart')

        cy.get('@smart').its('status').should('equal', 200)
        cy.get('@smart').its('body.products[0].title').should('equal', "iPhone 5s")

    });

    it('Should create a new product', () => {
         var user1 = {
            "title":"Mackbook Pro 2025"
        }

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/products/add', 
            body: user1
        }).as('new')

        cy.get('@new').its('status').should('equal', 201)
        cy.get('@new').its('body.title').should('equal', "Mackbook Pro 2025")
    });

     it('Should update an existing product', () => {
         var user2 = {
            "title": "Ipad Pro M3",
            "price": 19.99,
            "rating": 3.56,
            "stock": 20
        }

        cy.request({
            method: 'PUT',
            url: 'https://dummyjson.com/products/1', 
            body: user2
        }).as('update')

        cy.get('@update').its('status').should('equal', 200)
        cy.get('@update').its('body.rating').should('equal', 3.56)
    });

        it('Should delete a product by ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://dummyjson.com/products/30',
        }).as('hapus')

        cy.get('@hapus').its('status').should('equal', 200)
        cy.get('@hapus').its('body.isDeleted').should('equal', true)
    });

});

describe('End Point : Carts', () => {
    it('Should return a list of carts', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/carts',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.carts[0].products[0].title').should('equal', "Charger SXT RWD")
    });

    it('Should return cart details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/carts/1',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.products[1].title').should('equal', "Apple MacBook Pro 14 Inch Space Grey")

    });

    it('Should return cart details by user', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/carts/user/6',
        }).as('search')

        cy.get('@search').its('status').should('equal', 200)
        cy.get('@search').its('body.carts[0].id').should('equal', 24)

    });

    it('Should create a new cart', () => {
         var user1 = {
            "userId": "1",
            "products": [{"id":"1","quantity":"1"}, {"id": "50","quantity": "2"}]
        }

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/carts/add', 
            body: user1
        }).as('new')

        cy.get('@new').its('status').should('equal', 201)
        cy.get('@new').its('body.products[1].quantity').should('equal', 2)
    });

     it('Should update an existing cart', () => {
         var user2 = {
            "merge": "true",
            "products": [{"id":"1","quantity":"10"}]
        }

        cy.request({
            method: 'PATCH',
            url: 'https://dummyjson.com/carts/1', 
            body: user2
        }).as('update')

        cy.get('@update').its('status').should('equal', 200)
        cy.get('@update').its('body.products[0].title').should('equal', "Charger SXT RWD")
    });

        it('Should delete a cart by ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://dummyjson.com/carts/10',
        }).as('hapus')

        cy.get('@hapus').its('status').should('equal', 200)
        cy.get('@hapus').its('body.isDeleted').should('equal', true)
    });

});

describe('End Point : Recipes', () => {
    it('Should return a list of recipes', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.recipes[0].name').should('equal', "Classic Margherita Pizza")
    });

    it('Should return recipe details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes/5',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.name').should('equal', "Mango Salsa Chicken")

    });

    it('Should return recipes based on search query', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes/search?q=Pizza',
        }).as('search')

        cy.get('@search').its('status').should('equal', 200)
        cy.get('@search').its('body.recipes[1].name').should('equal', "Italian Margherita Pizza")

    });
    
    it('Should return recipes with limit and skip parameters applied', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes',
            qs: {
                limit: 10,
                skip: 10,
                select: 'name,image'
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.recipes').should('have.length',10)
    });

    it('Should sorting recipes by name', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes/search',
            qs: {
                sortBy: "name",
                order: "asc"
            }
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.recipes[0].name').should('equal', "Aloo Keema")

    });

    it('Should return all tags of recipes', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes/tags',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body').should('include', 'Vegetarian')

    });

    it('Should return recipes by tag', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes/tag/Pakistani',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.recipes[0].name').should('equal', 'Chicken Biryani')

    });

    it('Should return recipes by meal-type', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/recipes/meal-type/snack',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.recipes[0].name').should('equal', 'Chocolate Chip Cookies')

    });

    it('Should create a new recipe', () => {
         var user1 = {
             "name" : "Tasty Pizza"
        }

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/recipes/add', 
            body: user1
        }).as('new')

        cy.get('@new').its('status').should('equal', 200)
        cy.get('@new').its('body.name').should('equal', "Tasty Pizza")
    });

     it('Should update an existing recipe', () => {
         var user2 = {
            "name" : "Tasty Pizza"
        }

        cy.request({
            method: 'PUT',
            url: 'https://dummyjson.com/recipes/10', 
            body: user2
        }).as('update')

        cy.get('@update').its('status').should('equal', 200)
        cy.get('@update').its('body.name').should('equal',"Tasty Pizza")
    });

        it('Should delete a recipe by ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://dummyjson.com/recipes/5',
        }).as('hapus')

        cy.get('@hapus').its('status').should('equal', 200)
        cy.get('@hapus').its('body.isDeleted').should('equal', true)
    });

});

describe('End Point : Users', () => {
    it('Should return a list of users', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.users[0].firstName').should('equal', "Emily")
    });

    it('Should return user details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users/1',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.lastName').should('equal', "Johnson")

    });

    it('Should return user based on search query', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users/search?q=John',
        }).as('search')

        cy.get('@search').its('status').should('equal', 200)
        cy.get('@search').its('body.users[1].firstName').should('equal', "John")

    });

     it('Should filter users by some parameter', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users/filter',
            qs: {
                key: "hair.color",
                value: "Brown"
            }
        }).as('filter')

        cy.get('@filter').its('status').should('equal', 200)
        cy.get('@filter').its('body.users[0].hair.color').should('equal', "Brown")
    });
    
    
    it('Should return users with limit and skip parameters applied', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users',
            qs: {
                limit: 5,
                skip: 10,
                select: 'firstName,age'
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.users').should('have.length',5)
    });

    it('Should sorting users by firstName', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users',
            qs: {
                sortBy: 'firstName',
                order: 'asc'
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.users[0].firstName').should('equal', "Aaliyah")
    });
    
    it('Should return users carts by user id', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users/6/carts',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.carts[0].products[0].title').should('equal', "iPhone 12 Silicone Case with MagSafe Plum")

    });

   it('Should return users posts by user id', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users/6/posts',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.posts[0].title').should('equal', "He swung back the fishing pole and cast the line")

    });

  it('Should return users todos by user id', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users/6/todos',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.todos[0].todo').should('equal', "Draw and color a Mandala")

    });

    it('Should create a new user', () => {
         var user1 = {
            "firstName": "Loid",
            "lastName": "Forger",
            "age": "25",
            "gender":"male",
            "email":"spyxfamily@gmail.com",
            "phone":"087689647823",
            "username":"spyx"
        }

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/users/add', 
            body: user1
        }).as('new')

        cy.get('@new').its('status').should('equal', 201)
        cy.get('@new').its('body.username').should('equal', "spyx")
    });

     it('Should update an existing user', () => {
         var user2 = {
            "password" : "Twilight"
        }

        cy.request({
            method: 'PUT',
            url: 'https://dummyjson.com/users/100', 
            body: user2
        }).as('update')

        cy.get('@update').its('status').should('equal', 200)
        cy.get('@update').its('body.password').should('equal',"Twilight")
    });

        it('Should delete a user by ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://dummyjson.com/users/79',
        }).as('hapus')

        cy.get('@hapus').its('status').should('equal', 200)
        cy.get('@hapus').its('body.isDeleted').should('equal', true)
    });

});

describe('End Point : Todos', () => {
    it('Should return a list of todos', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/todos',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.todos[0].todo').should('equal', "Do something nice for someone you care about")
    });

    it('Should return todo details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/todos/2',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.todo').should('equal', "Memorize a poem")

    });

    it('Should return a random todo', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/todos/random',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
    });

        it('Should return all todos by user Id', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/todos/user/6',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.todos[0].todo').should('equal', "Draw and color a Mandala")

    });
    
    it('Should return todos with limit and skip parameters applied', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/todos',
            qs: {
                limit: 3,
                skip: 10,
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.todos').should('have.length',3)
    });

    it('Should create a new todo', () => {
         var user1 = {
            "todo":"Use DummyJSON in the project",
            "completed": "false",
            "userId": 5
        }

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/todos/add', 
            body: user1
        }).as('new')

        cy.get('@new').its('status').should('equal', 201)
        cy.get('@new').its('body.todo').should('equal', "Use DummyJSON in the project")
    });

     it('Should update an existing todo', () => {
         var user2 = {
            "todo": "Spyxfamily Loid forger"
        }

        cy.request({
            method: 'PATCH',
            url: 'https://dummyjson.com/todos/1', 
            body: user2
        }).as('update')

        cy.get('@update').its('status').should('equal', 200)
        cy.get('@update').its('body.todo').should('equal',"Spyxfamily Loid forger")
    });

        it('Should delete a todo by ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://dummyjson.com/todos/79',
        }).as('hapus')

        cy.get('@hapus').its('status').should('equal', 200)
        cy.get('@hapus').its('body.isDeleted').should('equal', true)
    });

});

describe('End Point : Posts', () => {
    it('Should return a list of posts', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.posts[0].title').should('equal', "His mother had always taught him")
    });

    it('Should return post details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts/2',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.title').should('equal', "He was an expert but not in a discipline")

    });

    it('Should return post based on search query', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts/search',
             qs: {
                q: "love",
            }
        }).as('search')

        cy.get('@search').its('status').should('equal', 200)
        cy.get('@search').its('body.posts[1].title').should('equal', "It was so great to hear from you today")

    });
    
    it('Should return posts with limit and skip parameters applied', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts',
            qs: {
                limit: 10,
                skip: 10,
                select: 'title, reaction, userid'
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.posts').should('have.length',10)    
    });

    it('Should sorting posts by title ', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts',
            qs: {
                sortBy: "title",
                order: "asc",
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.posts[0].title').should('equal', "'My dear Bounderby,' Mr. Gradgrind began")
    });
    
    it('Should return all posts tags', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts/tags',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body[0].slug').should('equal', "history")

    });

    it('Should return all posts tag list', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts/tag-list',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body').should('include', "french")

    });

    it('Should return posts by a tag', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts/tag/life',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.posts[0].tags').should('include', "life")

    });

    
        it('Should return posts by user id', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts/user/5',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.posts[0].title').should('equal', "I'm going to hire professional help tomorrow.")

    });

    it('Should return posts by comments', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/posts/1/comments',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.comments[0].body').should('equal', "These are fabulous ideas!")

    });


        it('Should return user posts by user id', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/users/5/posts',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.posts[0].title').should('equal', "I'm going to hire professional help tomorrow.")

    });

    it('Should create a new post', () => {
         var user1 = {
            "title": "Hello World",
            "userId": "5"
        }

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/posts/add', 
            body: user1
        }).as('new')

        cy.get('@new').its('status').should('equal', 201)
        cy.get('@new').its('body.title').should('equal', "Hello World")
    });

     it('Should update an existing post', () => {
         var user2 = {
            "title": "Aku tak mau jadi mataharimu"
        }

        cy.request({
            method: 'PATCH',
            url: 'https://dummyjson.com/posts/100', 
            body: user2
        }).as('update')

        cy.get('@update').its('status').should('equal', 200)
        cy.get('@update').its('body.title').should('equal',"Aku tak mau jadi mataharimu")
    });

        it('Should delete a post by ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://dummyjson.com/posts/79',
        }).as('hapus')

        cy.get('@hapus').its('status').should('equal', 200)
        cy.get('@hapus').its('body.isDeleted').should('equal', true)
    });

});

describe('End Point : Comments', () => {
    it('Should return a list of comments', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/comments',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.comments[0].body').should('equal', "This is some awesome thinking!")
    });

    it('Should return comment details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/comments/2',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.id').should('equal', 2)

    });
    
    it('Should return comments with limit and skip parameters applied', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/comments',
            qs: {
                limit: 10,
                skip: 10,
                select: 'title, reaction, userid'
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.comments').should('have.length',10)
    });

    it('Should return comments by post id', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/comments/post/13',
        }).as('carts-id')

        cy.get('@carts-id').its('status').should('equal', 200)
        cy.get('@carts-id').its('body.comments[1].body').should('equal', "The control of excellence lies inside the soul.")

    });

    it('Should create a new comment', () => {
         var user1 = {
            "body": "This makes all sense to me!",
            "postId": "3",
            "userId": "5"
        }

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/comments/add', 
            body: user1
        }).as('new')

        cy.get('@new').its('status').should('equal', 201)
        cy.get('@new').its('body.body').should('equal', "This makes all sense to me!")
    });

     it('Should update an existing comment', () => {
         var user2 = {
            "body": "This makes all sense to me!"
        }

        cy.request({
            method: 'PATCH',
            url: 'https://dummyjson.com/comments/3', 
            body: user2
        }).as('update')

        cy.get('@update').its('status').should('equal', 200)
        cy.get('@update').its('body.body').should('equal',"This makes all sense to me!")
    });

        it('Should delete a comment by ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://dummyjson.com/comments/79',
        }).as('hapus')

        cy.get('@hapus').its('status').should('equal', 200)
        cy.get('@hapus').its('body.isDeleted').should('equal', true)
    });

});

describe('End Point : Quotes', () => {
    it('Should return a list of quotes', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/quotes',
        }).as('list')

        cy.get('@list').its('status').should('equal', 200)
        cy.get('@list').its('body.quotes[0].quote').should('equal', "Your heart is the size of an ocean. Go find yourself in its hidden depths.")
    });

    it('Should return quote details by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/quotes/2',
        }).as('prod')

        cy.get('@prod').its('status').should('equal', 200)
        cy.get('@prod').its('body.quote').should('equal', "The Bay of Bengal is hit frequently by cyclones. The months of November and May, in particular, are dangerous in this regard.")

    });

    it('Should return a random quotes', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/quotes/random',
        }).as('search')

        cy.get('@search').its('status').should('equal', 200)
    });

     it('Should return quotes with limit and skip parameters applied', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/quotes',
            qs: {
                limit: 3,
                skip: 10,
            }
        }).as('limit')

        cy.get('@limit').its('status').should('equal', 200)
        cy.get('@limit').its('body.quotes').should('have.length',3)
    });
});

