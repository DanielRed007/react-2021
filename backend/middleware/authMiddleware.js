import jwt, { decode } from "jsonwebtoken";

const protect = async(req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({Error: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({Error: "Unauthorized, Invalid Token"});
    }
};

export { protect };