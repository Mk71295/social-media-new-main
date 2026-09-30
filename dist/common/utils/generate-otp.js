export const makeOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
