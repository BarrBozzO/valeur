import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import cx from "classnames";

import Video from "components/Video";
import Button from "components/Button";
import SEO from "components/Seo";
import Layout from "components/Layout";
import { useWindowSize } from "../hooks";

import ChevronIcon from "assets/icons/chevron.svg";
import vFile from "assets/videos/test.mp4";

import styles from "./Home.module.scss";

const reviews = [
  {
    author: "Ольга",
    link: "",
    text:
      "Виджеты Elfsight - просто супер! Четкая структура, понятное описание, легкие настройки. Мне нравятся все их продукты и качество работы поддержки",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-22.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "olga",
    social: "instagram",
  },
  {
    author: "Александр",
    link: "",
    text:
      "У Elfsight отличные виджеты и действительно оперативная и дружелюбная поддержка. Компетентно и надежно, я рекомендую Elfsight",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-8.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "alexandr",
    social: "instagram",
  },
  {
    author: "Евгения",
    link: "",
    text:
      "Классный плагин для отзывов на сайт с интуитивным интерфейсом. Очень легко добавить индивидуальные настройки и интеграция прошла мгновенно. Служба поддержки помогла во всех вопросах",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-24.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "evgeniy",
    social: "instagram",
  },
  {
    author: "Сергей",
    link: "",
    text:
      "У меня возникла проблема с их Instagram виджетом, но мне мгновенно помогли ее решить. Теперь хочу попробовать и другие виджеты этой команды",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-21.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "sergey",
    social: "instagram",
  },
  {
    author: "Анна",
    link: "",
    text:
      "Прекрасные виджеты за приемлемую цену. Просто использовать, можно настроить под свои потребности, а служба поддержки вежливая и всегда поможет. У меня только положительные впечатления!",
    image:
      "https://casper.imgix.net/home/social/instagram/ig-avatar-20.jpg?auto=compress%2Cformat&q=65&w=50",
    nickname: "anna",
    social: "instagram",
  },
];

const IndexPage = ({ location, mount }) => {
  const wSize = useWindowSize();
  const cardsCount = wSize.width > 1024 ? 3 : 1;
  const tabletWidth = wSize.width <= 768;
  const desktopWidth = wSize.width <= 1024;

  const [activeItemIndex, setActiveItemIndex] = useState(!desktopWidth ? 1 : 0);

  const handleSlideBtnClick = index => {
    return () => setActiveItemIndex(index);
  };

  return (
    <Layout mount={mount} location={location}>
      <SEO title="Главная" />
      <div className={styles["home"]}>
        <div className={styles["home__start"]}>
          <Video className={styles["home__background-video"]} source={vFile} />
          <h1>Valeur</h1>
          <div>
            <p>
              There’s a voice that keeps on calling me. Down the road, that’s
              where I’ll always be. Every stop I make, I make a new friend.
              Can’t stay for long, just turn around and I’m gone again. Maybe
              tomorrow, I’ll want to settle down, Until tomorrow, I’ll just keep
              moving on.
            </p>
            <p>
              Knight Rider, a shadowy flight into the dangerous world of a man
              who does not exist. Michael Knight, a young loner on a crusade to
              champion the cause of the innocent, the helpless in a world of
              criminals who operate above the law.
            </p>
            <p>
              This is my boss, Jonathan Hart, a self-made millionaire, he’s
              quite a guy. This is Mrs H., she’s gorgeous, she’s one lady who
              knows how to take care of herself. By the way, my name is Max. I
              take care of both of them, which ain’t easy, ’cause when they met
              it was MURDER!
            </p>
            <Button label="Заказать" />
          </div>
        </div>
        <div className={styles["home__about"]}>
          <h2>О проекте</h2>
        </div>
        <div className={styles["home__reviews"]}>
          <h2>Что говорят наши клиенты</h2>
          <div className={styles["reviews"]}>
            <ItemsCarousel
              activePosition="center"
              infiniteLoop={false}
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={cardsCount}
              gutter={desktopWidth ? 16 : 32}
              leftChevron={
                !desktopWidth ? (
                  <button className={styles["reviews__button"]}>
                    <ChevronIcon />
                  </button>
                ) : null
              }
              rightChevron={
                !desktopWidth ? (
                  <button
                    className={cx(
                      styles["reviews__button"],
                      styles["reviews__button--right"]
                    )}
                  >
                    <ChevronIcon />
                  </button>
                ) : null
              }
              outsideChevron={!desktopWidth}
              chevronWidth={!desktopWidth ? 60 : 0}
              disableSwipe={false}
              showSlither={desktopWidth}
              firstAndLastGutter={desktopWidth}
            >
              {reviews.map(r => (
                <div className={styles["reviews__card-wrapper"]}>
                  <blockquote
                    key={r.author}
                    className={styles["reviews__card"]}
                  >
                    <cite className={styles["reviews__card-author"]}>
                      <img
                        className={styles["reviews__card-avatar"]}
                        src={r.image}
                      />
                      <a href={r.link} className={styles["reviews__card-link"]}>
                        <span className={styles["reviews__card-name"]}>
                          {r.author}
                        </span>
                        <span className={styles["reviews__card-nickname"]}>
                          @{r.nickname}
                        </span>
                      </a>
                    </cite>
                    <p className={styles["reviews__card-text"]}>{r.text}</p>
                  </blockquote>
                </div>
              ))}
            </ItemsCarousel>
            <div className={styles["reviews__pagination"]}>
              {reviews.map((r, index) => {
                const prev = activeItemIndex - 1;
                const next = activeItemIndex + 1;
                const isStart = index === 0;
                const isFinish = index === reviews.length - 1;

                if (!desktopWidth && (isStart || isFinish)) {
                  return null;
                }

                return (
                  <button
                    key={index}
                    className={cx(styles["reviews__to-slide"], {
                      [styles["reviews__to-slide--active"]]:
                        index === activeItemIndex,
                      [styles["reviews__to-slide--adjacent"]]:
                        index === next || index === prev,
                    })}
                    onClick={handleSlideBtnClick(index)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles["home__order"]}>
          <h2>Готовы сделать заказ?</h2>
          <div className={styles["home__order-description"]}>
            Let's chat about your next project.
            <br />
            You'll get affordable web design & SEO without monthly cost. No
            hidden fees.
            <br />
            Simple and Independent - web design for your business or project.
          </div>
          <Button className={styles["home__order-button"]} label="Заказать" />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
