/* dentro de entities van a ser nuestros objetos que son lo más atómico de la aplicación y no debería tener ninguna ingerencia del mundo exterior (las carpetas exteriores), es decir, todo lo que hagamos en domain no debería de tener nada del código externo como por ejemplo, importaciones de librerías sino solo debería de ser el código y lenguaje de programación que estamos utilizando, en este caso express o si usamos python entonces solo python, eso sería lo recomendado */

/* lo que esté en entities, y a diferencia de lo que tenemos en la base de datos, este entity no está relacionado a la base de datos, se asemeja mucho a lo que se grabará sin embargo, esto es lo que se usará en la aplicación y luego lo que se tendrá en la base de datos es indiferente porque la base de datos puede cambiar pero yo no quiero que mi aplicación se vea afectada y por otro lado si la entidad cambia por alguna razón no debería verse afectada la base de datos tampoco */

/* aquí como nosotros queramos crear nuestra entidad va a depender de lo que tengamos, por ejemplo tener un método que se fromJSON, o de repente otros. Esta es una simple entidad y conforme la vayamos usando, por ejemplo se podría crear un mapper y de lo que venga de Prisma a nuestra entidad vamos a tener que hacer algún tipo de conversión y que cuando se use la entidad siempre se va a tener la información correspondiente */
export class TodoEntity {
  constructor(
    /* no se coloca como readonly a las propiedades porque bueno, esas propiedades se podrían modificar. Aquí es muy similar a lo que se tiene en la base de datos pero NO es lo mismo */
    public id: number,
    public text: string,
    public createdAt?: Date | null // puede ser undefined por el ?, o de tipo Date o de tipo null
  ) {}

  get isCreated() {
    return !!this.createdAt; // se coloca la doble negación para que si se tiene un valor entonces nos de valor -> false -> true y esto quiere decir que al final queremos conocer si se tiene un valor (será true) o si no tiene (será false)
  }

  /* ahora con esto podemos crear la instancia desde el objeto, entonces esto quiere decir que en realidad nuestro fromObject sería un método estático y por eso el static y al final nuestro fromObject recibirá el objeto y crea nuestra instancia con lo que necesita (con lo que se pide en el constructor) */
  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, createdAt } = object;

    /* aquí se podrían realizar los análisis o las validaciones necesarias. Aquí también se podría colocar dentro de un logger pero técnicamente esto no se estaría esperando que sea algo que dispare el cliente o sea la solicitud de la persona, sino que son más que todo protecciones para los desarrolladores que quieran usar este TodoEntity */
    /* en este caso se está colocando directo el throw "id is required" porque es un caso práctico y solo se está colocando el mensaje directo, pero sería mejor colocarlo con throw new Error("id is required") para crear un objeto de error que contiene información adicional lo que facilita la depuración y entendimiento del código de error */
    if (!id) throw "id is required";
    if (!text) throw "text is required";

    /* para la fecha es un poco más delicado, porque hay que transformarla, puede ser que venga un string o de cualquier forma pero necesitamos cambiar el tipo a una fecha o sea a un tipo Date, pero si es que viene y si no viene entonces está bien que lo dejemos como null */
    let newCreatedAt;

    if (createdAt) {
      newCreatedAt = new Date(createdAt); // igual aquí puede ser que esté mal la fecha al momento de convertirla a tipo Date

      if (isNaN(newCreatedAt.getTime())) {
        /* esto lo que quiere decir es (colocar en la consola del navegador para entender mejor):
            const myDate = new Date("kjashdfkjashdfjas");
            myDate instaceOf Data -> true porque al final de cuentas se transformó a un tipo Date
            myDate.getTime() -> NaN porque el contenido transformado no es una fecha válida

            const myDate2 = new Date("2023-10-21");
            myDate2 instaceOf Data -> true porque al final de cuentas se transformó a un tipo Date
            myDate2.getTime() -> 1697846400000 nos da un número porque es una fecha válida
        */
        throw "createdAt is not a valid date";
      }
    }

    return new TodoEntity(id, text, createdAt);
  }
}
