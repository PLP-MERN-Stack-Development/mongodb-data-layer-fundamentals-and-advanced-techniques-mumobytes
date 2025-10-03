# PLP Bookstore – MongoDB Assignment

##  Overview
This project demonstrates MongoDB CRUD operations, advanced queries, aggregation pipelines, and indexing using a `books` collection.  
It forms part of the **MongoDB Data Layer Fundamentals and Advanced Techniques** assignment.

---

## 🧱 Database Setup
**Database:** `plp_bookstore`  
**Collection:** `books`

Each document contains:
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "published_year": 2000,
  "price": 12.99,
  "in_stock": true,
  "pages": 320,
  "publisher": "Publisher Name"
}

## How to run
**node insert_books.js