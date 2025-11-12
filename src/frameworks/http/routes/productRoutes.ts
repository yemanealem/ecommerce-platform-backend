import { Router, Request, Response } from "express";
import { requireAuth, requireRole } from "../middlewares/AuthMiddleware";
import { UserRole } from "../../../entities/enum/UserRole";
import { ProductRepositoryImpl } from "../../repositories/ProductRepositoryImpl";
import { CreateProductUseCase, CreateProductInput } from "../../../usecases/product/CreateProductUseCase";
import { GetProductUseCase } from "../../../usecases/product/GetProductUseCase";
import { UpdateProductUseCase } from "../../../usecases/product/UpdateProductUseCase";
import { DeleteProductUseCase } from "../../../usecases/product/DeleteProductUseCase";
import { ResponseFormatter } from "../../../utils/BasicResponseFormatter";
import { formatPaginatedResponse } from "../../../utils/PaginatedResponseFormatter";

const router = Router();
const productRepo = new ProductRepositoryImpl();

router.post(
  "/",
  requireAuth(),
  requireRole([UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      if (!user) return res.status(401).json(ResponseFormatter.error("Unauthorized"));

      const input: CreateProductInput = {
        ...req.body,
        userId: user.userId, 
      };

      const useCase = new CreateProductUseCase(productRepo);
      const product = await useCase.execute(input);

      res.status(201).json(ResponseFormatter.success("Product created successfully", product));
    } catch (err: any) {
      console.log("error",err)
      res.status(400).json(ResponseFormatter.error(err.message));
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    const useCase = new GetProductUseCase(productRepo);
    const { products, total } = await useCase.execute({ page, limit, search });

    res.json(formatPaginatedResponse(products, total, page, limit, "Products retrieved successfully"));
  } catch (err: any) {
    res.status(400).json(ResponseFormatter.error(err.message));
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const useCase = new GetProductUseCase(productRepo);
    const product = await useCase.getById(req.params.id);

    if (!product) return res.status(404).json(ResponseFormatter.error("Product not found"));

    res.json(ResponseFormatter.success("Product retrieved successfully", product));
  } catch (err: any) {
    res.status(400).json(ResponseFormatter.error(err.message));
  }
});

router.put("/:id", requireAuth(), requireRole([UserRole.ADMIN]), async (req: Request, res: Response) => {
  try {
    const useCase = new UpdateProductUseCase(productRepo);
    const product = await useCase.execute(req.params.id, req.body);

    if (!product) return res.status(404).json(ResponseFormatter.error("Product not found"));

    res.json(ResponseFormatter.success("Product updated successfully", product));
  } catch (err: any) {
    res.status(400).json(ResponseFormatter.error(err.message));
  }
});

router.delete("/:id", requireAuth(), requireRole([UserRole.ADMIN]), async (req: Request, res: Response) => {
  try {
    const useCase = new DeleteProductUseCase(productRepo);
    await useCase.execute(req.params.id);

    res.json(ResponseFormatter.success("Product deleted successfully", null));
  } catch (err: any) {
    res.status(404).json(ResponseFormatter.error(err.message));
  }
});

export default router;
