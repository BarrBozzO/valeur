import React from "react";
import Collapsible from "react-collapsible";
import Portal from "components/Portal";
import cx from "classnames";
import Collaboration from "assets/order/collaboration.svg";
import MailIcon from "assets/icons/mail.svg";
import InstagramIcon from "assets/icons/instagram.svg";
import WhatsAppIcon from "assets/icons/whatsapp.svg";

import styles from "./Order.module.scss";

const QUESTIONS = [
  {
    question: "Сколько стоит комплект?",
    answer: (
      <div>
        Стоимость комплекта начинается от 200р, в него входит:
        <ul>
          <li>Конверт ручной работы</li>
          <li>Персонализация</li>
          <li>Карточка пригласительного</li>
          <li>Остальные комплектующие рассчитываются индивидуально</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Какая стоимость разработки индивидуального дизайна?",
    answer: (
      <div>
        <p>
          Стоимость разработки индивидуального дизайна пригласительного
          составляет 1500р.
        </p>
        В стоимость входит:
        <ul>
          <li>полный цикл проработки индивидуального дизайна</li>
          <li>согласование с вами макета</li>
          <li>персонализация пригласительных</li>
          <li>учет всех ваших комментариев</li>
          <li>полноценная реалистичная визуализация ваших комплектов</li>
          <li>внесение изменений по желанию</li>
          <li>связь 24/7</li>
        </ul>
        <p>
          Стоимость разработки дизайна карточки дресс - кода, меню и других
          комплектующих – от 500р.
        </p>
      </div>
    ),
  },
  {
    question: "Какие сроки изготовления пригласительных?",
    answer: (
      <div>
        <p>Сроки зависят от количества комплектов. В среднем 14 дней.</p>
      </div>
    ),
  },
  {
    question: "Каковы сроки и цены доставки по России?",
    answer: (
      <div>
        <p>
          Сроки доставки от 2-х до 10 дней. Отправляем транспортной компанией
          СДЕК или Почтой России. Стоимость рассчитывается индивидуально, в
          зависимости от города.
        </p>
      </div>
    ),
  },
];

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
        <div className={styles["order__title"]}>
          Давайте воплотим ваш проект в жизнь
        </div>
        <div className={styles["order__main"]}>
          <div>
            <p>Мы рады, что вы заинтерисовались именно нами.</p>
            <p>Давайте обсудим ваши идеи:</p>
            <div>
              <a
                className={styles["order__instagram"]}
                href="https://www.instagram.com/v_aleur/"
                target="_blank"
              >
                <InstagramIcon />@ v_aleur
              </a>
              <a
                className={styles["order__whatsapp"]}
                href="https://wa.me/79053357749"
                target="_blank"
              >
                <WhatsAppIcon />
                +7 (905) 335-77-49
              </a>
              <a
                className={styles["order__email"]}
                href="mailto:v_aleur@mail.ru"
              >
                <MailIcon />
                v_aleur@mail.ru
              </a>
            </div>
          </div>
          <div className={styles["order__illustration"]}>
            <Collaboration />
          </div>
        </div>
        <div className={styles["order__faq"]}>
          <div className={styles["order__faq-title"]}>Частые вопросы</div>
          <div className={styles["order__faq-list"]}>
            {QUESTIONS.map(({ question, answer }) => {
              return (
                <Collapsible
                  className={styles["order__faq-list-item"]}
                  openedClassName={styles["order__faq-list-item"]}
                  trigger={question}
                  triggerClassName={styles["order__faq-list-item-header"]}
                  triggerOpenedClassName={cx(
                    styles["order__faq-list-item-header"],
                    styles["order__faq-list-item-header--opened"]
                  )}
                  triggerTagName={"div"}
                  transitionTime={250}
                >
                  <div className={styles["order__faq-list-item-content"]}>
                    {answer}
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}

export default Order;
