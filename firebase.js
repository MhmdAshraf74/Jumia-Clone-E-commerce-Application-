// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { data } from "./data";
import SuperJSON from "superjson";
import { CollectionsRounded } from "@mui/icons-material";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAThtL3FG5oSY1_-DQq6cvod0T463-Nwlc",
  authDomain: "iti-final-project0.firebaseapp.com",
  projectId: "iti-final-project0",
  storageBucket: "iti-final-project0.appspot.com",
  messagingSenderId: "590751786816",
  appId: "1:590751786816:web:cc6dbbc1feb8e65dda7ca5",
  measurementId: "G-5N6JRTD2XG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
let products = data;
export const addNewProduct = async (product) => {
  const productDocRef = doc(firestore, "Products", product.proId);
  const productSnapshot = await getDoc(productDocRef);

  if (!productSnapshot.exists()) {
    const {
      en,
      ar,
      thumbnail,
      images,
      categoryId,
      subCategoryId,
      sku,
      quantityInStock,
      price,
      discountPercentage,
      rating,
      ratingQuantity,
      sold,
    } = product;
    try {
      await setDoc(productDocRef, {
        en,
        ar,
        thumbnail,
        images,
        categoryId,
        subCategoryId,
        sku,
        quantityInStock,
        price,
        discountPercentage,
        rating,
        ratingQuantity,
        sold,
      });
    } catch (err) {
      console.log("err creating", err.message);
    }
  }

  return productDocRef;
};
// Function to add products to the Firestore database
async function addProducts(products) {
  try {
    for (const product of products) {
      // Add each product to the "products" collection in Firestore
      const docRef = await addDoc(collection(firestore, "products"), product);
      console.log("Product written with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error adding products: ", e);
  }
}
// addProducts(products);

// Function to retrieve all products from the Firestore database
let lastDocument = null;
export const getAllProducts = async () => {
  try {
    let productsQuery;
    if (lastDocument) {
      productsQuery = query(startAfter(lastDocument), limit(20));
    } else {
      productsQuery = query(collection(firestore, "products"), limit(20));
    }
    const snapshot = await getDocs(productsQuery);
    const productsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productsData;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Function to retrieve a product by its ID from the Firestore database
export const getProductById = async (id) => {
  let productRef = doc(firestore, "products", id);

  let respose = await getDoc(productRef);
  if (respose.exists()) {
    const data = respose.data();
    console.log(data);
    let res = SuperJSON.serialize(data);
    return res;
  } else {
    console.log("No such document!");
  }
};

// Function to add categories to the Firestore database
async function addCategories(categories) {
  try {
    for (const category of categories) {
      // Add each category to the "categories" collection in Firestore
      await setDoc(doc(firestore, "categories", category.id), {
        name: category.name,
        description: category.description,
      });
      console.log("Category added with ID: ", category.id);
    }
    console.log("All categories added successfully.");
  } catch (e) {
    console.error("Error adding categories: ", e);
  }
}
// addCategories(categories);

// Function to retrieve a category by its name from the Firestore database
export const getCategoryByName = async (name) => {
  let querys1 = query(
    collection(firestore, "categories"),
    where("name", "==", name)
  );
  let respose = await getDocs(querys1);
  let category = {};
  respose.docs.forEach((cat) => {
    category = { id: cat.id, ...cat.data() };
  });
  return category;
};

// Function to retrieve a subcategory by its name and category ID from the Firestore database
export const getSubCategoryByName = async (name, catid) => {
  try {
    const subcategoriesRef = collection(
      firestore,
      "categories",
      catid,
      "Subcategories"
    );
    const q = query(subcategoriesRef, where("name", "==", name));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    let category = {};
    querySnapshot.forEach((doc) => {
      category = { id: doc.id, ...doc.data() };
    });

    return category;
  } catch (error) {
    console.error("Error getting subcategory:", error);
    throw error;
  }
};

// Function to retrieve all subcategories under a specified category ID from the Firestore database
export const getAllSubCategories = async (catid) => {
  try {
    const subcategoriesRef = collection(
      firestore,
      "categories",
      catid,
      "Subcategories"
    );
    const querySnapshot = await getDocs(subcategoriesRef);
    console.log(querySnapshot);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }
    let category = [];
    querySnapshot.forEach((doc) => {
      category.push({ id: doc.id, ...doc.data() });
    });
    return category;
  } catch (error) {
    console.error("Error getting subcategory:", error);
    throw error;
  }
};

// Function to retrieve products by their category ID from the Firestore database
export const getProductsByCategoryId = async (id) => {
  let querys1 = query(
    collection(firestore, "products"),
    where("categoryId", "==", id)
  );
  let respose = await getDocs(querys1);
  let products = [];
  respose.docs.forEach((cat) => {
    products.push({ id: cat.id, ...cat.data() });
  });
  return products;
};

// Function to retrieve products by their subcategory ID from the Firestore database
export const getProductsBySubCategoryId = async (subId) => {
  let querys1 = query(
    collection(firestore, "products"),
    where("subCategoryId", "==", subId)
  );
  let respose = await getDocs(querys1);
  let products = [];
  respose.docs.forEach((cat) => {
    products.push({ id: cat.id, ...cat.data() });
  });
  return products;
};

// Function to retrieve products from the user's cart
export const fetchCartProducts = (user, setCartProducts) => {
  try {
    if (user) {
      const cartRef = doc(firestore, "cart", user.uid);
      onSnapshot(cartRef, (snapshot) => {
        setCartProducts(snapshot.data()?.products || []);
      });
    } else {
      const productsFromLocalStorage =
        JSON.parse(localStorage.getItem("cart")) || [];
      setCartProducts(productsFromLocalStorage);
    }
  } catch (error) {
    console.error("Error fetching cart products:", error);
  }
};

// Function to retrieve order details for a specified user
export async function getOrderDetailsData(user) {
  return new Promise((resolve, reject) => {
    if (user) {
      const orderDetailsRef = collection(firestore, "order-details");
      const q = query(orderDetailsRef, where("userId", "==", user.uid));
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            let data = querySnapshot.docs[0].data();
            resolve(data);
          } else {
            reject("No order details found for the user.");
          }
        })
        .catch((error) => {
          reject("Error fetching order details: " + error);
        });
    } else {
      reject("User is not authenticated.");
    }
  });
}

export const fetchOrderDetails = async (userId) => {
  if (userId) {
    const orderDetailsRef = collection(firestore, "order-details");
    const q = query(orderDetailsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const orderDetailsData = querySnapshot.docs[0].data();
      return orderDetailsData;
    } else {
      console.log("No such document!");
      return undefined;
    }
  }
};

// async function getOrderSubcollection(userId) {
//   const orderDetailsRef = collection(firestore, "order-details");
//   const q = query(orderDetailsRef, where("userId", "==", userId));

//   try {
//     const querySnapshot = await getDocs(q);
//     if (!querySnapshot.empty) {
//       const docRef = querySnapshot.docs[0].ref;
//       const orderSubcollectionRef = collection(docRef, "orders");
//       const orderQuerySnapshot = await getDocs(orderSubcollectionRef);

//       const orders = [];
//       orderQuerySnapshot.forEach((doc) => {
//         orders.push({ id: doc.id, ...doc.data() });
//       });

//       return orders;
//     } else {
//       return []; // No orders found for the user
//     }
//   } catch (error) {
//     console.log("Error getting order subcollection:", error);
//     return null;
//   }
// }
export async function getOrderSubcollection(userId) {
  const orderDetailsRef = collection(firestore, "order-details");
  const q = query(orderDetailsRef, where("userId", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const orderSubcollectionRef = collection(docRef, "orders");
      const orderQuerySnapshot = await getDocs(orderSubcollectionRef);

      const orders = [];
      orderQuerySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return orders; // Return the orders
    } else {
      console.log("No orders found for the user");
      return []; // No orders found for the user
    }
  } catch (error) {
    console.log("Error getting order subcollection:", error);
    throw error; // Propagate the error
  }
}
export async function CancelOrderById(userId, id) {
  const orderDetailsRef = collection(firestore, "order-details");
  const q = query(orderDetailsRef, where("userId", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const orderSubcollectionRef = doc(docRef, "orders", id);
      const orderQuerySnapshot = await getDoc(orderSubcollectionRef);
      console.log(orderQuerySnapshot.data());

      await updateDoc(orderSubcollectionRef, {
        ...orderQuerySnapshot.data(),
        status: "Cancelled",
      });
      console.log("Your order Updated");
    } else {
      console.log("No order found");
    }
  } catch (err) {
    console.log("Error getting order:" + err);
  }
}
export async function getOrderById(userId, id) {
  const orderDetailsRef = collection(firestore, "order-details");
  const q = query(orderDetailsRef, where("userId", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const orderSubcollectionRef = doc(docRef, "orders", id);
      const orderQuerySnapshot = await getDoc(orderSubcollectionRef);
      console.log(orderQuerySnapshot.data());
      return orderQuerySnapshot.data();
    } else {
      console.log("No order found");
      return null;
    }
  } catch (err) {
    console.log("Error getting order:" + err);
  }
}

let result = null;
export async function getSearch(query) {
  let data = Array();
  if (result) {
    data = result.docs.filter((doc) => {
      const product = doc.data();
      const titleEn = product.en.title.toLowerCase();
      const titleAr = product.ar.title
      const matchingSearchEn = titleEn.includes(query.toLowerCase());
      const matchingSearchAr = titleAr.includes(query);
      if (matchingSearchEn || matchingSearchAr) {
        return doc;
      }
    });
  } else {
    result = await getDocs(collection(firestore, "products"));
  }
  return data;
}
