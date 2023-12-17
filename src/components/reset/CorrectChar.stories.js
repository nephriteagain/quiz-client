import { CorrrectChar } from "./NewPasswordChecker";
import "../../index.css";

export default {
    title: "CorrectChar",
    component: CorrrectChar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export const GoodChars = {
    args: {
        charBool: true,
    },
};

export const BadChars = {
    args: {
        charBool: false,
    },
};
