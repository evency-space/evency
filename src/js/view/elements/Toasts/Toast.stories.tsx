import React from "react";
import { ComponentStory } from "@storybook/react";
import { Toast } from "./Toast";

export default {
  title: "elements/toast",
  component: Toast,
};

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Success = Template.bind({});
Success.args = {
  text: "Вещи успешно добавлены в мероприятие!",
};
