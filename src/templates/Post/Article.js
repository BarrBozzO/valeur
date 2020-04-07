import React from "react";
import { getRichText } from "utils";
import cx from "classnames";
import get from "lodash/get";
import {
  nodeTypes as NODE_TYPES,
  markTypes as MARK_TYPES,
} from "../../constants/richTextMap";

import styles from "./Post.module.scss";

function Article({ data, className, assets }) {
  if (!data) return null;

  const textData = getRichText(data);
  console.log(textData);

  const renderByType = value => {
    const type = value.nodeType;

    switch (NODE_TYPES[type]) {
      case "paragraph":
        return renderParagraph(value);
      case "hr":
        return <hr className={styles["article__hr"]} />;
      case "unorderedList":
        return renderList(value);
      case "blockquote":
        return renderBlockQuote(value);
      case "hyperlink":
        return renderLink(value);
      case "text":
        return renderText(value);
      case "heading1":
      case "heading2":
      case "heading3":
      case "heading4":
      case "heading5":
      case "heading6":
        return renderHeading(value);
      case "assetBlock":
        return renderAsset(value);
      default:
        return null;
    }
  };

  const renderText = t => {
    const marks = (t.marks || []).reduce((marksMap, { type }) => {
      marksMap[MARK_TYPES[type]] = true;
      return marksMap;
    }, {});

    const cn = cx(styles["article__paragraph-item"], {
      [styles["article__paragraph-item--bold"]]: Boolean(marks["bold"]),
      [styles["article__paragraph-item--underline"]]: Boolean(
        marks["underline"]
      ),
      [styles["article__paragraph-item--italic"]]: Boolean(marks["italic"]),
      [styles["article__paragraph-item--code"]]: Boolean(marks["code"]),
    });

    return <span className={cn}>{t.value}</span>;
  };

  const renderAsset = a => {
    const id = get(a, "data.target.sys.contentful_id");

    if (id) {
      return <img src={get(assets, `${id}.url`)} />;
    }

    return null;
  };

  const renderHeading = h => {
    const content = h.content || [];

    return (
      <div className={styles[`article__${NODE_TYPES[h.nodeType]}`]}>
        {content.map(item => renderByType(item))}
      </div>
    );
  };

  const renderList = l => {
    const content = l.content || [];

    if (content.length) {
      return (
        <ul className={styles["article__unordered-list"]}>
          {content.map(listItem => {
            const content = listItem.content || [];

            return content.map((item, index) => (
              <li
                key={index}
                className={styles["article__unordered-list-item"]}
              >
                {renderByType(item)}
              </li>
            ));
          })}
        </ul>
      );
    }
  };

  const renderBlockQuote = q => {
    const content = q.content || [];

    return <blockquote>{content.map(item => renderByType(item))}</blockquote>;
  };

  const renderLink = l => {
    const content = l.content || [];
    const uri = (l.data && l.data.uri) || "";
    console.log(l);
    return (
      <a target="_blank" href={uri}>
        {content.map(item => renderByType(item))}
      </a>
    );
  };

  const renderParagraph = p => {
    const content = p.content || [];

    if (content.length) {
      return (
        <p className={styles["article__paragraph"]}>
          {content.map(item => renderByType(item))}
        </p>
      );
    }

    return null;
  };

  return (
    <div className={className}>{textData.map(td => renderByType(td))}</div>
  );
}

export default Article;
