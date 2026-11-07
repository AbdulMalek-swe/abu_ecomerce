import { Product, Order, BackendOrderStatus } from "@/types";
import { MOCK_PRODUCTS } from "@/data/products";
import { MOCK_ORDERS } from "@/data/orders";
import { mapBackendErrorToBn } from "@/lib/api/errorMapper";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    localizedMessage: string; // Bangla mapped explanation
  };
}

export interface ProductFilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  search?: string;
  sortBy?: "featured" | "newest" | "priceLowToHigh" | "priceHighToLow" | "rating";
}

/**
 * Products Service Layer
 * Reads raw backend response and guarantees product name, description, brand,
 * and specs remain 100% intact as received from the API.
 */
export const productService = {
  /**
   * Fetches all products with optional filters
   */
  async getProducts(params?: ProductFilterParams): Promise<ApiResponse<Product[]>> {
    try {
      let filtered = [...MOCK_PRODUCTS];

      if (params?.search) {
        const query = params.search.trim().toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query)
        );
      }

      if (params?.category && params.category !== "all") {
        filtered = filtered.filter((p) => p.category === params.category);
      }

      if (params?.brand && params.brand !== "all") {
        filtered = filtered.filter((p) => p.brand === params.brand);
      }

      if (params?.maxPrice) {
        filtered = filtered.filter((p) => p.price <= params.maxPrice!);
      }

      if (params?.inStockOnly) {
        filtered = filtered.filter((p) => p.inStock);
      }

      if (params?.sortBy === "priceLowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (params?.sortBy === "priceHighToLow") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (params?.sortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (params?.sortBy === "newest") {
        filtered.sort((a, b) => b.id.localeCompare(a.id));
      }

      return {
        success: true,
        data: filtered,
      };
    } catch {
      return {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Failed to fetch products",
          localizedMessage: mapBackendErrorToBn("SERVER_ERROR"),
        },
      };
    }
  },

  /**
   * Fetches a single product by ID
   */
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      return {
        success: false,
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Product not found",
          localizedMessage: mapBackendErrorToBn("PRODUCT_NOT_FOUND"),
        },
      };
    }
    return {
      success: true,
      data: product,
    };
  },
};

/**
 * Orders Service Layer
 * Preserves raw backend status values ("pending" | "confirmed" | etc.)
 * Preserves raw order IDs ("ORD-...") and phone numbers.
 */
export const orderService = {
  /**
   * Looks up an order for tracking
   */
  async trackOrder(orderId: string, phone: string): Promise<ApiResponse<Order>> {
    const cleanId = orderId.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    const found = MOCK_ORDERS.find((o) => {
      const idMatch = o.orderId.toLowerCase() === cleanId;
      const orderPhoneClean = o.customer.phone.replace(/\D/g, "");
      const phoneMatch = orderPhoneClean.endsWith(cleanPhone) || cleanPhone.endsWith(orderPhoneClean);
      return idMatch && phoneMatch;
    });

    if (!found) {
      return {
        success: false,
        error: {
          code: "ORDER_NOT_FOUND",
          message: "Order not found with provided ID and phone",
          localizedMessage: mapBackendErrorToBn("ORDER_NOT_FOUND"),
        },
      };
    }

    return {
      success: true,
      data: found,
    };
  },
};

