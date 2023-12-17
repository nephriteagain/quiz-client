import { CorrectLength } from "./NewPasswordChecker";
import "../../index.css";

export default {
    title: "CorrectLength",
    component: CorrectLength,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export const GoodLength = {
    args: {
        lengthBool: true,
    },
};

export const ShortLength = {
    args: {
        lengthBool: false,
    },
};
