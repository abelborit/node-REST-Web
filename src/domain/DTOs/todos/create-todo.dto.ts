/* los DTOs pueden ser una clase o función, pero se debe de asegurar de cómo viene la data */
export class CreateTodoDTO {
  /* inyección de dependencias donde se le está pasando el text a esta clase */
  private constructor(public readonly text: string) {}

  /* aquí las props van a simular lo que vendría del request.body. Lo que se regresar puede ser cualquier cosa según como lo necesitemos, puede ser ": CreateTodoDTO | undefined" indicando que hubo un error o también ": CreateTodoDTO | string" para manejar si se retornar un error en caso algo salió mal y ver el mensaje pero en este caso será ": [string?, CreateTodoDTO?]" un arreglo donde el primer elemento será un string para saber qué fue lo que salió mal que indicaría el error y el segundo será una instancia del CreateTodoDTO pero ambos serán opcionales porque si tenemos un error entonces está el string y si no tenemos un error entonces está el CreateTodoDTO que sería la instancia */
  static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {
    const { text } = props;

    /* validaciones de nuestras properties tal cual lo haríamos comúnmente */
    if (!text || text.length === 0)
      return ["Text property is required", undefined];

    return [undefined, new CreateTodoDTO(text)];
  }
}
