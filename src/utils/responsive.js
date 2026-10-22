import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const rh = (val) => {
    return responsiveHeight(val);
};

const rw = (val) => {
    return responsiveWidth(val);
};

const rf = (val) => {
    return responsiveFontSize(val);
};

export { rh, rw, rf };