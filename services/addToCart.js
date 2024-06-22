import { getDoc, setDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/firebase";
import { useDispatch } from "react-redux";
import { setToast, toastMessage } from "@/redux/toast/toastSlice";

export function useAddToCart() {
  const dispatch = useDispatch();

  function addToCart(product) {
    const newCartProduct = { product, quantity: 1 };
    // Local storage.
    const localStorageCart = JSON.parse(localStorage.getItem("cart"));
    let tempCart = Array();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set new cart by userID in cart collection.
        getDoc(doc(firestore, "cart", user.uid)).then((docSnap) => {
          let firebaseCart = docSnap.data()?.products || [];
          if (docSnap.exists() && firebaseCart.length) {
            firebaseCart.find((item) => {
              // If add product, but is exists increase quantity by one.
              if (item.product.proId === newCartProduct.product.proId) {
                ++item.quantity;
                dispatch(setToast(true));
                dispatch(toastMessage("Increased product successfully."));
                setDoc(doc(firestore, "cart", user.uid), {
                  products: firebaseCart,
                });
              } else {
                // Add new product
                dispatch(setToast(true));
                dispatch(toastMessage("Add product successfully."));
                updateDoc(doc(firestore, "cart", user.uid), {
                  products: arrayUnion(newCartProduct),
                });
              }
            });
          } else {
            // Add new cart
            dispatch(setToast(true));
            dispatch(toastMessage("Add product successfully."));
            setDoc(doc(firestore, "cart", user.uid), {
              products: [newCartProduct],
            });
          }
        });
      } else {
        if (localStorageCart && localStorageCart.length) {
          localStorageCart.find((item) => {
            // If add product, but is exists increase quantity by one.
            if (item.product.proId === newCartProduct.product.proId) {
              ++item.quantity;
              dispatch(setToast(true));
              dispatch(toastMessage("Increased product successfully."));
              tempCart = [...localStorageCart];
            } else {
              // Add new product
              dispatch(setToast(true));
              dispatch(toastMessage("Add product successfully."));
              tempCart = [...localStorageCart, newCartProduct];
            }
            localStorage.setItem("cart", JSON.stringify(tempCart));
          });
        } else {
          // Add new cart
          dispatch(setToast(true));
          dispatch(toastMessage("Add product successfully."));
          localStorage.setItem("cart", JSON.stringify([newCartProduct]));
        }
      }
    });
    setTimeout(() => dispatch(setToast(false)), 3000);
  }
  return [addToCart];
}
