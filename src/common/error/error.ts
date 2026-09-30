class AppErrors {
    constructor() {}

    throwEmailTaken():never{
        throw new Error("EMAIL IS INVALID")
    }

    throwBadCredentials():never{
        throw new Error("EMAIL OR PASSWORD IS INVALID ! ")
    }

    throwEmailMissing():never{
         throw new Error("EMAIL NOT FOUND ! ")
    }

    throwBadOtp():never{
       throw new Error("INVALID OTP !")
    }

    throwUserMissing():never{
       throw new Error("USER NOT FOUND !")
    }

    throwDuplicateTitle():never{
        throw new Error("TITLE OF POST DUPLICATED ! ")
    }

    throwPostMissing():never{
        throw new Error("POST NOT FOUND !")
    }

}
export default new AppErrors()
