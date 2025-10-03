//Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
}).pretty()

// Use projection to return only title, author, and price fields
db.books.find(
  {}, 
  { title: 1, author: 1, price: 1, _id: 0 }
).pretty()

// Implement sorting to display books by price (ascending)
db.books.find().sort({ price: 1 }).pretty()

// Implement sorting to display books by price (descending)
db.books.find().sort({ price: -1 }).pretty()

// Pagination: display 5 books per page
// Page 1
db.books.find().limit(5).pretty()
// Page 2
db.books.find().skip(5).limit(5).pretty()


// Aggregation: Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      totalBooks: { $sum: 1 }
    }
  },
])

// Aggregation: Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  }
])


// Aggregation: Group books by decade and count them
db.books.aggregate([
  {
    $addFields: {
      decade: {
        $concat: [
          { $toString: { $subtract: [ { $subtract: [ "$published_year", { $mod: [ "$published_year", 10 ] } ] }, 0 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])



// Indexing

// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Explain query performance
db.books.find({ title: "1984" }).explain("executionStats")
db.books.find({ author: "George Orwell", published_year: { $gt: 1900 } }).explain("executionStats")
