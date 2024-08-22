/* los DTOs pueden ser una clase o función, pero se debe de asegurar de cómo viene la data */
export class UpdateTodoDTO {
  /* inyección de dependencias donde se le está pasando el text a esta clase */
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly createdAt?: Date
  ) {}

  /* solo vamos a actualizar las properties que nos envíen y este values() solo tendrá las properties que usaremos para la actualización del todo, es decir, vamos a actualizar basado en las properties que tenemos. Porque también se puede hacer que se mande todo por el frontend y ya actualizado por ahí pero el problema es que el objeto puede ser muy grande y solo se quiere actualizar una o dos propiedades y eso puede saturar a la red al enviar todo el objeto innecesariamente, entonces vamos a actualizar según las properties que nos envíen */
  get values() {
    /* la instrucción en TypeScript de {[key: string]: any} se refiere a la definición de un objeto que puede tener un número variable de propiedades donde cada clave (key) es una cadena (string) y el valor asociado a esa clave puede ser de cualquier tipo (any) */
    /* esta definición permite que se pueda pasar un objeto con propiedades de cualquier nombre y tipo al método, lo que lo hace flexible y capaz de manejar diferentes estructuras de datos sin necesidad de definir propiedades específicas en el DTO */
    const returnObj: { [key: string]: any } = {};

    /* aquí no se pondrá el id porque el id no se debería de actualizar */
    if (this.text) returnObj.text = this.text;
    if (this.createdAt) returnObj.createdAt = this.createdAt;

    return returnObj;
  }

  /* aquí las props van a simular lo que vendría del request.body. Lo que se regresar puede ser cualquier cosa según como lo necesitemos, puede ser ": UpdateTodoDTO | undefined" indicando que hubo un error o también ": UpdateTodoDTO | string" para manejar si se retornar un error en caso algo salió mal y ver el mensaje pero en este caso será ": [string?, UpdateTodoDTO?]" un arreglo donde el primer elemento será un string para saber qué fue lo que salió mal que indicaría el error y el segundo será una instancia del UpdateTodoDTO pero ambos serán opcionales porque si tenemos un error entonces está el string y si no tenemos un error entonces está el UpdateTodoDTO que sería la instancia */
  static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { id, text, createdAt } = props;

    let newCreatedAt = createdAt; // el newCreatedAt sería el valor tal cual viene del createdAt

    /* si el id no viene o si el id transformado a número es NaN (not is a number) */
    if (!id || isNaN(Number(id))) {
      return ["id must be a valid number", undefined];
    }

    /* validaciones de nuestras properties tal cual lo haríamos comúnmente */
    if (createdAt) {
      newCreatedAt = new Date(createdAt); // actualizar el newCreatedAt y tratar de pasar el createdAt a formato fecha

      /* ese "Invalid Date" es el error que se obtiene cuando la fecha no es correcta */
      if (newCreatedAt.toString() === "Invalid Date") {
        return ["createdAt must be a valid date", undefined];
      }
    }

    /* aquí el newCreatedAt ya estaría transformado */
    return [undefined, new UpdateTodoDTO(id, text, newCreatedAt)];
  }
}
