import { Router } from "express";
import { authRequired } from "../middleware/authRequired";
import { getMyAddress, upsertMyAddress } from "../controllers/userController";

const router = Router();

router.get("/me/address", authRequired, getMyAddress);
router.post("/me/address", authRequired, upsertMyAddress);

export default router;
