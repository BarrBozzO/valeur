import React from "react";
import Link from "components/Link";
import InstagramIcon from "assets/icons/instagram.svg";
import WhatsAppIcon from "assets/icons/whatsapp.svg";
import Logo from "assets/logo/valeur.svg";

import styles from "./Layout.module.scss";

function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__content"]}>
        <div className={styles["footer__mission"]}>
          <Logo className={styles["footer__logo"]} />
          {`Наша студия со всей ответственностью подходит к вашему мероприятию.
          Мы понимаем, насколько для Вас это важно и учтем все Ваши пожелания и комментарии.

          У нас Вы можете приобрести только качественную свадебную полиграфию из лучших  материалов.`}
        </div>
        <div className={styles["footer__pages"]}>
          <div className={styles["footer__pages-title"]}>Карта</div>
          <div className={styles["footer__pages-list"]}>
            <Link to="/">Главная</Link>
            <Link to="/posts">Блог</Link>
            <Link to="/portfolio/online-invitations">
              Электронные пригласительные
            </Link>
            <Link to="/portfolio/invitation-kits">
              Комплекты пригласительных
            </Link>
          </div>
        </div>
        <div className={styles["footer__contacts"]}>
          <div className={styles["footer__contacts-title"]}>Контакты</div>
          <div className={styles["footer__contacts-list"]}>
            <div className={styles["footer__contacts-email"]}>
              mail.me@valeur.com
            </div>
            <div className={styles["footer__contacts-socials"]}>
              <a href="https://www.instagram.com/v_aleur/" target="_blank">
                <InstagramIcon
                  className={styles["footer__contacts-social-icon"]}
                />
              </a>
              <a href="https://wa.me/79053357749" target="_blank">
                <WhatsAppIcon
                  className={styles["footer__contacts-social-icon"]}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={styles["footer__copyright"]}>
          Copyright © {new Date().getFullYear()} Valeur
        </div>
        <div className={styles["footer__developed"]}>
          Developed by{" "}
          <a href="https://github.com/BarrBozzO/velour" target="_blank">
            BarrBozzO
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
