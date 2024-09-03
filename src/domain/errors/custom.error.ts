/* puede ser extends o implements */
export class CustomError extends Error {
  constructor(
    public readonly messageError: string,
    public readonly statusCode: number
  ) {
    /* aquí se coloca el super() porque como CustomError se está extendiendo del Error entonces necesita inicializar lo que necesita el Error para que sea permitido */
    super(messageError);
  }
}
