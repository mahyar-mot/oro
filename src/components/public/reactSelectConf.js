import React from "react";


export const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


export const userOptions = [
    { label: `علی حمیدی ${<img src={require("../../assets/icons/arrow2.svg")} alt="alt" />}`, value: 'Chocolate' },
    { label: `علی حمیدی `, value: 'Chocolate2' },
    { label: `علی حمیدی `, value: 'Chocolate3' },
]


export const colourStyles = {
    control: styles => ({ ...styles, minHeight: "100px", padding: 0 , alignItems: "start",}),
    option: (provided, state) => ({
        ...provided,
        display: "none"
    }),
    multiValue: (base, state) => ({
        ...base,
        background: "#4ADEDE",
        border: "1px solid white",
        borderRadius: "50px",
        padding: "5px 8px",
        color: "white",
    }),
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: "#4ADEDE",
        backgroundColor: "white",
        borderRadius: "50%",
        cursor: "pointer",
        ':hover': {
          color: 'red',
        },
    }),
    clearIndicator: styles => ({...styles, display: "none"}),
    dropdownIndicator: styles => ({...styles, display: "none"}),
};

export const userSelectStyles = {
    ...colourStyles,
    option: (provided, state) => ({
        ...provided,
    }),
    clearIndicator: styles => ({...styles}),
    dropdownIndicator: styles => ({...styles}),
    multiValue: (base, state) => ({
        ...base,
        background: "white",
        border: "1px solid #3B5286",
        borderRadius: "50px",
        padding: "5px 8px",
        color: "white",
    }),
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: "#3B5286",
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: "white",
        backgroundColor: "#3B5286",
        borderRadius: "50%",
        cursor: "pointer",
        ':hover': {
          color: 'red',
        },
    }),
};


export const taggerSelectStyles = {
    ...colourStyles,
    control: styles => ({ ...styles, padding: 0 , alignItems: "start",}),
    multiValue: (base, state) => ({
        ...base,
        background: "#4ADEDE",
        border: "1px solid white",
        borderRadius: "50px",
        color: "black",
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: "white",
        cursor: "pointer",
        ':hover': {
          color: 'red',
        },
    }),
    option: (provided, state) => ({
        ...provided,
    }),
    clearIndicator: styles => ({...styles}),
};

export const mentionerSelectStyles = {
    ...taggerSelectStyles,
    multiValue: (base, state) => ({
        ...base,
        background: "#1AA7EC",
        border: "1px solid white",
        borderRadius: "50px",
        color: "black",
    }),
};

export const filterSubjectsSelectStyles = {
    control: styles => ({ ...styles, padding: 0 , alignItems: "start", borderRadius: "28px"}),
    option: (provided, state) => ({
        ...provided,
    }),
    clearIndicator: styles => ({...styles, display: "none"}),
}
