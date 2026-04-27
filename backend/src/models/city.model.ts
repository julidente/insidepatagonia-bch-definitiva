//Modelo (model en tu carpeta models/) → Define interfaces o tipos TypeScript que representen esos datos en tu código,
// y a veces funciones helper para manipularlos.

// src/models/city.model.ts

// interface implementa la clase
export interface ICity {
  city_id: number;
  name: string;
  province_id: number;
}

// como interface o como type?

// types para los dto's para transferencia de datos
// export type City ={
//   city_id: number;
//   name: string;
//   province_id: number;
// }
