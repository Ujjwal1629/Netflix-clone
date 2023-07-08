import React, { useEffect, useState } from "react";
import db from "../Firebase";
import "./PlanScreen.css";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function PlanScreen() {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  console.log(products);
  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(error.message);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51NOxbxSDxfw8kG8f0Wpbw4Cm9rNH8dUEnkssrrxZOyO9qCE69230ocKOq6DdDtoc1tlwnkkGP9uBOsmaTbvUAoBM007nDI4zWz"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="planScreen">
      {subscription && (
        <p className="renewal">
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPlan = productData.name?.includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPlan && "PlanScreen_plans--disabled"
            } PlanScreen_plans`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPlan && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPlan ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
