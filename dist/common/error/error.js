class AppErrors {
    constructor() { }
    throwEmailTaken() {
        throw new Error("EMAIL IS INVALID");
    }
    throwBadCredentials() {
        throw new Error("EMAIL OR PASSWORD IS INVALID ! ");
    }
    throwEmailMissing() {
        throw new Error("EMAIL NOT FOUND ! ");
    }
    throwBadOtp() {
        throw new Error("INVALID OTP !");
    }
    throwUserMissing() {
        throw new Error("USER NOT FOUND !");
    }
    throwDuplicateTitle() {
        throw new Error("TITLE OF POST DUPLICATED ! ");
    }
    throwPostMissing() {
        throw new Error("POST NOT FOUND !");
    }
}
export default new AppErrors();
