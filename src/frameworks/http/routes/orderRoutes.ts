import { Router, Request, Response } from "express";
import { requireAuth, requireRole } from "../middlewares/AuthMiddleware";
import { UserRole } from "../../../entities/enum/UserRole";
import { PlaceOrderUseCase, PlaceOrderInput } from "../../../usecases/order/PlaceOrderUseCase";
import { OrderRepositoryImpl } from "../../repositories/OrderRepositoryImpl";
import { ProductRepositoryImpl } from "../../repositories/ProductRepositoryImpl";
import { ResponseFormatter } from "../../../utils/BasicResponseFormatter";

const router = Router();
const orderRepo = new OrderRepositoryImpl();
const productRepo = new ProductRepositoryImpl();

router.post("/", requireAuth(), requireRole([UserRole.USER]), async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json(ResponseFormatter.error("Unauthorized"));

    const input: PlaceOrderInput = {
      userId: user.userId,
      products: req.body,
      description: req.body.description || "",
    };

    const useCase = new PlaceOrderUseCase(orderRepo, productRepo);
    const order = await useCase.execute(input);

    res.status(201).json(ResponseFormatter.success("Order placed successfully", order));
  } catch (err: any) {
    res.status(400).json(ResponseFormatter.error(err.message));
  }
});


router.get(
  "/",
  requireAuth(),
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      if (!user) return res.status(401).json(ResponseFormatter.error("Unauthorized"));

      const orders = await orderRepo.findByUserId(user.userId);

      const summary = orders.map(order => ({
        id: (order as any).id || (order as any)._id,
        status: order.status,
        totalPrice: order.totalPrice,
        products:order.products,
        createdAt: (order as any).createdAt,
      }));

      res.status(200).json(ResponseFormatter.success("Orders retrieved successfully", summary));
    } catch (err: any) {
      console.error("Error retrieving orders:", err);
      res.status(500).json(ResponseFormatter.error("Internal server error"));
    }
  }
);



export default router;
