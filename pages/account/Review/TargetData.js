import { AccountPageLayout } from "@/layouts/AccountLayout";
import { Rating, Typography } from "@material-tailwind/react";
import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";
import { MyDataContext } from "./[ReviewList]";
import { Timestamp } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
export default function TargetData({ ReviewList, addUserOrders }) {
  const router = useRouter();
  const userOrders = useContext(MyDataContext);
  const [matchedOrder, setMatchedOrder] = useState(null);
  const { t } = useTranslation("account");
  const { locale } = useRouter();
  //Get Current Date in dd/mm/yy format
  let currentDate = Timestamp.now().toDate();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // loop on orders array to match between Target id & order id to choose the right one
  useEffect(() => {
    const order = userOrders.find(
      (order) =>
        order.items[0].product.proId === ReviewList &&
        order.status === "delivered"
    );
    setMatchedOrder(order);
  }, [userOrders]);

  //useState of form inputs & Error validation
  const [rate, setrate] = useState(0);
  const [ReviewTitle, setReviewTitle] = useState("");
  const [name, setName] = useState("");
  const [ReviewTitleDetail, setReviewTitleDetail] = useState("");
  const [formError, setFormError] = useState({
    ReviewTitle: "",
    name: "",
    ReviewTitleDetail: "",
    rating: "",
  });

  // rate cases (secondary)
  const getTextBasedOnRating = () => {
    if (rate >= 4) {
      return "Great rating!";
    } else {
      return "Okay rating.";
    }
  };

  // Form validation
  const handleSubmit = () => {
    const errors = {};
    if (!ReviewTitle) {
      errors.ReviewTitle = "Evaluation title is required";
    }
    if (!name) {
      errors.name = "Name is required";
    }
    if (!ReviewTitleDetail) {
      errors.ReviewTitleDetail = "Evaluation detail is required";
    }
    if (rate === 0) {
      errors.rating = "Rating is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }
    var evaluation = {
      ReviewTitle: ReviewTitle,
      name: name,
      ReviewTitleDetail: ReviewTitleDetail,
      rate: rate,
      date: formattedDate,
    };
    addUserOrders(evaluation);

    // Clear the form inputs and rating
    setrate(0);
    setReviewTitle("");
    setName("");
    setReviewTitleDetail("");
    setFormError({
      ReviewTitle: "",
      name: "",
      ReviewTitleDetail: "",
      rating: "",
    });
    router.back();
  };

  return (
    <>
      <div className="box-border h-full">
        <header className="py-2 px-4">
          <div className="flex items-center border-b">
            <ArrowBackIcon
              className="mr-2 cursor-pointer hover:text-gray-500"
              onClick={() => router.back()}
            />
            <h2 className="py-2">{t("Pending Reviews")}</h2>
          </div>
          <h5 className="border-b py-2">
            {t("Choose a star to rate the product")}
          </h5>
        </header>
        <div className="text-center py-8 items-center h-full">
          {/* conditional rendering  */}
          {matchedOrder && (
            <div className="flex flex-start">
              <img
                key={matchedOrder.items[0].product.proId}
                src={matchedOrder.items[0].product.thumbnail}
                alt="Product Image"
                className="m-4 h-40"
              />
              <span className="flex flex-col">
                <p>
                  {locale == "en"
                    ? matchedOrder.items[0].product.en.title
                    : matchedOrder.items[0].product.ar.title}
                </p>
                <span className="flex flex-col flex-start">
                  <div className="flex items-center">
                    <Rating value={rate} onChange={(value) => setrate(value)} />
                    <Typography
                      color="blue-gray"
                      className="font-medium text-blue-gray-500 ml-2"
                    >
                      {getTextBasedOnRating()}
                    </Typography>
                  </div>
                  {formError.rating && (
                    <Typography color="red">{formError.rating}</Typography>
                  )}
                </span>
              </span>
            </div>
          )}
          <p className="flex items-start border-b py-4">
            {t("Write a comment")}
          </p>
          <Box
            className="py-5 flex gap-5"
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label={t("Review title")}
              variant="outlined"
              className="w-1/2 py-2 focus:outline-none focus:border-none"
              value={ReviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              error={!!formError.ReviewTitle}
              helperText={formError.ReviewTitle}
              required
            />
            <TextField
              id="filled-basic"
              label={t("Your name")}
              variant="outlined"
              className="w-1/2 py-2 focus:outline-none focus:border-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!formError.name}
              helperText={formError.name}
              required
            />
          </Box>
          <TextField
            id="outlined-multiline-static"
            label={t("Detailed Review")}
            multiline
            rows={4}
            placeholder="Tell us more about your review"
            variant="outlined"
            className="w-full focus:outline-none focus:border-none"
            value={ReviewTitleDetail}
            onChange={(e) => setReviewTitleDetail(e.target.value)}
            error={!!formError.ReviewTitleDetail}
            helperText={formError.ReviewTitleDetail}
            required
          />
          <Button
            variant="filled"
            color="orange"
            className="w-full mt-5"
            onClick={handleSubmit}
          >
            {t("SUBMIT YOUR REVIEW")}
          </Button>
        </div>
      </div>
    </>
  );
}

TargetData.getLayout = AccountPageLayout;
