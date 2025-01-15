import jwt from 'jsonwebtoken'

// user authentication middleware
const userAuth= async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECERT)

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
        } else {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default userAuth