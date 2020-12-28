import React from "react";

import SEO from "components/Seo";
import Layout from "components/Layout";
import Button from "components/Button";

import styles from "./Contacts.module.scss";

const ContactsPage = ({ mount, location }) => (
  <Layout mount={mount} location={location}>
    <SEO title="Контакты" />
    <div className={styles["contacts"]}>
      <h1 className={styles["contacts__header"]}>Контакты</h1>
      <div className={styles["contacts__list"]}>
        <div className={styles["contacts__list-item"]}>
          <div className={styles["contacts__list-item-title"]}>E-mail</div>
          <div className={styles["contacts__list-item-value"]}>
            <a href="mailto:v_aleur@mail.ru">v_aleur@mail.ru</a>
          </div>
        </div>
        <div className={styles["contacts__list-item"]}>
          <div className={styles["contacts__list-item-title"]}>WhatsApp</div>
          <div className={styles["contacts__list-item-value"]}>
            <a href="https://wa.me/79053357749">+7 (905) 335-77-49</a>
          </div>
        </div>
        <div className={styles["contacts__list-item"]}>
          <div className={styles["contacts__list-item-title"]}>Instagram</div>
          <div className={styles["contacts__list-item-value"]}>
            <a href="https://instagram.com/v_aleur?igshid=nf4dhcws7f5m">
              @v_aleur
            </a>
          </div>
        </div>
      </div>
      <div className={styles["contacts__form"]}>
        <div className={styles["contacts__form-title"]}>
          Оставьте контакты и мы с вами свяжемся
        </div>
        <form
          name="contact"
          method="post"
          action="/contacts/success"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          // data-netlify-recaptcha="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input
            type="hidden"
            name="subject"
            value="Valeur - заявка от клиента"
          />
          <input type="hidden" name="bot-field" />
          <div className={styles["contacts__form-row"]}>
            <div className={styles["contacts__form-row-cell"]}>
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete={"off"}
                required
              />
            </div>
            <div className={styles["contacts__form-row-cell"]}>
              <label htmlFor="email">Электронная почта</label>
              <input id="email" type="email" name="email" />
            </div>
            <div className={styles["contacts__form-row-cell"]}>
              <label htmlFor="phone">Номер телефона</label>
              <input id="phone" type="tel" name="phone" />
            </div>
          </div>
          <div className={styles["contacts__form-row"]}>
            <div className={styles["contacts__form-row-cell"]}>
              <label htmlFor="message">Сообщение</label>
              <textarea
                rows="4"
                id="message"
                name="message"
                autoComplete={"off"}
              />
            </div>
          </div>
          {/* <div data-netlify-recaptcha="true"></div> */}
          <div className={styles["contacts__form-row"]}>
            <Button secondary type="submit">
              Отправить
            </Button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
);

export default ContactsPage;
