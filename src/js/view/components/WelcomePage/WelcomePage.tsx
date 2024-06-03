import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GliderMethods } from "react-glider/dist/types";
import Glider from "react-glider";
import { ActionPanel, TextBodyLarge, TitleH1 } from "../../elements";
import { PageWrapper } from "..";
import { homePageUrl } from "../../../../router/constants";
import "glider-js/glider.min.css";
import { STEPS } from "./constants";

export const WelcomePage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getStepPath = (key: string) => `pages.welcome.steps.${key}`;

  const goToHomePage = () => navigate(homePageUrl());

  const gliderRef = useRef<GliderMethods>(null);

  const primaryButtonTitle = () => {
    const path = "pages.welcome.buttons";

    if (activeIndex === 0) {
      return t(`${path}.first_primary`);
    }

    if (activeIndex === STEPS.length - 1) {
      return t(`${path}.last_primary`);
    }

    return t(`${path}.primary`);
  };

  const pageMainContent = (
    <div className="flex flex-col h-full overflow-hidden">
      <Glider
        ref={gliderRef}
        draggable
        slidesToShow={1}
        slidesToScroll={1}
        onSlideVisible={({ detail }: { detail: { slide: number } }) =>
          setActiveIndex(detail.slide)
        }
        scrollLock
      >
        {STEPS.map(({ key, image }) => (
          <div key={key} className="flex flex-col items-center">
            <img
              src={image}
              srcSet={`${image} 1x, ${image} 2x`}
              alt={t(`${key} image`)}
              className="h-[228px] w-auto"
            />
            <div className="flex flex-col gap-y-6 text-center">
              <TitleH1>{t(`${getStepPath(key)}.title`)}</TitleH1>
              <TextBodyLarge className="text-dark-3">
                {t(`${getStepPath(key)}.description`)}
              </TextBodyLarge>
            </div>
          </div>
        ))}
      </Glider>
      <ul className="flex gap-x-1">
        {STEPS.map(({ key }) => (
          <li
            key={key}
            className="w-1 h-1 bg-dark-2 rounded-full cursor-pointer"
          />
        ))}
      </ul>
    </div>
  );

  const pageFooter = (
    <ActionPanel
      primaryButtonText={primaryButtonTitle()}
      primaryButtonType="submit"
      secondaryButtonText={t("pages.welcome.buttons.secondary")}
      onPrimaryButtonClick={() => {
        if (activeIndex <= STEPS.length) {
          gliderRef.current?.scrollItem(activeIndex + 1);
        } else {
          goToHomePage();
        }
      }}
      onSecondaryButtonClick={goToHomePage}
    />
  );

  return <PageWrapper pageContent={pageMainContent} pageFooter={pageFooter} />;
};
