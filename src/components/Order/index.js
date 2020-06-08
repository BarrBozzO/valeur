import React, { useState } from "react";
import Portal from "components/Portal";
import InterviewIll from "assets/order/interview.svg";

import styles from "./Order.module.scss";

function Order({ visible, onClose }) {
  return visible ? (
    <Portal
      classNames={{
        content: styles["order__portal"],
        close: styles["order__portal-close"],
      }}
      isModal
      onClose={onClose}
    >
      <div className={styles["order"]}>
        <div className={styles["order__title"]}>Как заказать?</div>
        <div className={styles["order__text"]}>
          <div>Вы можете связаться любым удобным для вас способом.</div>
          <div className={styles["order__illustration"]}>
            <InterviewIll />
          </div>
        </div>
        <div className={styles["order__faq"]}>
          <div className={styles["order__faq-title"]}>Частые вопросы</div>
          <div className={styles["order__faq-list"]}>
            <div className={styles["order__faq-list-item"]}>
              Как расчитывается цена?
            </div>
            <div className={styles["order__faq-list-item"]}>
              Как долго готовится комплект пригласительных?
            </div>
            <div className={styles["order__faq-list-item"]}>
              Какие способы оплаты?
            </div>
            <div className={styles["order__faq-list-item"]}>
              Как доставляются комплекты пригласительных?
            </div>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}

export default Order;
