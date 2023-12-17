import SubmitCode from "./SubmitCode";
import "../../index.css";

export default {
    title: "SubmitCode",
    component: SubmitCode,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export const Default = {
    args: {
        loading: false,
        setLoading: () => {},
    },
};

export const Clicked = {
    args: {
        ...Default.args,
        loading: true,
    },
};
