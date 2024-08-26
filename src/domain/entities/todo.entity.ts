/* dentro de entities van a ser nuestros objetos que son lo más atómico de la aplicación y no debería tener ninguna ingerencia del mundo exterior (las carpetas exteriores), es decir, todo lo que hagamos en domain no debería de tener nada del código externo como por ejemplo, importaciones de librerías sino solo debería de ser el código y lenguaje de programación que estamos utilizando, en este caso express o si usamos python entonces solo python, eso sería lo recomendado */

/* lo que esté en entities, y a diferencia de lo que tenemos en la base de datos, este entity no está relacionado a la base de datos, se asemeja mucho a lo que se grabará sin embargo, esto es lo que se usará en la aplicación y luego lo que se tendrá en la base de datos es indiferente porque la base de datos puede cambiar pero yo no quiero que mi aplicación se vea afectada y por otro lado si la entidad cambia por alguna razón no debería verse afectada la base de datos tampoco */

export class TodoEntity {
  constructor(
    /* no se coloca como readonly a las propiedades porque bueno, se podrían modificar. Aquí es muy similar a lo que se tiene en la base de datos pero NO es lo mismo */
    public id: number,
    public text: string,
    public createdAt?: Date | null // puede ser undefined por el ?, o de tipo Date o de tipo null
  ) {}

  get isCreated() {
    return !!this.createdAt; // se coloca la doble negación para que si se tiene un valor entonces nos de valor -> false -> true y esto quiere decir que al final queremos conocer si se tiene un valor (será true) o si no tiene (será false)
  }
}
