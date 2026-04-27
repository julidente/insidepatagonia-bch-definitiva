// src/patterns/builder/activity.builder.ts
/* import { CreateActivityDTO } from "../../dtos/activity.dto";
import { z } from "zod";
import { createActivitySchema } from "../../schemas/activity.schema";

export class ActivityBuilder {
  private data: Partial<CreateActivityDTO> = {};

  // --- Métodos setters encadenables ---
  setName(name: string) {
    this.data.name = name;
    return this;
  }

  setDescription(description: string) {
    this.data.description = description;
    return this;
  }

  setPrice(price: number) {
    this.data.price = price;
    return this;
  }

  setDiscount(discount: number) {
    this.data.discount = discount;
    return this;
  }

  setLocation(location: string) {
    this.data.location = location;
    return this;
  }

  setCityId(city_id: number) {
    this.data.city_id = city_id;
    return this;
  }


  // --- Validación opcional con Zod ---
  validate() {
    const result = createActivitySchema.safeParse(this.data);
    if (!result.success) {
      const errors = result.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
      throw new Error(`Error de validación en ActivityBuilder → ${errors}`);
    }
    return result.data;
  }

  // --- Construir sin validar ---
  buildPartial(): Partial<CreateActivityDTO> {
    return { ...this.data };
  }

  // --- Construir validando (opcionalmente) ---
  build(validate = true): CreateActivityDTO {
    if (validate) {
      return this.validate();
    }
    return this.data as CreateActivityDTO;
  }
} */

// src/patterns/builder/activity.builder.ts
import { CreateActivityDTO } from '../../dtos/activity.dto';

export class ActivityBuilder {
  private data: Partial<CreateActivityDTO> = {};

  setName(name: string) {
    this.data.name = name;
    return this;
  }

  setDescription(description: string) {
    this.data.description = description;
    return this;
  }

  setPrice(price: number) {
    this.data.price = price;
    return this;
  }

  setLocation(location: string) {
    this.data.location = location;
    return this;
  }

  /**
   * Devuelve el objeto listo para crear una Activity completa.
   * No valida (ya lo hace el middleware).
   */
  build(): CreateActivityDTO {
    return this.data as CreateActivityDTO;
  }
}
