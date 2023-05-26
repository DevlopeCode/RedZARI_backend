const router = require("express").Router();
const {
  authenticate,
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const Product = require("../Modals/Product");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${file.originalname}`;
    cb(null, uniqueName);
  },
});


  const upload = multer({  storage,
    limits: { fileSize: 1000000 * 5 }, });
//Create Product
// POST /api/products
router.post("/", upload.single('img'),authenticateTokenAdmin, async (req, res) => {
 
 const image = req.file.path;
 console.log(req.file.path);
 const { title ,desc,color,size,categories,price,inStock}=req.body
  const newProduct = new Product({
    title ,desc,color,size,categories,price,inStock,img:image
  });

  newProduct
    .save()
    .then((product) => {
      return res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.code!==11000 ? err.message: `${Object.keys(err.keyValue).toString()} Must be unique`

      });
    });
});

//Update a product
// PUT /api/products/:id
router.put("/", authenticateAdmin, async (req, res) => {

  Product.findByIdAndUpdate(req?.query?.id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      return res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Delete a product
// DELETE /api/products/:id
router.delete("/", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
 Product.remove({ _id: req?.query?.id })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      return res.status(200).json({
        Message: "Product deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get a product
// GET /api/products/find/:id
router.get("/details", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  Product.findById(req?.query?.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      return res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get all products
// GET /api/products
router.get("/find/", async (req, res) => {

  const qNew = req.query.new;
  const qCategory = req.query.category;
  // console.log(qCategory);
  if (qNew) {
    Product.find()
      .sort({ _id: -1 })
      .limit(5)
      .then((products) => {
        if (!products) {
          return res.status(404).json({
            error: "No products found",
          });
        }
        return res.status(200).json({
          products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
  if (qCategory) {
    // Product.find({ categories: { $in: [qCategory] } }).exec()
    Product.find({
      categories: {
        $in: [qCategory],
      },
    })
      .then((products) => {
        // console.log(products);
        if (!products) {
          return res.status(404).json({
            error: "No products found",
          });
        }
        return res.status(200).json({
          products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  } else {
    Product.find()
      .then((products) => {
        if (!products) {
          return res.status(404).json({
            error: "No products found",
          });
        }
        return res.status(200).json({
          products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
});


module.exports = router;
