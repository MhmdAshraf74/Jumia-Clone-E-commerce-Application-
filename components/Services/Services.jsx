import React, { useState } from "react";
import styles from "../../styles/Services.module.css";
import Toggler from "../Toggler/Toggler";
import { useTranslation } from "next-i18next";

export default function Services() {
  const [activeItem, setActiveItem] = useState(null);
  const { t } = useTranslation("help");
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <div>
      <div className={`${styles.hero} w-full`}>
        <div className={`${styles.center} w-full`}>
          <div className={styles.center}>
            <h2>Help Center</h2>
            <h1>Hi, how can we help you?</h1>
          </div>
        </div>
        <div
          className={` ${styles.parent} mx-auto w-full max-w-1170 flex justify-between`}
        >
          <div
            className={`${styles.guide} ${
              activeItem === 8 ? `${styles.Top}` : ""
            }`}
            onClick={() => handleItemClick(8)}
          >
            <span className={`${styles.clickable}`} data-type="guide"></span>
            <p className={`${styles.txt}`}>{t("Place an Order")}</p>
            <img
              className={`${styles.img}`}
              src="https://cxp-desktop.netlify.app/jpg/how-to-place-order-d.png"
              alt="icon"
            />
          </div>
          <div
            className={`${styles.guide} ${
              activeItem === 9 ? `${styles.Top}` : ""
            }`}
            onClick={() => handleItemClick(9)}
          >
            <span className={`${styles.clickable}`} data-type="guide"></span>
            <p className={`${styles.txt}`}>{t("Track Your Order")}</p>
            <img
              className={`${styles.img}`}
              src="https://cxp-desktop.netlify.app/jpg/how-to-track-order-d.png"
              alt="icon"
            />
          </div>
          <div
            className={`${styles.guide} ${
              activeItem === 10 ? `${styles.Top}` : ""
            }`}
            onClick={() => handleItemClick(10)}
          >
            <span className={`${styles.clickable}`} data-type="guide"></span>
            <p className={`${styles.txt}`}>{t("Pay For Order")}</p>
            <img
              className={`${styles.img}`}
              src="https://cxp-desktop.netlify.app/jpg/how-to-pay-for-order-d.png"
              alt="icon"
            />
          </div>
          <div
            className={`${styles.guide} ${
              activeItem === 11 ? `${styles.Top}` : ""
            }`}
            onClick={() => handleItemClick(11)}
          >
            <span className={`${styles.clickable}`} data-type="guide"></span>
            <p className={`${styles.txt}`}>{t("Cancel Your Order")}</p>
            <img
              className={styles.img}
              src="https://cxp-desktop.netlify.app/jpg/how-to-cancel-order-d.png"
              alt="icon"
            />
          </div>
          <div
            className={`${styles.guide} ${
              activeItem === 12 ? `${styles.Top}` : ""
            }`}
            onClick={() => handleItemClick(12)}
          >
            <span className={`${styles.clickable}`} data-type="guide"></span>
            <p className={`${styles.txt}`}>{t("Create a Return")}</p>
            <img
              className={`${styles.img}`}
              src="https://cxp-desktop.netlify.app/jpg/how-to-request-return-d.png"
              alt="icon"
            />
          </div>
        </div>
        {/* Search bar */}
        <div className={`${styles.center}`}>
          <div className="relative py-3  rounded w-full max-w-lg">
            <input
              type="text"
              className="rounded p-2 w-full pl-12 focus:outline-none"
              placeholder={t("Type keywords like 'return'")}
            />

            <button
              type="submit"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
        <Toggler activeItem={activeItem} />
      </div>
    </div>
  );
}
